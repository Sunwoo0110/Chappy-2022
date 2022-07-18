<<<<<<< HEAD
<<<<<<< HEAD
const styles = {
    rightsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'white',
        rowGap: '10px',
    },
    results: {
        display: 'flex',
        flexDirection: 'column',
        background: "white",
        height: '100%',
    },
    feedback: {
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
}
=======
=======
import { useSelector } from "react-redux"
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
>>>>>>> d0c7e1c78e4d6d3f337f640185593800ac1bf2c2
import styles from "../../../styles/_sidebar.module.css"
>>>>>>> 070b73713b2d159122593c5379923d0fdd73ebf8

function Results({ result }) {
    return (
        <div className={styles.outputs}>
            <div className={styles.section_title}>실행결과</div>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {result}
            </p>
            </div>
        </div >
    )
}

function Result() {
    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>채점결과</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}

function Hint() {
    const hintVal = useSelector(state => state.hint);

    return (
        //힌트 개수 쓰려면 아래 값 고고
        // {hintVal.num}

        <div className={styles.feedback}>
            <h3 className={styles.section_title}>힌트</h3>
            <div style={{overflowY: "scroll", height:"100%"}}>
                {hintVal.content == null &&
                    <div>Loading ... </div>
                }

                {hintVal.num == -1 &&
                    <div>{hintVal.content} </div>
                }

                {hintVal.num!=-1 && hintVal.content!=null &&
                    Object.keys(hintVal.content).map((line) => (
                        hintVal.content[line].map((contents) => (
                            Object.keys(contents).map((content) => (
                                <li key={line.toString()+content.toString()}>
                                    <div>line {line}</div>
                                    <div>{content+" "+contents[content]}</div>
                                </li>
                    ))))))
                }
            </div>
        </div>
    )
}

function Grade() {
    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>성적</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}

//해결방안 일단은 testcase와 같은 내용으로 채움
//onclick 함수도 testcase 내용 클립보드에 복사하는 함수임
//해결방안 바뀐거 어떻게 해야할지 아직 안정해져서 일단 냅둠
function Solutions(props) {
    const testcases = props.data;
    const feedbackVal = useSelector(state => state.feedback);

    return (
        <div className={styles.feedback}>
            <div className={styles.section_title}>해결방안</div>
            <div style={{overflowY: "scroll", height:"100%"}}>
                <ul>
                    {testcases.map((tc) => {
                        if (!tc.is_open) return
                        return (
                            <li key={testcases.indexOf(tc)}>
                                <div className={styles.content}>
                                    {tc.inputs}: {tc.expected_output}
                                    <button style={{marginLeft:"15px"}} type="button" class="btn btn-outline-primary" 
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

//여기서도 피드백이 어떻게 진행될지 정해지지 않아 임의의 값으로 비교
function CompareAnswer() {
    // style needs to be fixed
    const diffStyle = {
        variables: {
          light: {
            codeFoldGutterBackground: "#6F767E",
            codeFoldBackground: "#E2E4E5"
          }
        }
    };

    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>답안비교</h3>
            <div style={{overflowY: "scroll", height:"100%"}}>
                <ReactDiffViewer
                        oldValue="print('hello')"
                        newValue="print('hihi)"
                        splitView={false}
                        compareMethod={DiffMethod.LINES}
                        styles={diffStyle}
                        // leftTitle="Version A"
                        // rightTitle="Version B"
                        // renderContent={highlightSyntax}
                />
            </div>
        </div>
    )
}

/* mode: 0 채점 */
/* mode: 1 실행 */
/* mode: 2 제출 */
export default function RightSideBar({ mode, output, solutions }) {
    return (
        <div className={styles.sidebar}>
            {
                mode === 0 ?
                <>
                <Result />
                <Hint/>
                </>
                : mode === 1 ?
                <Outputs output={output} />
                    :
                    <>
                    <Grade/>
                    <Solutions data={solutions}/>     
                    <CompareAnswer/> 
                    </>
            }            
        </div>
    )
}