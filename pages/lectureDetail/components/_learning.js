import useSWR from "swr"
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import taskStyles from "../../../styles/lectureDetail/_task.module.css"
import ReactPlayer from 'react-player/lazy';

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const LessonList = ({lecture_id}) => {
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/lecture/lesson?lecture=${lecture_id}`, fetcher);

    if (error) return <div>Getting LessonList Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data[0]==undefined) return <div>LessonList Not Existing</div>

    return(
        <div>
            {data.data.map((lesson) => (
                <div key={lesson._id}>
                    <div>{lesson.title}</div>
                    <ReactPlayer
                        url={lesson.content}    // 플레이어 url
                        width='800px'         // 플레이어 크기 (가로)
                        height='500px'        // 플레이어 크기 (세로)
                        playing={true}        // 자동 재생 on
                        muted={true}          // 자동 재생 on
                        controls={true}       // 플레이어 컨트롤 노출 여부
                        light={false}         // 플레이어 모드
                        pip={true}            // pip 모드 설정 여부
                        poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                        onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                    />
                </div>
            ))}
        </div>
    );
}


// const TaskList = () => {
//     const { data, error } = useSWR('/api/lectureDetail/task', fetcher)

//     if (error) return <div>Getting Tasks Failed</div>
//     if (!data) return <div>Loading...</div>

//     return(
//         <div>
//             {data.data.map((task) => (
//                 <div className={taskStyles["task-item"]} key={task._id}>
//                     <div className={taskStyles["task-item-done"]}></div>
//                     <div className={taskStyles["task-item-title"]}>{task.title}</div>
//                     <div className={taskStyles["task-item-btn"]}>다운로드</div>
//                 </div>                
//             ))}
//         </div>
//     );
// }

export default function Learning({lecture_id}){
    return(
        <div>
            <div>
                <div className={commonStyles.title}>나의 학습</div>
                <LessonList lecture_id={lecture_id}/>
            </div>

            {/* <div className={taskStyles.task}>
                <div className={commonStyles.title}>수업자료</div>
                <TaskList/>
            </div> */}
        </div>
    );
};
