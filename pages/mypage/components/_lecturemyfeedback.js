import styles from "../../../styles/mypage/_myfeedback.module.css"
import Title from "./_title"
import Link from "next/link";

import { useSelector } from 'react-redux';
import useSWR, { useSWRConfig } from "swr"

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function SubjectFeedback({lecture_id}){

    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/aggregation/mypage/lecturemyfeedback?user_id=${user_id}&lecture_id=${lecture_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // console.log("data: ",data);

    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>나의 피드백</div>
                <div className={styles.section_title}></div>
                <div className={styles.section_title}>{data.data.name}</div>
            </div>
            <div className={styles.feedback}>
                <div className={styles.feedback_item}>
                    <div className={styles.feedback_1}>제공된 피드백</div>
                    <div className={styles.feedback_2}>{data.data.total}개</div>
                </div>
                <div className={styles.feedback_item}>
                    <div className={styles.feedback_1}>시험</div>
                    <div className={styles.feedback_2}>{data.data.exam}개</div>
                </div>
                <div className={styles.feedback_item}>
                    <div className={styles.feedback_1}>과제</div>
                    <div className={styles.feedback_2}>{data.data.assignment}개</div>
                </div>
            </div>
        </div>
    )
}

function FeedbackList({lecture_id}){
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/aggregation/mypage/lecturefeedbacklist?user_id=${user_id}&lecture_id=${lecture_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    console.log("data.data: ",data.data)
    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>피드백 목록</div>
            </div>

            
            <div className={styles.objection}>
                <div className={styles.objection_1}>과제 및 시험</div>
                <div className={styles.objection_2}>과목</div>
                <div className={styles.objection_2}>제출날짜</div>
                <div className={styles.objection_2}>피드백 보기</div>
            </div>

            {
                data.data.map((feedback) => {
                    return (
                        <div style={{width:"100%"}}>
                            <div className={styles.objection}>
                                <div className={styles.objection_1}>{feedback.title}</div>
                                <div className={styles.objection_2}>{feedback.lecture}</div>
                                <div className={styles.objection_2}>{feedback.date}</div>
                                <Link as={`/assignment/${feedback.assignment_id}`}
                                    href={{
                                        pathname: "/assignment/[assignmentId]",
                                        query: { data: JSON.stringify(feedback.assignment_id) },
                                    }}>
                                        <div className={styles.objection_2}>
                                            <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">
                                            피드백 보기</button>
                                        </div>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function Feedback({lecture_id}) {
    return (
        <div className={styles.content}>
            <Title mode={3}/>
            <SubjectFeedback lecture_id={lecture_id}/>
            <FeedbackList lecture_id={lecture_id}/>
        </div>
    )
}