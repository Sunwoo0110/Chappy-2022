import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import noticeStyles from "../../../styles/lectureDetail/_notice.module.css"

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const NoticeList = () => {
    const { data, error } = useSWR('/api/lectureDetail/notice', fetcher);

    if (error) return <div>Getting Notices Failed</div>
    if (!data) return <div>Loading...</div>
    
    return(
        <div>
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

export default function Notice(){
    return (
        <div className={noticeStyles.notice}>
            <div className={commonStyles.title}>새로운 공지</div>
            <NoticeList/>
        </div>
    );
}
