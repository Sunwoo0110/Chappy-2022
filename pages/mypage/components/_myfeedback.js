import styles from "../../../styles/mypage/_myfeedback.module.css"
import Title from "./_title"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link";
import { useSelector } from 'react-redux';

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function TotalFeedback(){
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/aggregation/mypage/myfeedback?user_id=${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // console.log("data.data:  ", data.data)

    return(
        <div className={styles.section_bg}>
            <div className={styles.feedback}>
                <div className={styles.feedback_item}>
                    <div className={styles.feedback_1}>제공된 피드백</div>
                    <div className={styles.feedback_2}>{data.data.total_feedback}개</div>
                </div>
                <div className={styles.feedback_item}>
                    <div className={styles.feedback_1}>확인한 피드백</div>
                    <div className={styles.feedback_2}>{data.data.checked_feedback}개</div>
                </div>
                <div className={styles.feedback_item}>
                    <div className={styles.feedback_1}>놓친 과제</div>
                    <div className={styles.feedback_3}>{data.data.missed}개</div>
                </div>
            </div>
        </div>
    )
}


function Lectures(){
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/aggregation/mypage/mylectures?user_id=${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    return(
        <div className={styles.section_bg}>
            <div style={{width:"100%"}} class="row">
                {
                    data.lectures.map((lecture) => {
                    return (
                        <Link as={`/mypage/myfeedback/${lecture._id}`}
                            href={{
                                pathname: "/mypage/myfeedback/[id]",
                                query: { data: JSON.stringify(lecture._id) },
                            }}>
                        <div class="col-6">
                        <div className={styles.lecture}>
                            <div className={styles.lecture_name}>
                                <div className={styles.lecture_name_1}>{lecture.name}</div>
                                <div className={styles.lecture_name_2}>{lecture.open_semester}</div>
                            </div>
                            <div className={styles.lecture_prof}>{lecture.professor}</div>
                            <div className={styles.lecture_id}>{lecture.lecture_num}</div>
                        </div>
                        </div>
                        </Link>
                    )
                })
                }
            </div>
        </div>
    )
}

export default function Feedback() {
    return (
        <div className={styles.content}>
            <Title mode={3}/>
            <TotalFeedback/>
            <Lectures/>
        </div>
    )
}