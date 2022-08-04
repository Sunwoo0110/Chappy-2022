import useSWR from "swr"

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const TotalExamList = () => {
    const { data, error } = useSWR('/api/lecture_detail/exam', fetcher)
    if (error) return <div>Getting Exams Failed</div>
    if (!data) return <div>Loading...</div>
}

export default function Exam(){
    return(
        <>
        <div>

        </div>
        <div>
            <div>
                <p>오늘의 시험</p>
            </div>
            <div>
                <p>예정된 시험</p>
            </div>
        </div>
        </>
    );
};
