import { useCallback, useEffect, useState } from "react";
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

    return(
        <tr key={props.lecture._id}>
            <td>{`${props.lecture.name}`}</td>
            <td>{`${props.lecture.professor}`}</td>
            <td>{`${props.lecture.classnumber}`}</td>
            <td>{`${props.lecture.open}`}</td>
            <td>
                <button onClick={() => props.addLecture(props.lecture._id)}>Add</button>
            </td>
            <td>
                {
                    props.deleteLecture !== undefined ?
                    <button onClick={() => props.deleteLecture(props.lecture._id)}>Delete</button>
                    : null
                }
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

        mutate(`/api/lecture/${user_id}`);

    }

    async function onDelete(_id) {

        const newList =  await fetch(`/api/lecture/lecture`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lecture_id: _id }),
        })

        mutate(`/api/lecture/lecture`);
        
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
                            addLecture={() => onAdd(lecture._id)}
                            deleteLecture={() => onDelete(lecture._id)}/>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

const AddLecture = () => {

    const { mutate } = useSWRConfig();

    const [name, setName] = useState('');
    const [professor, setProfessor]= useState('');
    const [classnumber, setClassnumber] = useState('');
    const [open, setOpen] = useState(0);

    const clickHandler = async () => {

        await axios.post('/api/lecture/lecture', {
            "name": name,
            "professor": professor,
            "classnumber": classnumber,
            "open": open,
        })
        .then((res) => {
            // if (res.data.result === null) {
            //     let payload = {
            //         result: "실행 결과가 없습니다",
            //     };
            //     dispatch(runActions.setRun(payload));
            // } else {
            //     let payload = {
            //         result: res.data.result,
            //     };
            //     dispatch(runActions.setRun(payload));
            // }
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/lecture`);
    }

    return (
    <div>
        <h6>name</h6>
        <input type="text" onChange={(e) => setName(e.target.value)}/>
        <h6>professor</h6>
        <input type="text" onChange={(e) => setProfessor(e.target.value)}/>
        <h6>classnumber</h6>
        <input type="text" onChange={(e) => setClassnumber(e.target.value)}/>
        <h6>open</h6>
        <input type="number" onChange={(e) => setOpen(e.target.value)}/>
        <button onClick={clickHandler}>완료</button>
    </div >
    )

}

const FindLecture = () => {

    const { mutate } = useSWRConfig();
    // const { data, error } = useSWR('/api/lecture/lecture', fetcher);
    const user_id = "62a9a23fd5ca81cddd59604b" // user _id

    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);
    const [type, setType] = useState('');

    const clickHandler = async () => {

        console.log(type);
        await axios.put('/api/lecture/lecture', {
            "name": search,
            // "type": type
        })
        .then((res) => {
            setList(res.data.lectures);
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
        })

        mutate(`/api/lecture/lecture`);
    }

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

        mutate(`/api/lecture/${user_id}`);

    }


    return (
        <div>
            <select name="semester">
                <option value="2022-1">2022년 1학기</option>
                <option value="2021-2">2021년 2학기</option>
                <option value="2021-1">2021년 1학기</option>
            </select>
            <select name="type" onChange={(e) => setType(e.target.value)}>
                <option value="">--select--</option>
                <option value="name">과목명</option>
                <option value="professor">교수명</option>
                <option value="classnumber">학수 번호</option>
            </select>
            <input type="text" onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={clickHandler}>검색</button>
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>professor</th>
                        <th>classnumber</th>
                        <th>open</th>
                    </tr>
                    {list.map((lecture) => (
                        <Lecture
                            lecture={lecture}
                            key={lecture._id}
                            addLecture={() => onAdd(lecture._id)} />
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default function Index() {

    const [mode, setMode] = useState(0);

    return (
        <div>
            <h2>강의 목록</h2>
            {/* <button onClick={clickHandler}>전체 과목</button>
            <button onClick={clickHandler}>내 과목</button> */}
            <h3>나의 강의 목록</h3>
            <MyLectureList />
            <h3>전체 강의 목록</h3>
            <LectureList />
            <h3>강의 추가하기</h3>
            <AddLecture />
            <h3>강의 검색하기</h3>
            <FindLecture />
        </div>
    )
}