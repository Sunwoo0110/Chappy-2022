
const styles = {
    leftsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'white',
        rowGap: '10px',
    },
    problem: {
        display: 'flex',
        flexDirection: 'column',
        background: "white",
        height: '50%',
    },
    testcase: {
        display: 'flex',
        flexDirection: 'column',
        background: "white",
        height: '50%',
    },
    section_title:{
        background: "#414E5A",
        color: "white",
    }
}

function Problem(props) {
    return (
        <div style={props.style}>
            <h3 style={styles.section_title}>문제와 제한사항</h3>
            
            <p style={{background: "#bdbdbd",}}>문제</p>
            <p>{props.data.description}</p>
            <p style={{background: "#bdbdbd",}}>제한사항</p>
            <p>{props.data.constraint}</p>
            {/* <p>{props.data.example}</p> */}
        </div>
    )
}

function Testcase(props) {
    const testcases = props.data

    return (
        <div style={props.style}>
            <h3  style={styles.section_title}>테스트케이스</h3>
            <ul>
                {testcases.map((tc) => {
                    if (!tc.is_open) return
                    return (
                        <li key={testcases.indexOf(tc)}>
                            <div>
                                {tc.inputs}: {tc.expected_output}
                                {/* <button onClick={() => navigator.clipboard.writeText(`main(${tc.inputs})`)}>Copy</button> */}
                                <button type="button" class="btn btn-outline-primary" 
                                onClick={() => navigator.clipboard.writeText(`main(${tc.inputs})`)}>Copy</button>
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