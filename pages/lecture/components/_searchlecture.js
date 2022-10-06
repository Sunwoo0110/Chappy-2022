import { useState } from "react";
import { useSelector } from 'react-redux';
import useSWR from "swr"

import styles from "../../../styles/lecture/_searchlecture.module.css";
import {Search} from 'react-bootstrap-icons';

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

const Searcher = () => {
    const user = useSelector(state => state.user);
    const user_id = user.id;

    const [title, setTitle] = useState(0);
    const [data, setData] = useState([]);

    const clickHandler = async () => {
        var _open=document.getElementById('open').value;
        var _department=document.getElementById('department').value;
        var _major=document.getElementById('major').value;
        var _name=document.getElementById('name').value;

        document.getElementById('name').value = null; 

        var match={};
        match['name'] = { $regex: _name };
        match['is_ready'] = true;
        match['is_opened'] = true;
        if(_open!==''){
            match['open_semester'] = _open;
        }
        if(_department!==''){
            match['department'] = _department;
        }
        if(_major!==''){
            match['major'] = _major;
        }
        
        await fetch(`/api/lecture/info/aggregate`, {
            method: "POST",
            body: JSON.stringify({pipeline: [{$match: match}]}),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(response => response.json())
        .then(response => {
            setData(response.data);
        })
    }

    const clickHandler2 = async (lecture_id) => {
        var data={};
        data['user_id'] = user_id;
        data['lecture_id'] = lecture_id;
        await fetch(`/api/aggregation/lecture/searchlecture`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(response => response.json())
        .then(response => {
            var checkerModal = document.getElementById('checker')
            var modalBody = checkerModal.querySelector('#message')
            modalBody.textContent = response.data
        })
    }

    return (
    <div className={styles.column}>
        <div className={styles.criteria}>
            <div className={styles.criteria_1}>학기 선택</div>
            <div className={styles.criteria_2}>주관학부(대학)</div>
            <div className={styles.criteria_3}>학과, 전공</div>
            <div className={styles.criteria_3}>검색하기</div>
            <div className={styles.criteria_4}/>
        </div>
        <div className={styles.criteria}>
            <div className={styles.criteria_1}>
                <select class="form-select form-select-sm" id="open" aria-label="Floating label select example">
                    <option selected value="">학기 선택</option>
                    <option value="2021년 1학기">2021년 1학기</option>
                    <option value="2021년 2학기">2021년 2학기</option>
                    <option value="2022년 1학기">2022년 1학기</option>
                </select>
            </div>
            <div className={styles.criteria_2}>
                <select class="form-select form-select-sm" id="department" aria-label="Floating label select example">
                    <option selected value="">주관학부</option>
                    <option value="소프트웨어융합대학">소프트웨어융합대학</option>
                </select>
            </div>
            <div className={styles.criteria_3}>
                <select class="form-select form-select-sm" id="major" aria-label="Floating label select example">
                    <option selected value="">학과, 전공</option>
                    <option value="소프트웨어학과">소프트웨어학과</option>
                </select>
            </div>
            <div className={styles.criteria_3}>
                <input id="name" placeholder="검색어를 입력해주세요" type="text" class="form-control" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className={styles.criteria_4}>
                <Search style={{cursor:"pointer"}} onClick={()=>clickHandler()}/>
            </div>
        </div>

        <div className={styles.result}>
            <div className={styles.result_1}>학수번호</div>
            <div className={styles.result_1}>과목명</div>
            <div className={styles.result_2}>수업일시</div>
            <div className={styles.result_3}>수업형태</div>
            <div className={styles.buttons}/>
        </div>

        {
            data.map((lecture) => {
                return (
                    <div className={styles.result_item}>
                        <div className={styles.result_1}>
                            <div className={styles.result_name}>{lecture.lecture_num}</div>
                        </div>
                        <div className={styles.result_1}>
                            <div className={styles.result_name}>{lecture.name}</div>
                            <div className={styles.result_engname}>{lecture.english_name}</div>
                        </div>
                        <div className={styles.result_2}>
                            <div className={styles.result_engname}>{lecture.lecture_date}</div>
                        </div>
                        <div className={styles.result_3}>
                            <div className={styles.result_engname}>{lecture.lecture_type}</div>
                        </div>
                        <div className={styles.buttons}>
                            <button style={{fontSize: "15px", background: "#414E5A"}} class="btn btn-secondary" type="button">수업계획서</button>
                            <button style={{fontSize: "15px", background: "#0B51FF"}} class="btn btn-primary" type="button" onClick={()=>clickHandler2(lecture._id)} data-bs-toggle="modal" data-bs-target="#checker">담기</button>
                            
                        </div>
                    </div>
                )
            })
        }
        <div class="modal fade" id="checker" tabindex="-1" aria-labelledby="checkerLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"5px",margin:"30px"}}>
                        <div className="message" id="message" className={styles.deletecheck}>담는 중..</div>
                        <div className={styles.buttons}>
                            <button type="button" class="btn btn-secondary" style={{flexGrow: "1", flexBasis: "1px",background: "#114AFF"}} data-bs-dismiss="modal">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
    )

}


export default function LectureSearcher() {
    return (
        <div style={{width:"100%"}}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>수업 검색하기</div>
                <div className={styles.section_title_exp}>수업을 검색하고 강의 목록에 등록하세요</div>
            </div>
            <Searcher/>
        </div>
    )
}