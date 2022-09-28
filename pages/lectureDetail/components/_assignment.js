import useSWR from "swr"
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import assignmentStyles from "../../../styles/lectureDetail/_assignment.module.css";

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const ThisWeekList = ({lecture_id}) => {
    const user = useSelector(state => state.user);
    const user_id = user.id;

    const { data, error } = useSWR(`/api/aggregation/lectureDetail/assignment/this_week?lecture_id=${lecture_id}&user_id=${user_id}`, fetcher);

    if (error) return <div>Getting ThisWeekList Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data[0]==undefined) return <div>ThisWeekList Not Existing</div>

    return(
        <div>
            {data.data.map((assignment) => (
                <div className={assignmentStyles["assignment-item"]} key={assignment._id}>
                    <div className={assignmentStyles["assignment-item-title"]}>{assignment.title}</div>
                    <div className={assignmentStyles["assignment-item-date"]}>{(assignment.closing_at).split('T')[0].replace(/-/g, '.')}</div>
                    <div className={assignmentStyles["assignment-item-date"]}>{assignment.closing_at}</div>
                    <Link as={`"/assignment/${assignment._id}`}
                        href={{
                            pathname: "/assignment/[id]",
                            query: { data: JSON.stringify(assignment._id) },
                        }}>
                        <div className={assignmentStyles["assignment-item-btn"]}>제출하기</div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

const SubmittedList = ({lecture_id}) => {
    const user = useSelector(state => state.user);
    const user_id = user.id;

    const { data, error } = useSWR(`/api/aggregation/lectureDetail/assignment/submitted?lecture_id=${lecture_id}&user_id=${user_id}`, fetcher);

    if (error) return <div>Getting SubmittedList Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data[0]==undefined) return <div>SubmittedList Not Existing</div>

    return(
        <div>
            {data.data.map((subAssignment) => (
                <div className={assignmentStyles["assignment-item"]} key={subAssignment._id}>
                    <div className={assignmentStyles["assignment-item-title"]}>{subAssignment.title}</div>
                    <div className={assignmentStyles["assignment-item-btn"]}>다운로드</div>
                </div>
            ))}
        </div>
    );
}


export default function Assignment({lecture_id}){
    return(
        <div>
            <div className={assignmentStyles.assignment}>
                <div className={commonStyles.title}>이번주 과제</div>
                <ThisWeekList lecture_id={lecture_id}/>
            </div>
            <div className={assignmentStyles.assignment}>
                <div className={commonStyles.title}>제출한 과제</div>
                <SubmittedList lecture_id={lecture_id}/>
            </div>
        </div>
    );
}
