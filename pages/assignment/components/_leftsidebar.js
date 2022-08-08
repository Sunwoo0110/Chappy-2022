import styles from "../../../styles/assignment/_sidebar.module.css"

function Problem(props) {
    return (
        <div className={styles.problem}>
            <div className={styles.section_title}>문제와 제한사항</div>
            
            <div style={{overflowY: "scroll", height:"100%"}}>
                <div className={styles.section_element}>문제</div>
                <div className={styles.content}>{props.data.description}</div>

                <div className={styles.section_element}>제한사항</div>
                <div className={styles.content}>{props.data.constraint}</div>
                {/* <p>{props.data.example}</p> */}
            </div>
        </div>
    )
}

function Example(props) {
    const examples = props.data

    return (
        <div className={styles.testcase}>
            <div className={styles.section_title}>테스트케이스</div>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <ul>
                {examples.map((ex) => {
                    if (!ex.is_open) return
                    return (
                        <li key={examples.indexOf(ex)}>
                            <div className={styles.content}>
                                입력값: main({ex.inputs}) 출력값: {ex.expected_output}
                                <button style={{marginLeft:"15px"}}type="button" class="btn btn-outline-primary" 
                                onClick={() => navigator.clipboard.writeText(`main(${ex.inputs})`)}>Copy</button>
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

export default function LeftSideBar({ assignment, example }) {
    return (
        // <div style={styles.leftsidebar}>
        <div className={styles.sidebar}>
            <Problem data={assignment} />
            <Example data={example} />
        </div>
    )
}