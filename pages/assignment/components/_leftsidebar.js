// import styles from "../../../styles/_leftsidebar.module.css"
const styles = {
    leftsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'white',
        // rowGap: '10px',
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
        color: "white",
        backgroundColor: "#414E5A",
        padding: "10px",
        fontFamily: "Arial",
        fontSize:"15px",
        fontWeight: "bold"
    },
    section_element:{
        color: "black",
        backgroundColor: "#bdbdbd",
        padding: "5px",
        paddingLeft:"10px",
        fontFamily: "Arial",
        fontSize:"14px",
    },
    content:{
        fontSize:"13px",
        paddingLeft:"10px",
        paddingRight:"10px",
    }
}

function Problem(props) {
    return (
        <div style={props.style}>
            <div style={styles.section_title}>문제와 제한사항</div>
            
            <div style={{overflowY: "scroll", height:"100%"}}>
                <p style={styles.section_element}>문제</p>
                <p style={styles.content}>{props.data.description}</p>

                <p style={styles.section_element}>제한사항</p>
                <p style={styles.content}>{props.data.constraint}</p>
                {/* <p>{props.data.example}</p> */}
            </div>
        </div>
    )
}

function Testcase(props) {
    const testcases = props.data

    return (
        <div style={props.style}>
            <div style={styles.section_title}>테스트케이스</div>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <ul>
                {testcases.map((tc) => {
                    if (!tc.is_open) return
                    return (
                        <li key={testcases.indexOf(tc)}>
                            <div style={styles.content}>
                                {tc.inputs}: {tc.expected_output}
                                <button type="button" class="btn btn-outline-primary" 
                                onClick={() => navigator.clipboard.writeText(`main(${tc.inputs})`)}>Copy</button>
                            </div>
                        </li>
                    )
                }
                )}
            </ul>
            </div>
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