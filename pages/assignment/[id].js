import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import LeftSideBar from "./components/_leftsidebar";
import CodingBox from "./components/_codingbox";
import RightSideBar from "./components/_rightsidebar";

import {HouseDoorFill, ListTask} from 'react-bootstrap-icons';
import styles from "../../styles/assignment/CodingPage.module.css";

import * as hintActions from "../../store/modules/hint";
import * as feedbackActions from "../../store/modules/feedback";
import * as runActions from "../../store/modules/run";

const NavBar = ({ title }) => {
    return <nav className={styles.navbar}>
        <div className={styles.navbar_left}>
            <div >
                <Link href="/">
                    <HouseDoorFill size={30}/>
                </Link>
            </div>
            {/* <div >
                <Link href="/assignment">
                    <ListTask size={30}/>
                </Link>
            </div> */}
        </div>
        <div className={styles.navbar_center}>
            <div className={styles.navbar_title}>JAVA Script 실습</div>
            <div className={styles.navbar_title}>week 1: {title}</div>
        </div>
        <div className={styles.navbar_right}>
            <div className={styles.navbar_title}>2일 13분 30분 남았습니다</div>
            <button type="button" style={{backgroundColor: "#414E5A", border: "none"}} >
                <img src="/images/setting.png" className={styles.image_button} alt="file" onClick={() => {}}/>
            </button>
        </div>
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
    const [example, setExample] = useState(
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
    
    /* mode: 0 채점 */
    /* mode: 1 실행 */
    /* mode: 2 제출 */
    const [mode, setMode] = useState(1);

    const handleCheckPoint = async (code, action) => {
        setCode(code); 

        if(action==="test") {
            /* 채점 버튼 */
            setMode(0);
            setTC(code);
        }
        else if(action==="run") {
            /* 실행 버튼 */
            setMode(1);
            setRun(code);
        }
        else if(action==="submit"){
            /* 제출 버튼 */
            setMode(2);
            setHint(code); 
            setFeedback(code); 
        }
        else if(action==="hint"){
            /* 검증 버튼 */
            setMode(3);
            // setHint(code);
            setRun(code);
            console.log("validation")

        } else {

        }

        console.log('code@CodingPage: ', action, code);
    }

    const setRun = useCallback(async (code)=> {
        await axios.post('/api/assignment/runcode', {
            "code": code,
        })
        .then((res) => {
            if (res.data.result === null) {
                let payload = {
                    result: "실행 결과가 없습니다",
                };
                dispatch(runActions.setRun(payload));
            } else {
                let payload = {
                    result: res.data.result,
                };
                dispatch(runActions.setRun(payload));
            }
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

    const setTC = useCallback(async (code)=> {
        const num = 1;
        await axios.post(`/api/assignment/runcode/${num}`, {
            "code": code,
        })
        .then((res) => {
            console.log(res.data)
            let payload = {
                all_result: res.data.result,
                score: res.data.score
            };
            dispatch(runActions.setTC(payload));
        })
        .catch(error => {
            console.log("failed");
            console.log(error.response);
            let payload = {
                result: "Server Error"
            };        
            dispatch(runActions.setTC(payload));
            
        });
    }, [dispatch]);

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
                        example={example} />
                </div>
                <div className={styles.codingbox}>
                    <CodingBox
                        assignment={assignment}
                        onClickCheckPoint={handleCheckPoint} />
                </div>
                <div className={styles.rightsidebar}>
                    <RightSideBar
                        mode={mode}
                        solutions={solutions} />
                </div>
            </div>
        </div>
    )
}