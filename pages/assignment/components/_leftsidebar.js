import styles from "../../../styles/_sidebar.module.css"

function Problem(props) {
    return (
        <div className={styles.problem}>
            <div className={styles.section_title}>문제와 제한사항</div>
            
            <div style={{overflowY: "scroll", height:"100%"}}>
                <p className={styles.section_element}>문제</p>
                <p className={styles.content}>{props.data.description}</p>

                <p className={styles.section_element}>제한사항</p>
                <p className={styles.content}>{props.data.constraint}</p>
                {/* <p>{props.data.example}</p> */}
            </div>
        </div>
    )
}

function Testcase(props) {
    const testcases = props.data

    return (
        <div className={styles.testcase}>
            <div className={styles.section_title}>테스트케이스</div>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <ul>
                {testcases.map((tc) => {
                    if (!tc.is_open) return
                    return (
                        <li key={testcases.indexOf(tc)}>
                            <div className={styles.content}>
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
        // <div style={styles.leftsidebar}>
        <div className={styles.sidebar}>
            <Problem data={assignment} />
            <Testcase data={testcase} />
        </div>
    )
}