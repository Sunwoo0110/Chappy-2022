import useSWR, { useSWRConfig } from "swr"
import axios from "axios";
import styles from "../../../styles/lecture/_addlecture.module.css";
import moment from 'moment';
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";

const fetcher = (url) => {
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const Adder = ({ lecture_id }) => {

    const { mutate } = useSWRConfig();

    // const { data, error } = useSWR(`/api/user/profile?_id=${user_id}`, fetcher)

    // if (error) return <div>Getting User Info Failed</div>
    // if (!data) return <div>Loading...</div>

    const { data: session, status } = useSession()
    var user_id = '';
    var user_type = 9;
    const [data, setData] = useState('');

    useEffect(async () => {
        if (status === "authenticated" && user_id != '') {
            const response = await fetch(`/api/user/profile?_id=${user_id}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            });
            const result = await response.json();
            
            if (result?.success !== true) {
                console.log("실행에 실패했습니다 ㅜㅜ");
            } else {
                // console.log(result.data)
                setData(result.data)
                // console.log(data)
            }
        }        
    }, [user_id, user_type, status]);

    if (status === "loading") {
        return <>Loading...</>
    } else if (status === "unauthenticated") {
        window.location.href = "/";
    } else {
        user_id = session.user.name; 
        user_type = session.user.image;  
        if(user_type===0) window.location.href = "/";
    }

    const registerNotice = async () => {

        if(document.getElementById('title').value!=='' &&
        document.getElementById('notice_type').value!=='' &&
        document.getElementById('description').value!==''){
            await axios.post('/api/lecture/notice', {
                "lecture_id": lecture_id,
                "title": document.getElementById('title').value,
                "type": document.getElementById('notice_type').value,
                "created_at": moment().toISOString(),
                "description": document.getElementById('description').value, 
            })
            .catch(error => {
                console.log("failed");
                console.log(error.response);
            })
    
            mutate(`/api/lecture/notice`);
            console.log(document.getElementById('title').value, " added");
            var checkerModal = document.getElementById('checker')
            var modalBody = checkerModal.querySelector('#message')
            modalBody.textContent = "\""+document.getElementById('title').value+"\" 등록 완료"
    
            document.getElementById('title').value = null; 
            document.getElementById('notice_type').value = null; 
            document.getElementById('description').value = null; 
        }
        else{
            var checkerModal = document.getElementById('checker');
            var modalBody = checkerModal.querySelector('#message');
            modalBody.textContent = "모든 항목이 채워져야 합니다."
            console.log("모든 항목이 채워져야합니다.")
        }
    }

    const handleRegisterEvent = () => {
        var checkerModal = document.getElementById('checker')
        var modalBody = checkerModal.querySelector('#message')
        if(modalBody.textContent.includes("등록 완료")){
            window.history.back();
        }
    };

    return (
        <div>
        {
            status === "authenticated" ?
                <div className={styles.column}>
                    <div className={styles.row}>
                        <div className={styles.row_index}>공지 제목</div>
                        <div className={styles.row_input}>
                            <input id="title" type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.row_index}>분류</div>
                        <div className={styles.row_input}>
                            <select className="form-select form-select-sm" id="notice_type" aria-label="Floating label select example">
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
                        <button style={{background: "#0B51FF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", width:"15%"}} className="btn btn-primary" type="button" onClick={()=>registerNotice()}  data-bs-toggle="modal" data-bs-target="#checker">등록하기</button>
                    </div>

                    <div className="modal fade" id="checker" tabindex="-1" aria-labelledby="checkerLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body" style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"5px",margin:"30px"}}>
                                    <div className="message" id="message">확인 중..</div>
                                    <div className={styles.buttons}>
                                        <button type="button" className="btn btn-secondary" style={{flexGrow: "1", flexBasis: "1px",background: "#114AFF"}} data-bs-dismiss="modal" onClick={()=>handleRegisterEvent()}>확인</button>
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


export default function NoticeAdder({lecture_id}) {

    const [feedback, setFeedback] = useState(true);
    const [is_opened, setIsOpened] = useState(true);

    return (
        <div style={{width:"100%"}}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>공지 등록하기</div>
                <div className={styles.section_title_exp}>새로운 공지 목록을 추가하세요</div>
            </div>
            <Adder lecture_id={lecture_id}/>
        </div>
    )
}
