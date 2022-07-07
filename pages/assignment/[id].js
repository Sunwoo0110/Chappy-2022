import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import LeftSideBar from "./components/_leftsidebar"
import CodingBox from "./components/_codingbox"
import RightSideBar from "./components/_rightsidebar"

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
    },
    navbar: {
        width: '100%',
        height: '10%',
    },
    main: {
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'row',
        background: 'green',
        columnGap: '5px',
    },
    leftsidebar: {
        display: 'flex',
        flexDirection: 'column',
        background: 'red',
        order: 1,
        width: '25%',
    },
    codingbox: {
        display: 'flex',
        background: 'yellow',
        flexDirection: 'column',
        order: 2,
        width: '50%',
    },
    rightsidebar: {
        display: 'flex',
        flexDirection: 'column',
        background: 'blue',
        order: 3,
        width: '25%',
    },
}

const NavBar = ({ title }) => {
    return <nav style={styles.navbar}>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/assignment">
            <a>Assignments</a>
        </Link>
        <h1>Assignment: {title}</h1>
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
    const [code, setCode] = useState('')
    const [output, setOutput] = useState('')

    const handleCheckPoint = async (code, action) => {
        setCode(code)
        console.log('code@CodingPage: ', action, code);
        const res = await fetch('/api/runCode', {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
            },
            body: code,
        })
        const _output = (await res.json())?.output
        if (_output === '')
            setOutput('별도의 출력이 없습니다.\n코드를 확인해주세요 :)')
        else
            setOutput(_output)//.replace('\n', '<br>'))
    }

    return (
        <div style={styles.container}>
            <NavBar
                title={assignment.title} />
            <div style={styles.main}>
                <div style={styles.leftsidebar}>leftsidebar
                    <LeftSideBar
                        assignment={assignment}
                        testcase={testcase} />
                </div>
                <div style={styles.codingbox}>
                    <CodingBox
                        assignment={assignment}
                        onClickCheckPoint={handleCheckPoint} />
                </div>
                <div style={styles.rightsidebar}>leftsidebar
                    <RightSideBar
                        output={output} />
                </div>
            </div>
        </div>
    )
}