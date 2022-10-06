import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"
import axios from "axios";
import { useSelector } from 'react-redux';

import styles from "../../../styles/lecture/_addlecture.module.css";

const fetcher = (url) => {
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const Adder = ({ feedback, setFeedback, is_opened, setIsOpened}) => {

    const { mutate } = useSWRConfig();

    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/user/profile?_id=${user_id}`, fetcher)

    if (error) return <div>Getting User Info Failed</div>
    if (!data) return <div>Loading...</div>

    const registerLecture = async () => {

        if(document.getElementById('name').value!=='' &&
        document.getElementById('english_name').value!=='' &&
        document.getElementById('lecture_num').value!=='' &&
        document.getElementById('lecture_date').value!=='' &&
        document.getElementById('description').value!==''){
            await axios.post('/api/lecture/info', {
                "name": document.getElementById('name').value,
                "english_name": document.getElementById('english_name').value,
                "professor": data.data[0].name,
                "lecture_num": document.getElementById('lecture_num').value,
                "open_semester": document.getElementById('open_semester').value,
                "description": document.getElementById('description').value,
                "feedback":feedback,
                "department": document.getElementById('department').value,
                "major": document.getElementById('major').value,
                "lecture_date": document.getElementById('lecture_date').value ,
                "lecture_type": document.getElementById('lecture_type').value,
                "is_ready": true,
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
        else{
            console.log("모든 항목이 채워져야합니다.")
        }
    }

    const saveLecture = async () => {

        await axios.post('/api/lecture/info', {
            "name": document.getElementById('name').value ,
            "english_name": document.getElementById('english_name').value,
            "professor": data.data[0].name,
            "lecture_num": document.getElementById('lecture_num').value,
            "open_semester": document.getElementById('open_semester').value,
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
            <div className={styles.row_index}>공지 제목</div>
            <div className={styles.row_input}>
                <input id="name" type="text" className="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>분류</div>
            <div className={styles.row_input}>
                <select className="form-select form-select-sm" id="lecture_type" aria-label="Floating label select example">
                    <option selected value="과제">과제</option>
                    <option value="시험">시험</option>
                    <option value="기타">기타</option>
                </select>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>공지 내용</div>
            <div className={styles.row_input}>
                <input id="description" style={{height:"300px"}} type="text" className="form-control"/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>첨부파일</div>
            <div className={styles.row_input}>
                <input type="file" className="form-control"/>
            </div>
        </div>

        <div className={styles.buttons}>
            <button style={{background: "#0B51FF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} className="btn btn-primary" type="button" onClick={()=>registerLecture()}>등록하기</button>
        </div>
    </div >
    )

}


export default function LectureAdder() {

    const [feedback, setFeedback] = useState(true);
    const [is_opened, setIsOpened] = useState(true);

    return (
        <div style={{width:"100%"}}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>공지 등록하기</div>
                <div className={styles.section_title_exp}>새로운 공지 목록을 추가하세요</div>
            </div>
            <Adder feedback={feedback} setFeedback={setFeedback} is_opened={is_opened} setIsOpened={setIsOpened}/>
        </div>
    )
}