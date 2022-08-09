import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";

export default function Assignment(){
    //assignment DB schema 재정의 필요
    //done:Boolean, subject:String, unit:String 추가 여부

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
