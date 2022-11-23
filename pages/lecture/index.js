import { useState } from "react";
import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr"
import { useRouter } from "next/router"

import Header from "../components/_header";
import Footer from "../components/_footer";

import styles from "../../styles/lecture/Lecture.module.css";

import LectureList from "./components/_lecturelist";
import Deadline from "./components/_deadline";

import { useSession } from "next-auth/react"
import { useEffect } from "react";


const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


export default function Index() {
    const router = useRouter();
    const { data: session, status } = useSession()
    var user_id = '';
    var user_type = 9;
    const [data, setData] = useState('');
    const [week, setWeek] = useState(1);

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
                // console.log("asdf:",result.data)
                setData(result.data[0])
                // console.log(data)
            }

            const startDay = '2022-08-29'
            const response2 = await fetch(`/api/aggregation/lecture/getweek?start_day=${startDay}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                },
                });
            const result2 = await response2.json();
            if (result2?.success !== true) {
                console.log("실행에 실패했습니다 ㅜㅜ");
            } else {
                setWeek(result2.data)
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
    }

    async function toAddLecture() {
        router.push('/lecture/addlecture')
    }

    return (
        <div>{
            status === "authenticated" ?
                <div className={styles.container}>
                    <Header/>
                    <div className={styles.main}>
                        <div className={styles.content}>
                            <div className={styles.greeting_box}>
                                <div className={styles.greeting_name}>어서오세요 {data.name}님!</div>
                                <div className={styles.greeting_week}>지금은 {week}주차입니다</div>
                            </div>
                            <div style={{display:"flex", flexDirection:"row", columnGap:"5%"}}>
                                <LectureList/>
                                <div style={{width:"30%"}}>
                                    {
                                        user_type===1?
                                        <button style={{borderRadius:20, width:"100%"}} class="btn btn-primary" type="button" onClick={()=>toAddLecture()}>강의 등록하기</button>
                                        :<></>
                                    }
                                    <Deadline lectures={data.lecture_list}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            : <div>Loading...</div>
        }
        </div>
    )
}