import Link from "next/link";
import { useState } from "react";
import { CardText, Circle, MegaphoneFill, Star } from "react-bootstrap-icons";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../../styles/lecture/_lecturelist.module.css";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function MyLectureList() {
    const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const semester="2022년 1학기"
    const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)
    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    console.log("lecture:::: ", data)

    return (
        <div style={{width:"100%"}} class="row">
        {
            data?.lectures.map((lecture) => {
                if (lecture.open_semester===semester){
                    return (
                        <Link as={`/lectureDetail/${lecture._id}`}
                            href={{
                                pathname: "/lectureDetail/[id]",
                                query: { data: JSON.stringify(lecture._id) },
                            }}>
                        <div style={{marginBottom:"20px"}} class="col-6">
                        <div className={styles.lecture_bg}>
                            <div style={{justifyContent:"space-between", marginBottom: "60px", padding:"20px"}} className={styles.lecture_icon}>
                                <Star size="24px" color="white"/>
                                <div className={styles.lecture_info_icon}/>
                            </div>
                            <div className={styles.lecture}>
                                <div className={styles.lecture_name}>
                                    <div className={styles.lecture_name_1}>{lecture.name}</div>
                                    <div className={styles.lecture_name_2}>
                                    <div className={styles.lecture_open}>{lecture.open_semester}</div>
                                    </div>
                                </div>
                                <div className={styles.lecture_prof}>{lecture.professor}</div>
                                <div className={styles.lecture_id}>{lecture.lecture_num}</div>
                                <div style={{justifyContent:"flex-end", columnGap:"10%"}} className={styles.lecture_icon}>
                                    <MegaphoneFill size={30}/>
                                    <CardText size={30}/>
                                </div>
                            </div>
                        </div>
                        </div>
                        </Link>
                    )
                }
                else{
                    return;
                }
            })
        }
        </div>
    )
}

function AllLectureList() {
    const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)
    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    return (
        <div style={{width:"100%"}} class="row">
        {
            data?.lectures.map((lecture) => {
            return (
                <Link as={`/lectureDetail/${lecture._id}`}
                    href={{
                        pathname: "/lectureDetail/[id]",
                        query: { data: JSON.stringify(lecture._id) },
                    }}>
                <div style={{marginBottom:"20px"}} class="col-6">
                <div className={styles.lecture_bg}>
                    <div style={{justifyContent:"space-between", marginBottom: "60px", padding:"20px"}} className={styles.lecture_icon}>
                        <Star size="24px" color="white"/>
                        <div className={styles.lecture_info_icon}/>
                    </div>
                    <div className={styles.lecture}>
                        <div className={styles.lecture_name}>
                            <div className={styles.lecture_name_1}>{lecture.name}</div>
                            <div className={styles.lecture_name_2}>
                            <div className={styles.lecture_open}>{lecture.open_semester}</div>
                            </div>
                        </div>
                        <div className={styles.lecture_prof}>{lecture.professor}</div>
                        <div className={styles.lecture_id}>{lecture.lecture_num}</div>
                        <div style={{justifyContent:"flex-end", columnGap:"10%"}} className={styles.lecture_icon}>
                            <MegaphoneFill size={30}/>
                            <CardText size={30}/>
                        </div>
                    </div>
                </div>
                </div>
                </Link>
            )
        })
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
                    <button style={{borderRadius:20}} class="btn btn-primary btn-sm" type="button" onClick={()=>toMode1()}>이번 학기 과목만 보기</button>
                    <button style={{borderRadius:20}} class="btn btn-outline-primary btn-sm" type="button" onClick={()=>toMode2()}>모든 과목 보기</button>
                </div>
            </div>
            {
                mode === 1 ?
                <MyLectureList/>
                :
                <AllLectureList/>
            }
        </div>
    )
}