import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import LeftSideBar from "./components/_leftsidebar";
import CodingBox from "./components/_codingbox";
import RightSideBar from "./components/_rightsidebar";

import {HouseDoorFill, ListTask} from 'react-bootstrap-icons';
import styles from "../../styles/CodingPage.module.css";

import * as hintActions from "../../store/modules/hint";
import * as feedbackActions from "../../store/modules/feedback";
import * as runActions from "../../store/modules/run";

const NavBar = ({ title }) => {
    return <nav className={styles.navbar}>
        <div className={styles.navbar_side}>
            <div >
                <Link href="/">
                    <HouseDoorFill size={30}/>
                </Link>
            </div>
            <div >
                <Link href="/assignment">
                    <ListTask size={30}/>
                </Link>
            </div>
        </div>
        <div className={styles.navbar_center}>
            <div className={styles.navbar_title}>Assignment: {title}</div>
        </div>
        <div className={styles.navbar_side}/>
    </nav>
}

async function get_assignment(assignmentId) {
    const res = await fetch('/api/assignment/assignment', {
        method: 'POST',
        body: assignmentId,
    })

    return (await res.json()).data;
}


export default function CodingPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [assignment, setAssignment] = useState(JSON.parse(router.query?.data));
    const [testcase, setTestcase] = useState(
        [
            {
                inputs: '[1,2,3,4], 2',
                expected_output: '3',
                is_open: true,
            },
            {
                inputs: '[5,4,6,23,2], 0',
                expected_output: '5',
                is_open: true,
            },
            {
                inputs: '[2,3,4], 3',
                expected_output: '범위 밖의 인덱스입니다.',
                is_open: false,
            },
        ]
    );

    const [solutions, setSolutions] = useState(
        [
            {
                inputs: '[1,2,3,4], 2',
                expected_output: '3',
                is_open: true,
            },
            {
                inputs: '[5,4,6,23,2], 0',
                expected_output: '5',
                is_open: true,
            },
            {
                inputs: '[2,3,4], 3',
                expected_output: '범위 밖의 인덱스입니다.',
                is_open: false,
            },
        ]
    );
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    
    /* mode: 0 채점 */
    /* mode: 1 실행 */
    /* mode: 2 제출 */
    const [mode, setMode] = useState(0)

    const handleCheckPoint = async (code, action) => {
        setCode(code); 
        
        /* 채점 버튼 */
        // setGrade(code);

        /* 실행 버튼 */
        setRun(code);
        
        /* 제출 버튼 */
        setHint(code); 
        setFeedback(code); 

        if(action==="test")
            setMode(0);
        else if(action==="run")
            setMode(1);
        else
            setMode(2);

        console.log('code@CodingPage: ', action, code);
        // const res = await fetch('/api/runCode', {
        //     method: "POST",
        //     header: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: code,
        // })
        // const _result = (await res.json())?.result
        // if (_result === '')
        //     setResult('별도의 출력이 없습니다.\n코드를 확인해주세요 :)')
        // else
        //     setResult(_result)//.replace('\n', '<br>'))
    }

    const setRun = useCallback(async (code)=> {
        
        await axios.post('/api/assignment/runcode', {
            "code": code,
        })
        .then((res) => {
            // console.log("success");
            // console.log(res.data.result);
            // tc_resultChanger(res.data.result);
            let payload = {
                result: res.data.result,
            };
            dispatch(runActions.setRun(payload));
            
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
            let payload = {
                result: "Server Error"
            };        
            dispatch(runActions.setRun(payload));
        })
    }, [dispatch]);

    // const setGrade = useCallback(async (code)=> {
    //     await axios.put('/api/assignment/runcode/1', {
    //         "code": code,
    //     })
    //     .then((res) => {
    //         // console.log("success");
    //         // console.log(res.data.result);
    //         // tc_resultChanger(res.data.result);
    //     })
    //     .catch(error => {
    //         console.log("failed");
    //         console.log(error.response)
            
    //     });
    // });

    const setHint = useCallback(async (code)=>{
        await axios.post('/api/assignment/hint', {
            //feedback api 완성되면 연결
            "code": code,
        })
        .then((res) => {
            console.log("postHint success");
            let cnt = 0;
            const hint = Object.keys(res.data).map((line) => (
                res.data[line].map((contents) => (
                    Object.keys(contents).map((content) => (
                        cnt++
                    ))
                ))
            ));
    
            let payload = {
                content: Object(res.data),
                num: cnt,
            };
            dispatch(hintActions.setHint(payload));
        })
        .catch(error => {
            console.log("postHint failed");
            console.log(error.response);
            let payload = {
                content: "Server Error",
                num: -1,
            };        
            dispatch(hintActions.setHint(payload));
        });
    }, [dispatch]);    

    const setFeedback = useCallback(async (code)=>{
        await axios.post('/api/assignment/feedback', {
            //feedback api 완성되면 연결
            "code": code,
        })
        .then((res) => {
            console.log("postFeedback success");
            let cnt = 0;
            let line_arr = [];
            let content_key_arr = [];
            let content_val_arr = [];
            const hint = Object.keys(res.data).map((line) => (
                res.data[line].map((contents) => (
                    Object.keys(contents).map((content) => (
                        cnt++,
                        line_arr.push(line),
                        content_key_arr.push(content),
                        content_val_arr.push(contents[content])
                    ))
                ))
            ));

            let payload = {
                all_lines: line_arr,
                all_contents_key: content_key_arr,
                all_contents_val: content_val_arr,
                cur_num: 0,
                cur_line: line_arr[0],
                cur_content_key: content_key_arr[0],
                cur_content_val: content_val_arr[0],
                remain_num: cnt,
            };
            dispatch(feedbackActions.setAllFeedback(payload));
        })
        .catch(error => {
            console.log("postFeedback failed");
            console.log(error.response);
            let payload = {
                all_lines: [],
                all_contents_key: [],
                all_contents_val: [],
                cur_num: -1,
                cur_line: null,
                cur_content_key: null,
                cur_content_val: null,
                remain_num: -1
            };
            dispatch(feedbackActions.setAllFeedback(payload));
        })
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <NavBar title={assignment.title} />
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar
                        assignment={assignment}
                        testcase={testcase} />
                </div>
                <div className={styles.codingbox}>
                    <CodingBox
                        assignment={assignment}
                        onClickCheckPoint={handleCheckPoint} />
                </div>
                <div className={styles.rightsidebar}>
                    <RightSideBar
                        mode={mode}
                        output={output}
                        solutions={solutions} />
                </div>
            </div>
        </div>
    )
}