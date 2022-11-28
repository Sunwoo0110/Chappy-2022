import { CardText } from "react-bootstrap-icons";

import styles from "../../../styles/lecture/_deadline.module.css";

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import useSWR from "swr"
import Link from "next/link";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function Deadlines({lectures}) {
    console.log("lectures: ",lectures)
    const semester="2022년 1학기"
    const { data: session, status } = useSession();
    var user_id = '';

    const [data, setData] = useState(null);

    useEffect(async () => {
        if (status === "authenticated" && user_id != '') {
            console.log("id: ",user_id)
            const response = await fetch(`/api/aggregation/lecture/deadline?user_id=${user_id}&open_semester=${semester}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
            });
            const result = await response.json();
            
            if (result?.success !== true) {
                console.log("실행에 실패했습니다 ㅜㅜ");
            } else {
                console.log("result.data: ",result.data)
                setData(result?.data)
            }
        }        
    }, [user_id, status]);

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
                <div className={styles.deadline_bg}>{
                    data?.map((deadline) => {
                    return (
                        <Link as={`/assignment/${deadline.assignment_id}`}
                            href={{
                                pathname: "/assignment/[id]",
                                query: { data: JSON.stringify(deadline.assignment_id) },
                            }}>
                            <div className={styles.deadline}>
                                <div className={styles.deadline_icon}><CardText size={50}/></div>
                                <div className={styles.deadline_exp}>
                                    <div className={styles.deadline_date_red}>{deadline.date}</div>
                                    <div className={styles.deadline_task}>{deadline.title}</div>
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

export default function Deadline({lectures}) {
    return (
        <div style={{width:"100%"}}>
            <div className={styles.title}>데드라인</div>
            <Deadlines lectures={lectures}/>
            <div className={styles.moving_page_bg}>
                {/* <div className={styles.moving_page}>캘린더로 보기</div> */}
            </div>
        </div>
    )
}