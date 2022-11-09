import useSWR from "swr"
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import noticeStyles from "../../../styles/lectureDetail/_notice.module.css"
import taskStyles from "../../../styles/lectureDetail/_task.module.css"
import axios from "../../../lib/api";

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
    const { data, error } = useSWR([`/api/lecture/notice/aggregate`, bodyData], postFetcher);

    if (error) return <div>Getting Notice Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==-1) return <div>Notice Not Existing</div>
    
    return(
        <div>
            {data?.data.map((notice) => (
                <div className={noticeStyles["notice-item"]} key={notice._id}>
                    <div className={noticeStyles["notice-item-type-new"]}>{notice.type}</div>
                    <div className={noticeStyles["notice-item-title"]}>{notice.title}</div>
                    <div className={noticeStyles["notice-item-date"]}>{notice.date}</div>
                </div>
            ))}
        </div>
    );
}

const TaskList = ({lecture_id}) => {
    const user = useSelector(state => state.user);
    const user_id = user.id;

    const paramData = {
        lecture_id: lecture_id,
        user_id: user_id,
    };
    const { data, error } = useSWR([`/api/aggregation/lectureDetail/lesson/this_week`, paramData], fetcher)

    if (error) return <div>Getting Tasks Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==-1) return <div>Task Not Existing</div>

    return(
        <div>
            {data.data.map((task) => (
                <div className={taskStyles["task-item"]} key={task.lesson._id}>
                    {task.attendance==1 && 
                        <div className={taskStyles["task-item-done"]}/>
                    }
                    {task.attendance==0 && 
                        <div className={taskStyles["task-item-undone"]}/>                   
                    }
                    <div className={taskStyles["task-item-title"]}>{task.lesson.title}</div>
                    <div className={taskStyles["task-item-btn"]}>강의듣기</div>
                </div>                
            ))}
        </div>
    );
}

export default function Home({lecture_id}){
    return (
        <div>
            <div className={noticeStyles.notice}>
                <div className={commonStyles.title}>새로운 공지</div>
                <NoticeList lecture_id={lecture_id}/>
            </div>
            <div className={taskStyles.task}>
                <div className={commonStyles.title}>이번주 할일</div>
                <TaskList lecture_id={lecture_id}/>
            </div>
        </div>
    );
}
