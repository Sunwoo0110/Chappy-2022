import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import examStyles from "../../../styles/lectureDetail/_exam.module.css";

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const TodayExamList = ({lecture_id}) => {
    const { data, error } = useSWR(`/api/lectureDetail/${lecture_id}/exam/today`, fetcher)
    if (error) return <div>Getting Today Exams Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==null || data.data[0]==undefined) 
        return <div className={examStyles["exam-today"]}>
                <div className={examStyles["exam-today-none"]}>
                    오늘은 예정된 시험이 없습니다
                </div>
            </div>

    return(
        <div>
            {data.data.map((exam) => (
                <li key={exam._id}>
                    <div>{exam.title}</div>
                </li>
            ))}
        </div>        
    );
}

const ScheduledExamList = ({lecture_id}) => {
    const { data, error } = useSWR(`/api/lectureDetail/${lecture_id}/exam/scheduled`, fetcher)
    if (error) return <div>Getting Scheduled Exams Failed</div>
    if (!data) return <div>예정된 시험이 없습니다.</div>

    return(
        <div>
            {data?.data.map((exam) => (
                <div className={examStyles["exam-scheduled-item"]} key={exam._id}>
                    <div className={examStyles["exam-scheduled-item-title"]}>{exam.title}</div>
                    <div className={examStyles["exam-scheduled-item-date"]}>{exam.open_at}</div>
                    {exam.is_opened==true && 
                        <div className={examStyles["exam-scheduled-item-public"]}>시험보기</div>
                    }
                    {exam.is_opened==false && 
                        <div className={examStyles["exam-scheduled-item-private"]}>미공개</div>
                    }
                </div>
            ))}
        </div>
    );
}

export default function Exam({lecture_id}){
    return(
        <div>
            <div className={examStyles.exam}>
                <div className={commonStyles.title}>오늘의 시험</div>
                <TodayExamList lecture_id={lecture_id}/>
            </div>
            <div className={examStyles.exam}>
                <div className={commonStyles.title}>예정된 시험</div>
                <ScheduledExamList lecture_id={lecture_id}/>
            </div>
        </div>
    );
};
