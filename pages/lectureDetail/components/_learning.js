import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import taskStyles from "../../../styles/lectureDetail/_task.module.css"

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const TaskList = () => {
    const { data, error } = useSWR('/api/lectureDetail/task', fetcher)

    if (error) return <div>Getting Tasks Failed</div>
    if (!data) return <div>Loading...</div>

    return(
        <div>
            {data.data.map((task) => (
                <div className={taskStyles["task-item"]} key={task._id}>
                    <div className={taskStyles["task-item-done"]}></div>
                    <div className={taskStyles["task-item-title"]}>{task.title}</div>
                    <div className={taskStyles["task-item-btn"]}>다운로드</div>
                </div>                
            ))}
        </div>
    );
}

export default function Learning(){
    return(
        <div>
            <div>
                <div className={commonStyles.title}>나의 학습</div>
            </div>
            <div className={taskStyles.task}>
                <div className={commonStyles.title}>수업자료</div>
                <TaskList/>
            </div>
        </div>
    );
};
