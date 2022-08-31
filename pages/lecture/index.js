import { useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr"
import { useRouter } from "next/router"

import Header from "./components/_header";
import Footer from "./components/_footer";

import styles from "../../styles/lecture/Lecture.module.css";

import LectureList from "./components/_lecturelist";
import Deadline from "./components/_deadline";


const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


export default function Index() {

    const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const { data, error } = useSWR(`/api/user/profile/${user_id}`, fetcher)
    if (error) return <div>Getting Info Failed</div>
    if (!data) return <div>Loading...</div>

    const router = useRouter();

    async function toAddLecture() {
        router.push('/lecture/addlecture')
    }

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.greeting_box}>
                        <div className={styles.greeting_name}>어서오세요 {data.user.name}님!</div>
                        <div className={styles.greeting_week}>지금은 4주차입니다</div>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", columnGap:"5%"}}>
                        <LectureList/>
                        <div style={{width:"30%"}}>
                            <button style={{borderRadius:20, width:"100%"}} class="btn btn-primary" type="button" onClick={()=>toAddLecture()}>강의 등록하기</button>
                            <Deadline/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}