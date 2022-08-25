import useSWR from "swr"
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const ThisWeekList = ({lecture_id}) => {
    const user_id = useSelector(state => state.user);

    const { data, error } = useSWR(`/api/lectureDetail/${lecture_id}/${user_id}/assignment/this_week`, fetcher);

    if (error) return <div>Getting ThisWeekList Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data[0]==undefined) return <div>ThisWeekList Not Existing</div>

    return(
        <div>
            {data.data.map((assignment) => (
                <div key={assignment._id}>
                    <div>{assignment.title}</div>
                    <div>{assignment.closing_at}</div>
                    <div>제출하기</div>
                </div>
            ))}
        </div>
    );
}

const SubmittedList = ({lecture_id}) => {
    const user_id = useSelector(state => state.user);

    const { data, error } = useSWR(`/api/lectureDetail/${lecture_id}/${user_id}/assignment/submitted`, fetcher);

    if (error) return <div>Getting SubmittedList Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data[0]==undefined) return <div>SubmittedList Not Existing</div>

    return(
        <div>
            {data.data.map((submitted) => (
                <div key={submitted.submission._id}>
                    <div>{submitted.assignment.title}</div>
                    <div>다운로드</div>
                </div>
            ))}
        </div>
    );
}


export default function Assignment({lecture_id}){
    return(
        <div>
            <div>
                <div className={commonStyles.title}>이번주 과제</div>
                <ThisWeekList lecture_id={lecture_id}/>
            </div>
            <div>
                <div className={commonStyles.title}>제출한 과제</div>
                <SubmittedList lecture_id={lecture_id}/>
            </div>
        </div>
    );
}
