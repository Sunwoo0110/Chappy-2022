import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import LeftSideBar from "./components/_leftsidebar"
import CodingBox from "./components/_codingbox"
import RightSideBar from "./components/_rightsidebar"

import {HouseDoorFill, ListTask} from 'react-bootstrap-icons'
import styles from "../../styles/CodingPage.module.css"


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
    const res = await fetch('/api/assignment', {
        method: 'POST',
        body: assignmentId,
    })

    return (await res.json()).data
}

export default function CodingPage() {
    const router = useRouter()

    const [assignment, setAssignment] = useState(JSON.parse(router.query?.data))
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
    )

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
    )
    const [code, setCode] = useState('')
    const [output, setOutput] = useState('')
    const [mode, setMode] = useState(0)
    /* mode: 0 채점 */
    /* mode: 1 실행 */
    /* mode: 2 제출 */

    const handleCheckPoint = async (code, action) => {
        setCode(code)
        if(action==="test")
            setMode(0)
        else if(action==="run")
            setMode(1)
        else
            setMode(2)

        console.log('code@CodingPage: ', action, code);
        const res = await fetch('/api/runCode', {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
            },
            body: code,
        })
        const _result = (await res.json())?.result
        if (_result === '')
            setResult('별도의 출력이 없습니다.\n코드를 확인해주세요 :)')
        else
            setResult(_result)//.replace('\n', '<br>'))
    }


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