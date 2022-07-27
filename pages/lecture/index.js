import { useCallback, useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr"

// import LectureList from "./components/_lecturelist";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

const MyLecture = (props) => {
    // console.log(props.lecture);
    return(
        <tr key={props.lecture._id}>
            <td>{`${props.lecture.name}`}</td>
            <td>{`${props.lecture.professor}`}</td>
            <td>{`${props.lecture.classnumber}`}</td>
            <td>{`${props.lecture.open}`}</td>
            <td>
                <button onClick={() => props.deleteLecture(props.lecture._id)}>Delete</button>
            </td>
        </tr>
    )
    
}

const Lecture = (props) => {
    // console.log(props.lecture);
    return(
        <tr key={props.lecture._id}>
            <td>{`${props.lecture.name}`}</td>
            <td>{`${props.lecture.professor}`}</td>
            <td>{`${props.lecture.classnumber}`}</td>
            <td>{`${props.lecture.open}`}</td>
            <td>
                <button onClick={() => props.addLecture(props.lecture._id)}>Add</button>
            </td>
        </tr>
    )
    
}

const MyLectureList = () => {

    const { mutate } = useSWRConfig()
    const user_id = "62a9a23fd5ca81cddd59604b" // user _id
    const { data, error } = useSWR(`/api/lecture/${user_id}`, fetcher)
    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onDelete(_id) {

        const newList =  await fetch(`/api/lecture/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lecture_id: _id }),
        })

        mutate(`/api/lecture/${user_id}`);
        
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>professor</th>
                        <th>classnumber</th>
                        <th>open</th>
                    </tr>
                    {data?.lectures.map((lecture) => (
                        <MyLecture
                            lecture={lecture}
                            key={lecture._id}
                            deleteLecture={() => onDelete(lecture._id)} />
                    ))}
                </tbody>
            </table>
        </div >
    )
}

const LectureList = () => {

    const { mutate } = useSWRConfig()
    const { data, error } = useSWR('/api/lecture/lecture', fetcher)
    const user_id = "62a9a23fd5ca81cddd59604b" // user _id
    // const { data, error } = useSWR(`/api/lecture/${id}`, fetcher)
    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // const [list, setList] = useState(data.lectures);

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onAdd(_id) {
        // const newLecture = data.lectures.filter((item) => item._id === _id)
        // mutate(`/api/lecture/${id}`, { lectures: newLectures }, false);

        const newList =  await fetch(`/api/lecture/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lecture_id: _id }),
        })

        // console.log(newList.success);

        // if (newList.success === true) {
            mutate(`/api/lecture/${user_id}`);
        // } else {

        // }

        // mutate(`/api/lecture/${id}`, fetcher);
        
        
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>professor</th>
                        <th>classnumber</th>
                        <th>open</th>
                    </tr>
                    {data?.lectures.map((lecture) => (
                        <Lecture
                            lecture={lecture}
                            key={lecture._id}
                            addLecture={() => onAdd(lecture._id)}/>
                    ))}
                </tbody>
            </table>
        </div >
    )
}


export default function Index() {

    const [mode, setMode] = useState(0);

    const clickHandler = () => {
        setMode(0);
        // getLectures();
    }

    return (
        <div>
            <h2>강의 목록</h2>
            {/* <button onClick={clickHandler}>전체 과목</button>
            <button onClick={clickHandler}>내 과목</button> */}
            <h3>나의 강의 목록</h3>
            <MyLectureList />
            <h3>전체 강의 목록</h3>
            <LectureList />
        </div>
    )
}