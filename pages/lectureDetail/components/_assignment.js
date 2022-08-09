import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";

export default function Assignment(){
    return(
        <div>
            <div>
                <div className={commonStyles.title}>이번주 과제</div>
            </div>
            <div>
                <div className={commonStyles.title}>제출한 과제</div>
            </div>
        </div>
    );
}
