import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"
import axios from "axios";
import { useSelector } from 'react-redux';

import styles from "../../../styles/lecture/_addlecture.module.css";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


const Adder = () => {

    const { mutate } = useSWRConfig();

    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/user/profile?_id=${user_id}`, fetcher)

    if (error) return <div>Getting User Info Failed</div>
    if (!data) return <div>Loading...</div>

    const [feedback, setFeedback] = useState(true);
    const [is_opened, setIsOpened] = useState(true);

    const registerLecture = async () => {

        await axios.post('/api/lecture/info', {
            "name": document.getElementById('name').value,
            "english_name": document.getElementById('english_name').value,
            "professor": data.data[0].name,
            "lecture_num": document.getElementById('lecture_num').value,
            "open_semester:": document.getElementById('open_semester').value,
            "description": document.getElementById('description').value,
            "feedback":feedback,
            "department": document.getElementById('department').value,
            "major": document.getElementById('major').value,
            "lecture_date": document.getElementById('lecture_date').value ,
            "lecture_type": document.getElementById('lecture_type').value,
            "is_ready": false,
            "is_opened": is_opened,
            "saved_at": new Date(),
            "user_list": [],
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/info`);
        console.log(document.getElementById('name').value, " added");

        document.getElementById('name').value = null; 
        document.getElementById('english_name').value = null;
        document.getElementById('lecture_num').value = null; 
        document.getElementById('description').value = null; 
        document.getElementById('lecture_date').value = null;
    }

    const saveLecture = async () => {

        await axios.post('/api/lecture/info', {
            "name": document.getElementById('name').value ,
            "english_name": document.getElementById('english_name').value,
            "professor": data.data[0].name,
            "lecture_num": document.getElementById('lecture_num').value,
            "open_semester:": document.getElementById('open_semester').value,
            "description": document.getElementById('description').value,
            "feedback":feedback,
            "department": document.getElementById('department').value,
            "major": document.getElementById('major').value,
            "lecture_date": document.getElementById('lecture_date').value ,
            "lecture_type": document.getElementById('lecture_type').value,
            "is_ready": false,
            "is_opened": is_opened,
            "saved_at": new Date(),
            "user_list": [],
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/info`);
        console.log(document.getElementById('name').value, " temp added");

        document.getElementById('name').value = null; 
        document.getElementById('english_name').value = null;
        document.getElementById('lecture_num').value = null; 
        document.getElementById('description').value = null; 
        document.getElementById('lecture_date').value = null;
    }

    const giveFeedback = () => {
        console.log("give feedback")
        setFeedback(true);
    };

    const noFeedback = () => {
        console.log("no feedback")
        setFeedback(false);
    };

    return (
    <div className={styles.column}>
        <div className={styles.row}>
            <div className={styles.row_index}>과목명(국문)</div>
            <div className={styles.row_input}>
                <input id="name" type="text" class="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>과목명(영문)</div>
            <div className={styles.row_input}>
                <input id="english_name" type="text" class="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>학수번호</div>
            <div className={styles.row_input}>
                <input id="lecture_num" type="text" class="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>수업일시</div>
            <div className={styles.row_input}>
                <input id="lecture_date" type="text" class="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>개설 학기</div>
            <div className={styles.row_input}>
                <select class="form-select form-select-sm" id="open_semester" aria-label="Floating label select example">
                    <option selected value="2022년 1학기">2022년 1학기</option>
                    <option value="2021년 2학기">2021년 2학기</option>
                    <option value="2021년 1학기">2021년 1학기</option>
                </select>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>주관학부(대학)</div>
            <div className={styles.row_input}>
                <select class="form-select form-select-sm" id="department" aria-label="Floating label select example">
                    <option selected value="소프트웨어융합대학">소프트웨어융합대학</option>
                </select>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>학과, 전공</div>
            <div className={styles.row_input}>
                <select class="form-select form-select-sm" id="major" aria-label="Floating label select example">
                    <option selected value="소프트웨어학과">소프트웨어학과</option>
                </select>
            </div>
        </div>        
        <div className={styles.row}>
            <div className={styles.row_index}>수업형태</div>
            <div className={styles.row_input}>
                <select class="form-select form-select-sm" id="lecture_type" aria-label="Floating label select example">
                    <option selected value="실시간 스트리밍 수업">실시간 스트리밍 수업</option>
                    <option value="녹화 강의">녹화 강의</option>
                    <option value="대면 강의">대면 강의</option>
                </select>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>강의설명</div>
            <div className={styles.row_input}>
                <input id="description" style={{height:"300px"}} type="text" class="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>강의계획서</div>
            <div className={styles.row_input}>
                <input type="file" class="form-control"/>
            </div>
        </div>

        <div className={styles.feedback}>
            <div className={styles.feedback_text}>해당 과목의 피드백을 제공하시겠습니까?</div>
            <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:"20px"}} class="btn btn-secondary" type="button" onClick={()=>giveFeedback()}>예</button>
            <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:"20px"}} class="btn btn-outline-secondary" type="button" onClick={()=>noFeedback()}>아니오</button>
        </div>

        <div className={styles.buttons}>
            <button style={{background: "#0B51FF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} class="btn btn-primary" type="button" onClick={()=>registerLecture()}>등록하기</button>
            <button style={{background: "#414E5A", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} class="btn btn-secondary" type="button" onClick={()=>saveLecture()}>임시저장</button>
        </div>
    </div >
    )

}


export default function LectureAdder() {
    return (
        <div style={{width:"100%"}}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>수업 등록하기</div>
                <div className={styles.section_title_exp}>수업을 검색하고 강의 목록에 등록하세요</div>
            </div>
            <Adder/>
        </div>
    )
}