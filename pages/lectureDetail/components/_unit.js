import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import unitStyles from "../../../styles/lectureDetail/_unit.module.css";

export default function Unit(){
    return (
        <div>
            <div className={unitStyles.title}>단원별 학습</div>
        </div>
    );
}
