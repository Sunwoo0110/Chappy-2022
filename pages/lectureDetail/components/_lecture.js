import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import lectureStyles from "../../../styles/lectureDetail/_lecture.module.css";
import { AiOutlineMail, AiOutlineStar } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';

const percentage = "90%"

const progressbar_inner = { 
    background: "linear-gradient(270deg, #FF0000 2.83%, rgba(255, 214, 0, 0) 103.43%)",
    height: "100%",
    width: percentage,
}


export default function Lecture() {
    const user = useSelector(state => state.user);
    const user_id = user.id;
    
    return (
        <div className={lectureStyles.lecture}>
            <div className={lectureStyles["lecture-info"]}>
                <div className={lectureStyles["lecture-info-title"]}>알고리즘</div>
                <div className={lectureStyles["lecture-info-icons"]}>
                    <AiOutlineMail size="24px"/>
                    <AiOutlineStar size="24px"/>
                    <div className={lectureStyles["lecture-info-icon"]}/>
                </div>
            </div>
            <div className={lectureStyles["lecture-progress"]}>
                <div className={lectureStyles["lecture-progress-title"]}>수업진행도</div>
                <div className={lectureStyles["lecture-progress-title"]}>90%</div>
            </div>
            <div className={lectureStyles["lecture-progressbar"]}>
                <div style={progressbar_inner}/>                
            </div>
        </div>
    );
}