import useSWR from "swr"

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const TodayExamList = () => {
    const { data, error } = useSWR('/api/lecture_detail/exam/today', fetcher)
    if (error) return <div>Getting Today Exams Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==null) return <div>오늘은 예정된 시험이 없습니다</div>

    return(
        <div>
            <div>
                {data.data.map((exam) => (
                    <li key={exam._id}>
                        <div>{exam.title}</div>
                    </li>
                ))}
            </div>
        </div>        
    );
}

const ScheduledExamList = () => {
    const { data, error } = useSWR('/api/lecture_detail/exam/scheduled', fetcher)
    if (error) return <div>Getting Scheduled Exams Failed</div>
    if (!data) return <div>예정된 시험이 없습니다.</div>

    return(
        <div>
            {data.data.map((exam) => (
                <li key={exam._id}>
                    <div>{exam.title}</div>
                    <div>{exam.date}</div>
                    {exam.public==true && 
                        <div>공개</div>
                    }
                    {exam.public==false && 
                        <div>미공개</div>
                    }
                </li>
            ))}
        </div>
    );
}

export default function Exam(){
    return(
        <>
        <div>

        </div>
        <div>
            <div>
                <p>오늘의 시험</p>
                <TodayExamList/>
            </div>
            <div>
                <p>예정된 시험</p>
                <ScheduledExamList/>
            </div>
        </div>
        </>
    );
};
