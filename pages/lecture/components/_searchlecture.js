import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"
import axios from "axios";

import styles from "../../../styles/lecture/_searchlecture.module.css";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


const Searcher = () => {

    const { mutate } = useSWRConfig();

    const professor="백우정";
    const [name, setName] = useState('');
    const [engname, setEngName] = useState('');
    // const [professor, setProfessor]= useState('');
    const [classnumber, setClassnumber] = useState('');
    const [open, setOpen] = useState(0);
    const [description, setDescription] = useState('');

    const clickHandler = async () => {

        await axios.post('/api/lecture/lecture', {
            "name": name,
            "englishname": engname,
            "professor": professor,
            "classnumber": classnumber,
            "open": open,
            "description": description,
        })
        .then((res) => {
            // if (res.data.result === null) {
            //     let payload = {
            //         result: "실행 결과가 없습니다",
            //     };
            //     dispatch(runActions.setRun(payload));
            // } else {
            //     let payload = {
            //         result: res.data.result,
            //     };
            //     dispatch(runActions.setRun(payload));
            // }
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/lecture`);
        console.log(name, " added");

        document.getElementById('name').value = null; 
        document.getElementById('englishname').value = null; 
        document.getElementById('open').value = null; 
        document.getElementById('classnumber').value = null; 
        document.getElementById('description').value = null; 
        
    }

    return (
    <div className={styles.column}>
        <div className={styles.criteria}>
            <div className={styles.criteria_1}>학기 선택</div>
            <div className={styles.criteria_2}>주관학부(대학)</div>
            <div className={styles.criteria_3}>학과, 전공</div>
            <div className={styles.criteria_3}>검색하기</div>
        </div>
        <div className={styles.criteria}>
            <div className={styles.criteria_1}>
                <select class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>학기 선택</option>
                    <option value="1">2021년 1학기</option>
                    <option value="1">2021년 2학기</option>
                    <option value="2">2022년 1학기</option>
                </select>
            </div>
            <div className={styles.criteria_2}>
                <select class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>주관학부</option>
                    <option value="1">소프트웨어융합대학</option>
                </select>
            </div>
            <div className={styles.criteria_3}>
                <select class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>학과, 전공</option>
                    <option value="1">소프트웨어학과</option>
                </select>
            </div>
            <div className={styles.criteria_3}>
                <div className={styles.row_input}>
                    <input id="open" placeholder="검색어를 입력해주세요" type="text" class="form-control" onChange={(e) => setOpen(e.target.value)}/>
                </div>
            </div>
        </div>

        <div className={styles.result}>
            <div className={styles.result_1}>학수번호</div>
            <div className={styles.result_1}>과목명</div>
            <div className={styles.result_2}>수업일시</div>
            <div className={styles.result_3}>수업형태</div>
            <div className={styles.buttons}/>
        </div>

        <div className={styles.result_item}>
            <div className={styles.result_1}>
                <div className={styles.result_name}>AAI-2004-02</div>
            </div>
            <div className={styles.result_1}>
                <div className={styles.result_name}>인공지능통계론</div>
                <div className={styles.result_engname}>Statistics of Artificial Intelligence</div>
            </div>
            <div className={styles.result_2}>
                <div className={styles.result_engname}>화 18:00- 19:30</div>
            </div>
            <div className={styles.result_3}>
                <div className={styles.result_engname}>실시간 스트리밍 수업</div>
            </div>
            <div className={styles.buttons}>
                <button style={{fontSize: "15px", background: "#414E5A"}} class="btn btn-secondary" type="button">수업계획서</button>
                <button style={{fontSize: "15px", background: "#0B51FF"}} class="btn btn-primary" type="button">담기</button>
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