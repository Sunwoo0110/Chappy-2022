
const styles = {
    leftsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'tomato',
        rowGap: '5px',
    },
    problem: {
        display: 'flex',
        flexDirection: 'column',
        background: 'pink',
    },
    testcase: {
        display: 'flex',
        flexDirection: 'column',
        background: 'pink',
    },
}

function Problem(props) {
    return (
        <div style={props.style}>
            <h3>문제</h3>
            <p>{props.data.description}</p>
            <p>{props.data.example}</p>
            <p>{props.data.constraint}</p>
        </div>
    )
}

function Testcase(props) {
    const testcases = props.data

    return (
        <div style={props.style}>
            <h3>테스트케이스</h3>
            <ul>
                {testcases.map((tc) => {
                    if (!tc.is_open) return
                    return (
                        <li key={testcases.indexOf(tc)}>
                            <div>
                                {tc.inputs}: {tc.expected_output}
                                <button onClick={() => navigator.clipboard.writeText(`main(${tc.inputs})`)}>Copy</button>
                            </div>
                        </li>
                    )
                }
                )}

            </ul>
        </div>
    )
}

export default function LeftSideBar({ assignment, testcase }) {

    return (
        <div style={styles.leftsidebar}>
            <Problem
                style={styles.problem}
                data={assignment} />
            <Testcase
                style={styles.testcase}
                data={testcase} />
        </div>
    )
}