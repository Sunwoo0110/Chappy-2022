import useSWR from "swr"

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
        <>
        <div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {data?.data.map((notice) => (
                        <tr key={notice._id}>
                            <td>{notice.type}</td>
                            <td>{notice.title}</td>
                            <td>{notice.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

const TaskList = () => {
    const { data, error } = useSWR('/api/lectureDetail/task', fetcher)

    if (error) return <div>Getting Tasks Failed</div>
    if (!data) return <div>Loading...</div>

    return(
        <div>
            {data.data.map((task) => (
                <li key={task._id}>
                    <div>{task.title}</div>
                    <button>강의듣기</button>
                </li>                
            ))}
        </div>
    );
}

export default function Home(){
    return (
        <div>
            <div>
                <p>새로운 공지</p>
                <NoticeList/>
            </div>
            <div>
                <p>이번주 할일</p>
                <TaskList/>
            </div>
        </div>
    );
}
