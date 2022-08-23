import styles from "../../../styles/assignment/_sidebar.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { List, MenuButton } from "react-bootstrap-icons";
// import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { ResponsivePie } from '@nivo/pie'
import { useState } from 'react';

/**  실행 결과 **/
function Run() {

    const runValue = useSelector((state) => state.run);
    // console.log(runValue.result);

    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>실행 결과</h3>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                { runValue.result }
            </p>
            </div>
        </div>
    )
}

/**  검증 결과 **/
function Validation() {

    const runValue = useSelector((state) => state.run);
    // console.log(runValue.result);

    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>검증 결과</h3>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {`Your Output: ${runValue.result}`}
            </p>
            </div>
        </div>
    )
}

/**  채점 결과 **/
function Grade() {

    // const runValue = useSelector((state) => state.run);
    // const results = runValue.all_result;
    // // console.log(results);
    // const user = "백우정"; // 추후에 redux 로 user 관리

    // var result = "Wrong";
    // var number = 0;
    
    // if (runValue.score === 100)  result = "Success";
    const [type, setType] = useState(1);

    const handle = {
        padClick: (data) => {
            console.log(data);
        },
    };


    return (
        <div className={styles.outputs}>
            <h3 className={styles.section_title}>채점 결과</h3>
            <div className={styles.problem}>
                <h3>Overall Score</h3>
                <div style={{ width: '100%', height: '75%'}}>
                    <h5 style={{ top: "0px" }}>{"총점\n58"}</h5>
                    <ResponsivePie
                    data={[
                        { id: '기능', value: 88 },
                        { id: '효율', value: 58 },
                        { id: '가독성', value: 32 },
                    ]}
                    margin={{ top: 0, right: 0, bottom: 10, left: 0 }}
                    innerRadius={0.5}
                    padAngle={1.0}
                    cornerRadius={0}
                    colors={['#00B0F0', '#92D050', '#FFC000', '#FFFFFF']}
                    borderWidth={2}
                    enableArcLinkLabels = {false}
                    theme={{
                        labels: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                    }}
                    onClick={handle.padClick}
                    endAngle={270}
                    fit={true}
                    arcLabel={function(e) {return e.id+"\n"+e.value}}
                    borderColor="white"
                    activeOuterRadiusOffset={8}
                    />
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.score_button} style={{backgroundColor: "#00B0F0"}} type="button" onClick={() => setType(1)}>기능 점수 확인</button>
                <button className={styles.score_button} style={{backgroundColor: "#92D050"}} type="button" onClick={() => setType(2)}>효율 점수 확인</button>
                <button className={styles.score_button} style={{backgroundColor: "#FFC000"}} type="button" onClick={() => setType(3)}>가독성 점수 확인</button>
            </div>
            <div className={styles.outputs}>
                {
                    type === 1 ?
                    <div style = {{backgroundColor: "#00B0F0", height: "100%"}}>
                        기능 점수
                    </div>
                    : type === 2 ?
                    <div style = {{backgroundColor: "#92D050", height: "100%"}}>
                        효율 점수
                    </div>
                    :
                    <div style = {{backgroundColor: "#FFC000", height: "100%"}}> 
                        가독성 점수
                    </div>
                }
                
            </div>
            {/* <h4>{`${user}님의 채점 결과는 ${result}입니다`}</h4>
            <h4>{`총점: ${runValue.score}`}</h4>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <ul>
                {results.map((rt) => {
                    ++number;
                    return (
                        <li key={results.indexOf(rt)}>
                            <div className={styles.content}>
                                <h4>{`테스트케이스 ${number}번: ${rt.success}`}</h4>
                                <h4>{`입력값:  ${rt.input}`}</h4>
                                <h4>{`출력값:  ${rt.output}`}</h4>
                            </div>
                        </li>
                    )
                }
                )}
            </ul>
            </div> */}
        </div>
    )
}

/** 제출 힌트 **/
function Hint() {
    // const hintVal = useSelector(state => state.hint);

    // return (
    //     //힌트 개수 쓰려면 아래 값 고고
    //     // {hintVal.num}

    //     <div className={styles.feedback}>
    //         <h3 className={styles.section_title}>힌트</h3>
    //         <div style={{overflowY: "scroll", height:"100%"}}>
    //             {hintVal.content == null &&
    //                 <div>Loading ... </div>
    //             }

    //             {hintVal.num == -1 &&
    //                 <div>{hintVal.content} </div>
    //             }

    //             {hintVal.num!=-1 && hintVal.content!=null &&
    //                 Object.keys(hintVal.content).map((line) => (
    //                     hintVal.content[line].map((contents) => (
    //                         Object.keys(contents).map((content) => (
    //                             <li key={line.toString()+content.toString()}>
    //                                 <div>line {line}</div>
    //                                 <div>{content+" "+contents[content]}</div>
    //                             </li>
    //                 ))))))
    //             }
    //         </div>
    //     </div>
    // )
}

/** 제출 성적 **/
function Final() {
    return (
        <div className={styles.feedback}>
            <h3 className={styles.section_title}>성적</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}

/**  제출 해결 방안 **/
function Solutions(props) {
    //해결방안 일단은 testcase와 같은 내용으로 채움
    //onclick 함수도 testcase 내용 클립보드에 복사하는 함수임
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

/** 제출 답안 비교 **/
//여기서도 피드백이 어떻게 진행될지 정해지지 않아 임의의 값으로 비교
function CompareAnswer() {
    // style needs to be fixed
    // const diffStyle = {
    //     variables: {
    //         light: {
    //             codeFoldGutterBackground: "#6F767E",
    //             codeFoldBackground: "#E2E4E5"
    //         }
    //     }
    // };

    // return (
    //     <div className={styles.feedback}>
    //         <h3 className={styles.section_title}>답안비교</h3>
    //         <div style={{overflowY: "scroll", height:"100%"}}>
    //             <ReactDiffViewer
    //                     oldValue="print('hello')"
    //                     newValue="print('hihi)"
    //                     splitView={false}
    //                     compareMethod={DiffMethod.LINES}
    //                     styles={diffStyle}
    //                     // leftTitle="Version A"
    //                     // rightTitle="Version B"
    //                     // renderContent={highlightSyntax}
    //             />
    //         </div>
    //     </div>
    // )
}

/* mode: 0 채점 */
/* mode: 1 실행 */
/* mode: 2 제출 */
/* mode: 3 검증 */
export default function RightSideBar({ mode, solutions }) {
    return (
        <div className={styles.sidebar}>
            {
                mode === 0 ?
                <>
                <Grade/>
                </>
                : mode === 1 ?
                <Run/>
                : mode === 2 ?
                <>
                <Grade/>
                </>
                : mode === 3 ?
                <Validation />
                : null
            }            
        </div>
    )
}