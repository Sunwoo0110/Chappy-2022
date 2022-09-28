import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import examStyles from "../../../styles/lectureDetail/_exam.module.css";
import axios from "../../../lib/api";
import moment from 'moment';
import Moment from 'react-moment';

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

// const date = moment('00:00:00','HH:mm:ss');
// const date = moment().format();
const curDateTime = moment().toISOString();
const todayDate = moment().hours('00').minutes('00').seconds('00');
const tomorrow = moment().add(1, 'days').hours('00').minutes('00').seconds('00');
const tomorrowDate = tomorrow.toISOString();

const TodayExamList = ({lecture_id}) => {
    const bodyData = {
        pipeline: [
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    '$lecture_id' , 
                                    { $toObjectId: lecture_id } 
                                ]
                            },
                            {
                                $gte: [
                                    '$open_at',
                                    { $toDate: todayDate }
                                ]
                            },
                            {
                                $gte: [
                                    '$closing_at',
                                    { $toDate: curDateTime }
                                ]
                            },
                        ],
                    },
                    type: 1,
                }
            },
        ]
    };
    const { data, error } = useSWR([`/api/lecture/assignment/aggregate`, bodyData], postFetcher)

    if (error) return <div>Getting Today Exams Failed</div>
    if (!data) return <div>Loading...</div>
    if (data==null || data.data.length==0) 
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
    const bodyData = {
        pipeline: [
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    '$lecture_id' , 
                                    { $toObjectId: lecture_id } 
                                ]
                            },
                            {
                                $gte: [
                                    '$open_at',
                                    { $toDate: tomorrowDate }
                                ]
                            },

                        ],
                    },
                    type: 1,
                }
            },
        ]
    };
    const { data, error } = useSWR([`/api/lecture/assignment/aggregate`, bodyData], postFetcher)
    console.log(error)
    if (error) return <div>Getting Scheduled Exams Failed</div>
    if (!data) return <div>Loading...</div>
    if (data==null || data.data.length==0) 
        return <div className={examStyles["exam-today"]}>
                <div className={examStyles["exam-today-none"]}>
                    예정된 시험이 없습니다.
                </div>
            </div>

    return(
        <div>
            {data?.data.map((exam) => (
                <div className={examStyles["exam-scheduled-item"]} key={exam._id}>
                    <div className={examStyles["exam-scheduled-item-title"]}>{exam.title}</div>
                    <div className={examStyles["exam-scheduled-item-date"]}>{exam.open_at.toString().split('T')[0].replace(/-/g, '.')}</div>
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
