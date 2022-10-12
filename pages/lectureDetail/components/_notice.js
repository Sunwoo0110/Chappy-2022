import useSWR from "swr"
import { AiFillPlusCircle } from "react-icons/ai";
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import noticeStyles from "../../../styles/lectureDetail/_notice.module.css"
import axios from "../../../lib/api";
import Link from "next/link";

const fetcher = async (url, queryParams='') => {
    if (typeof url != 'string')
        return { data: [] }
    return await axios.get(url, {params: queryParams})
        .then((res) => {
            return res.data
        })
}

const NoticeList = ({lecture_id}) => {
    const paramData = {
        lecture_id: lecture_id,
    };
    const { data, error } = useSWR([`/api/lecture/notice`, paramData], fetcher);

    if (error) return <div>Getting Notice Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==-1) return <div>Notice Not Existing</div>
    
    return(
        <div>
            {/* 교수자일때만 나오게 처리 필요 */}
            <Link as={`/lectureDetail/${lecture_id}/addnotice`}
                href={{
                    pathname: "/lectureDetail/[id]/addnotice",
                }}>
                <div className={noticeStyles["notice-add-btn"]}><AiFillPlusCircle/>공지 추가하기</div>
            </Link>
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

export default function Notice({lecture_id}){
    return (
        <div className={noticeStyles.notice}>
            <div className={commonStyles.title}>새로운 공지</div>
            <NoticeList lecture_id={lecture_id}/>
        </div>
    );
}
