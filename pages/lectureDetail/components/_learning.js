import { useCallback } from "react";
import useSWR from "swr"
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import taskStyles from "../../../styles/lectureDetail/_task.module.css"
import ReactPlayer from 'react-player/lazy';
import { useState } from "react";
import axios from "../../../lib/api";
import * as weekActions from "../../../store/modules/week"

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

const LessonList = ({lecture_id}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const user_id = user.id;
    
    const selectedWeek = useSelector(state => state.week);
    const learningWeek = selectedWeek.learning;
    const setLearningWeek = useCallback( (week) => {
        let payload = {
            learning: week,
        };
        dispatch(weekActions.setLearning(payload));
    }, [dispatch]);

    const bodyData = {
        pipeline: [
            {
                $match: {
                    $expr: {
                        $eq: [
                            '$lecture_id' , 
                            { $toObjectId: lecture_id } 
                        ],
                    }
                },
            },
            {
                $sort: {
                    open_at: -1
                }
            },
        ]
    }

    const { data, error } = useSWR([`/api/lecture/lesson/aggregate`, bodyData], postFetcher);

    if (error) return <div>Getting LessonList Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data[0]==undefined) return <div>LessonList Not Existing</div>

    const handleEntireClickEvent = () => {
        setLearningWeek(0);
    };

    return(
        <div>
            {
                learningWeek!=0 ?
                <>
                    <div className={taskStyles["whole-btn"]} onClick={() => handleEntireClickEvent()}>전체 강의보기</div>
                </>
                    :
                    <></>
            }
            {data.data.map((lesson) => (
                <div key={lesson._id}>
                    {
                        learningWeek==0 || lesson.weeks==learningWeek ?
                        <>
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
                                    // onEnded={() => handleVideo()}  // 플레이어 끝났을 때 이벤트
                            />
                        </>
                            :
                            <></>
                    }
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
