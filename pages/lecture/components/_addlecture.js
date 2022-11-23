import useSWR, { useSWRConfig } from "swr"
import axios from "axios";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";

import styles from "../../../styles/lecture/_addlecture.module.css";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


const Adder = ({ feedback, setFeedback, is_opened, setIsOpened}) => {

    const { mutate } = useSWRConfig();

    const { data: session, status } = useSession()
    var user_id = '';
    var user_type = 9;
    const [data, setData] = useState('');
    // const { data, error } = useSWR(`/api/user/profile?_id=${user_id}`, fetcher);

    useEffect(async () => {
        if (status === "authenticated" && user_id != '') {
            const response = await fetch(`/api/user/profile?_id=${user_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
            });
            const result = await response.json();
            
            if (result?.success !== true) {
                console.log("실행에 실패했습니다 ㅜㅜ");
            } else {
                setData(result.data[0])
            }
        }        
    }, [user_id, status]);

    if (status === "loading") {
        return <>Loading...</>
    } else if (status === "unauthenticated") {
        window.location.href = "/";
    } else {
        user_id = session.user.name; 
        user_type = session.user.image;  
        if(user_type===0) window.location.href = "/";
    }

    // const [feedback, setFeedback] = useState(true);
    // const [is_opened, setIsOpened] = useState(true);

    const registerLecture = async () => {

        if(document.getElementById('name').value!=='' &&
        document.getElementById('english_name').value!=='' &&
        document.getElementById('lecture_num').value!=='' &&
        document.getElementById('lecture_date').value!=='' &&
        document.getElementById('description').value!=='' &&
        document.getElementById('classroom').value!=='' ){
            await axios.put('/api/lecture/info', {
                "name": document.getElementById('name').value,
                "english_name": document.getElementById('english_name').value,
                "professor": data.name,
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
                "classroom": document.getElementById('classroom').value,
            })
            .catch(error => {
                console.log("failed");
                console.log(error.response);
            })
    
            mutate(`/api/lecture/info`);
            // console.log(document.getElementById('name').value, " added");
            var checkerModal = document.getElementById('checker')
            var modalBody = checkerModal.querySelector('#message')
            modalBody.textContent = "\""+document.getElementById('name').value+"\" 등록 완료"
    
            document.getElementById('name').value = null; 
            document.getElementById('english_name').value = null;
            document.getElementById('lecture_num').value = null; 
            document.getElementById('description').value = null; 
            document.getElementById('lecture_date').value = null;
            document.getElementById('lecture_type').selectedIndex = 0;
            document.getElementById('classroom').value = "i-Campus";
            document.getElementById('classroom').readOnly = true;
        }
        else{
            var checkerModal = document.getElementById('checker')
            var modalBody = checkerModal.querySelector('#message')
            modalBody.textContent = "모든 항목이 채워져야 합니다."
        }
    }

    const saveLecture = async () => {

        // console.log("임시저장")
        // console.log("document.getElementById('syllabus'): ",document.getElementById('syllabus').files)
        // var reader = new FileReader();
  
        // reader.onload = function () {
        //     // output.innerText = reader.result;
        //     console.log("HING: ", reader.result);
        // };
        // reader.readAsText(document.getElementById('syllabus').files[0]);

        await axios.put('/api/lecture/info', {
            "name": document.getElementById('name').value ,
            "english_name": document.getElementById('english_name').value,
            "professor": data.name,
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
            // "syllabus": reader.result,
            "classroom": document.getElementById('classroom').value,
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/info`);
        // console.log(document.getElementById('name').value, " temp added");
        var checkerModal = document.getElementById('checker')
        var modalBody = checkerModal.querySelector('#message')
        modalBody.textContent = "임시 저장 완료"

        document.getElementById('name').value = null; 
        document.getElementById('english_name').value = null;
        document.getElementById('lecture_num').value = null; 
        document.getElementById('description').value = null; 
        document.getElementById('lecture_date').value = null;
        document.getElementById('lecture_type').selectedIndex = 0;
        document.getElementById('classroom').value = "i-Campus";
        document.getElementById('classroom').readOnly = true;
    }

    const giveFeedback = () => {
        console.log("give feedback")
        setFeedback(true);
    };

    const noFeedback = () => {
        console.log("no feedback")
        setFeedback(false);
    };

    const handelLectureTypeChange = (e) => {
        if (e.target.value === "대면 강의"){
            document.getElementById('classroom').value = "";
            document.getElementById('classroom').readOnly = false;
        }
        else{
            document.getElementById('classroom').value = "i-Campus";
            document.getElementById('classroom').readOnly = true;
        }
    }

    return (
        <div>{
            status === "authenticated" ?
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
                        <select class="form-select form-select-sm" id="lecture_type" aria-label="Floating label select example" onChange={(e) => handelLectureTypeChange(e)}>
                            <option selected value="실시간 스트리밍 수업">실시간 스트리밍 수업</option>
                            <option value="녹화 강의">녹화 강의</option>
                            <option value="대면 강의">대면 강의</option>
                        </select>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.row_index}>강의실</div>
                    <div className={styles.row_input}>
                        <input id="classroom" type="text" class="form-control"
                        defaultValue={"i-Campus"} readOnly/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.row_index}>강의설명</div>
                    <div className={styles.row_input}>
                        <input id="description" style={{height:"300px"}} type="text" class="form-control"/>
                    </div>
                </div>
                {/* <div className={styles.row}>
                    <div className={styles.row_index}>강의계획서</div>
                    <div className={styles.row_input}>
                        <input id="syllabus" type="file" class="form-control"/>
                    </div>
                </div> */}

                <div className={styles.feedback}>
                    <div className={styles.feedback_text}>해당 과목의 피드백을 제공하시겠습니까?</div>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:"20px"}} class={feedback ? "btn btn-secondary" : "btn btn-outline-secondary"} type="button" onClick={()=>giveFeedback()}>예</button>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:"20px"}} class={feedback ? "btn btn-outline-secondary" : "btn btn-secondary"} type="button" onClick={()=>noFeedback()}>아니오</button>
                </div>

                <div className={styles.buttons}>
                    <button style={{background: "#0B51FF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} class="btn btn-primary" type="button" onClick={()=>registerLecture()}  data-bs-toggle="modal" data-bs-target="#checker">등록하기</button>
                    <button style={{background: "#414E5A", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} class="btn btn-secondary" type="button" onClick={()=>saveLecture()} data-bs-toggle="modal" data-bs-target="#checker">임시저장</button>
                </div>

                <div class="modal fade" id="checker" tabindex="-1" aria-labelledby="checkerLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"5px",margin:"30px"}}>
                                <div className="message" id="message">확인 중..</div>
                                <div className={styles.buttons}>
                                    <button type="button" class="btn btn-secondary" style={{flexGrow: "1", flexBasis: "1px",background: "#114AFF"}} data-bs-dismiss="modal">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        : <div>Loading...</div>
    }
    </div>
    )
}


export default function LectureAdder() {

    const [feedback, setFeedback] = useState(true);
    const [is_opened, setIsOpened] = useState(true);

    return (
        <div style={{width:"100%"}}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>수업 등록하기</div>
                <div className={styles.section_title_exp}>수업을 검색하고 강의 목록에 등록하세요</div>
            </div>
            <Adder feedback={feedback} setFeedback={setFeedback} is_opened={is_opened} setIsOpened={setIsOpened}/>
        </div>
    )
}