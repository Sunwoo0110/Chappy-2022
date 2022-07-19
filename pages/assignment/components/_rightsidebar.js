import styles from "../../../styles/_sidebar.module.css";
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from "../../../store/modules";

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

function Run() {

    const runValue = useSelector((state) => state.run);
    console.log(runValue.result);

    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>실행결과</h3>
            <div style={{overflowY: "scroll", height:"100%"}}>
                {runValue.result}
            </div>
        </div>
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
    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>힌트</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
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
function Solutions(props) {
    const testcases = props.data

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

function CompareAnswer() {
    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>답안비교</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
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
                <Run/>
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