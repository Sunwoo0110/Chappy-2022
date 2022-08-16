import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr"

import Header from "./components/_header";
import Footer from "./components/_footer";

import styles from "../../styles/lecture/Lecture.module.css";

import LectureList from "./components/_lecturelist";
import Deadline from "./components/_deadline";

// import LectureList from "./components/_lecturelist";

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
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
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.greeting_box}>
                        <div className={styles.greeting_name}>어서오세요 홍길동님!</div>
                        <div className={styles.greeting_week}>지금은 4주차입니다</div>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", columnGap:"5%"}}>
                        <LectureList/>
                        <div style={{width:"30%"}}>
                            <button style={{borderRadius:20, width:"100%"}} class="btn btn-primary" type="button">강의 등록하기</button>
                            <Deadline/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}