import useSWR from "swr"
import { AiFillPlusCircle } from "react-icons/ai";
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import noticeStyles from "../../../styles/lectureDetail/_notice.module.css"
import axios from "../../../lib/api";
import Link from "next/link";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";

const fetcher = async (url, queryParams='') => {
    if (typeof url != 'string')
        return { data: [] }
    return await axios.get(url, {params: queryParams})
        .then((res) => {
            return res.data
        })
}

const postFetcher = async (url, bodyData={}) => {
    if (typeof url != 'string')
        return { data: [] }
    return await axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: bodyData,
    }).then((res) => {
        return res.data
    })
}

const NoticeList = ({lecture_id}) => {
    const bodyData = {
        pipeline: [
            {
                $match: {
                    $expr: {
                        $eq: [
                            '$lecture_id' , 
                            { $toObjectId: lecture_id } 
                        ]
                    },
                },
            },
            {
                $project: {
                    description:0,
                }
            },
            {
                $sort: {
                    created_at: -1,
                }
            }
        ]
    };
    // const { data, error } = useSWR([`/api/lecture/notice/aggregate`, bodyData], postFetcher);

    const { data: session, status } = useSession()
    var user_id = '';
    var user_type = 9;
    const [data, setData] = useState('');

    useEffect(async () => {
        if (status === "authenticated" && user_id != '') {
            const response = await fetch(`/api/lecture/notice/aggregate`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(bodyData)
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
    }

    if (!data) return <div>Loading...</div>
    if (data==-1) return <div>Notice Not Existing</div>
    
    return(
        <div>
            {
                status === "authenticated" ?
                <div>
                    {
                        user_type !== 0 ?
                            <Link as={`/lectureDetail/${lecture_id}/addnotice`}
                            href={{
                                pathname: "/lectureDetail/[id]/addnotice",
                            }}>
                            <div className={noticeStyles["notice-add-btn"]}><AiFillPlusCircle/>공지 추가하기</div>
                        </Link>
                        :<></>
                    }
                    {data.map((notice) => (
                        <div className={noticeStyles["notice-item"]} key={notice._id}>
                            <div className={noticeStyles["notice-item-type-new"]}>{notice.type}</div>
                            <div className={noticeStyles["notice-item-title"]}>{notice.title}</div>
                            <div className={noticeStyles["notice-item-date"]}>{notice.date}</div>
                        </div>
                    ))}
                </div>
                : <div>Loading...</div>
            }
        </div>
    );
}

export default function Notice({lecture_id}){
    return (
        <div className={noticeStyles.notice}>
            <div className={commonStyles.title}>새로운 공지</div>
            <NoticeList lecture_id={lecture_id}/>
        </div>
    );
}
