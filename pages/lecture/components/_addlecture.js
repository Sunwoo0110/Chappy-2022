import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"
import axios from "axios";

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

    const professor="백우정";
    const [name, setName] = useState('');
    const [engname, setEngName] = useState('');
    const [classnumber, setClassnumber] = useState('');
    const [open, setOpen] = useState(0);
    const [description, setDescription] = useState('');

    const clickHandler = async () => {

        await axios.post('/api/lecture/info', {
            "name": name,
            "english_name": engname,
            "professor": professor,
            "lecture_num": classnumber,
            "open_semester:": open,
            "description": description,
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/info`);
        console.log(name, " added");

        document.getElementById('name').value = null; 
        document.getElementById('english_name').value = null; 
        document.getElementById('open_semester').value = null; 
        document.getElementById('lecture_num').value = null; 
        document.getElementById('description').value = null; 
        
    }

    return (
    <div className={styles.column}>
        <div className={styles.row}>
            <div className={styles.row_index}>과목명(국문)</div>
            <div className={styles.row_input}>
                <input id="name" type="text" class="form-control" onChange={(e) => setName(e.target.value)}/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>과목명(영문)</div>
            <div className={styles.row_input}>
                <input id="english_name" type="text" class="form-control" onChange={(e) => setEngName(e.target.value)}/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>개설 학기</div>
            <div className={styles.row_input}>
                <input id="open_semester" type="text" class="form-control" onChange={(e) => setOpen(e.target.value)}/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>학수번호</div>
            <div className={styles.row_input}>
                <input id="lecture_num" type="text" class="form-control" onChange={(e) => setClassnumber(e.target.value)}/>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.row_index}>강의설명</div>
            <div className={styles.row_input}>
                <input id="description" style={{height:"300px"}} type="text" class="form-control" onChange={(e) => setDescription(e.target.value)}/>
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
            <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:"20px"}} class="btn btn-secondary" type="button">예</button>
            <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:"20px"}} class="btn btn-outline-secondary" type="button">아니오</button>
        </div>

        <div className={styles.buttons}>
            <button style={{background: "#0B51FF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} class="btn btn-primary" type="button" onClick={()=>clickHandler()}>등록하기</button>
            <button style={{background: "#414E5A", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} class="btn btn-secondary" type="button">임시저장</button>
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