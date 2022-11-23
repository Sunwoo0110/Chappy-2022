import Link from "next/link";
import { CardText, MegaphoneFill, Star } from "react-bootstrap-icons";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";

import styles from "../../../styles/lecture/_lecturelist.module.css";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function MyLectureList( {mode} ) {
    const semester="2022년 1학기"
    const { data: session, status } = useSession();
    var user_id = '';
    let url='';
    const [data, setData] = useState(null);
    
    useEffect(async () => {
        if (status === "authenticated" && user_id != '') {
            if(mode===1){
                url=`/api/aggregation/mypage/mylectures?user_id=${user_id}&open_semester=${semester}`;
            }
            else{
                url=`/api/aggregation/mypage/mylectures?user_id=${user_id}`;
            }
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
            });
            const result = await response.json();
            
            if (result?.success !== true) {
                console.log("실행에 실패했습니다 ㅜㅜ");
            } else {
                setData(result?.lectures)
            }
        }        
    }, [user_id, status, mode]);

    if (status === "loading") {
        return <>Loading...</>
    } else if (status === "unauthenticated") {
        window.location.href = "/";
    } else {
        user_id = session.user.name; 
    }

    return (
        <div>
            {
                status === "authenticated" ?
                <div style={{width:"100%"}} class="row">{
                    data?.map((lecture) => {
                        return (
                            <Link as={`/lectureDetail/${lecture._id}`}
                                href={{
                                    pathname: "/lectureDetail/[id]",
                                    query: { id: lecture._id,
                                            mode: 0 },
                                }}>
                            <div style={{marginBottom:"20px"}} class="col-6">
                            <div className={styles.lecture_bg}>
                                <div className={styles.lecture}>
                                    <div className={styles.lecture_name}>
                                        <div className={styles.lecture_name_1}>{lecture.name}</div>
                                        <div className={styles.lecture_name_2}>{}</div>
                                        <div className={styles.lecture_open}>{lecture.open_semester}</div>
                                    </div>
                                    <div className={styles.lecture_prof}>{lecture.professor}</div>
                                    <div className={styles.lecture_id}>{lecture.lecture_num}</div>
                                    <div style={{justifyContent:"flex-end", columnGap:"10%"}} className={styles.lecture_icon}>
                                        <Link as={`/lectureDetail/${lecture._id}`}
                                            href={{
                                                pathname: "/lectureDetail/[id]",
                                                query: { id: lecture._id,
                                                        mode: 1 },
                                            }}>
                                            <MegaphoneFill size={30}/>
                                        </Link>
                                        <Link as={`/lectureDetail/${lecture._id}`}
                                            href={{
                                                pathname: "/lectureDetail/[id]",
                                                query: { id: lecture._id,
                                                        mode: 3 },
                                            }}>
                                            <CardText size={30}/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </Link>
                        )
                    })
                }</div> 
                : <div>Loading...</div>
            }
        </div>
    )
}


export default function LectureList() {
    //mode 1: 이번 학기 과목만
    //mode 2: 모든 과목
    const [mode, setMode] = useState(1);

    const toMode1 = async () => {
        setMode(1);
    }

    const toMode2 = async () => {
        setMode(2);
    }

    return (
        <div style={{width:"70%"}}>
            <div className={styles.title_bg}>
                <div className={styles.section_title_bg}>
                    <div className={styles.section_title}>강의 목록</div>
                    <div className={styles.section_title_exp}>듣고싶은 과목을 선택하세요</div>
                </div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                    <button style={{borderRadius:20}} class={mode==1 ? "btn btn-primary btn-sm" : "btn btn-outline-primary btn-sm"} onClick={()=>toMode1()}>이번 학기 과목만 보기</button>
                    <button style={{borderRadius:20}} class={mode==2 ? "btn btn-primary btn-sm" : "btn btn-outline-primary btn-sm"} type="button" onClick={()=>toMode2()}>모든 과목 보기</button>
                </div>
            </div>

            <MyLectureList mode={mode}/>
        </div>
    )
}