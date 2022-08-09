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
            {data.data.map((notice) => (
                <li key={notice._id}>
                    <div>{notice.type}</div>
                    <div>{notice.title}</div>
                    <div>{notice.date}</div>
                </li>                
            ))}
        </div>
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

export default function Notice(){
    return (
        <div>
            <p>새로운 공지</p>
            <NoticeList/>
        </div>
    );
}
