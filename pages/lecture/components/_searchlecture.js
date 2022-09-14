import { useState } from "react";

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

    const [title, setTitle] = useState(0);
    const [data, setData] = useState([]);

    const clickHandler = async () => {

        var _open=document.getElementById('open').value;
        var _department=document.getElementById('department').value;
        var _major=document.getElementById('major').value;
        var _name=document.getElementById('name').value;

        document.getElementById('name').value = null; 
        
        let url='/api/lecture/info?'
        if(_open!==''){
            url=url+"open_semester="+_open+"&";
        }
        if(_department!==''){
            url=url+"department="+_department+"&";
        }
        if(_major!==''){
            url=url+"major="+_major+"&";
        }
        if(_name!==''){
            url=url+"name="+_name+"&";
        }

        await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            setData(response.data);
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
                            <button style={{fontSize: "15px", background: "#0B51FF"}} class="btn btn-primary" type="button">담기</button>
                        </div>
                    </div>
                )
            })
        }
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