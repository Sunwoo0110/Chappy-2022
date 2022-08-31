import styles from "../../../styles/mypage/_myfeedback.module.css"
import Title from "./_title"
import useSWR, { useSWRConfig } from "swr"
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';

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
    const semester="2022년 1학기"
    const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)
    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    console.log("lecture:::: ", data)

    return(
        <div className={styles.section_bg}>
            <div className={styles.grade}>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>전체평점</div>
                    <div className={styles.grade_2}>4.0</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>이번학기 평점</div>
                    <div className={styles.grade_2}>4.0</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>전체평점</div>
                    <div className={styles.grade_2}>35회</div>
                </div>
            </div>

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
        </div>
    )
}