import styles from "../../../styles/assignment/_sidebar.module.css";
// import { ResponsivePie } from '@nivo/pie'
import { useState, useEffect } from 'react';

/** 제출 성적 **/
function Final() {
  const [type, setType] = useState(1);

  const handle = {
    padClick: (data) => {
      console.log(data);
    },
  };

  return (
    <div className={styles.outputs}>
      <h3 className={styles.section_title}>제출 결과</h3>
      <div className={styles.problem}>
        <h3>Overall Score</h3>
        <div style={{ width: '100%', height: '75%' }}>
          <h5 style={{ top: "0px" }}>{"총점\n58"}</h5>
          {/* <ResponsivePie
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
            enableArcLinkLabels={false}
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
            arcLabel={function (e) { return e.id + "\n" + e.value }}
            borderColor="white"
            activeOuterRadiusOffset={8}
          /> */}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.score_button} style={{ backgroundColor: "#00B0F0" }} type="button" onClick={() => setType(1)}>기능 점수 확인</button>
        <button className={styles.score_button} style={{ backgroundColor: "#92D050" }} type="button" onClick={() => setType(2)}>효율 점수 확인</button>
        <button className={styles.score_button} style={{ backgroundColor: "#FFC000" }} type="button" onClick={() => setType(3)}>가독성 점수 확인</button>
      </div>
      <div className={styles.outputs}>
        {
          type === 1 ?
            <div style={{ backgroundColor: "#00B0F0", height: "100%" }}>
              기능 점수
            </div>
            : type === 2 ?
              <div style={{ backgroundColor: "#92D050", height: "100%" }}>
                효율 점수
              </div>
              :
              <div style={{ backgroundColor: "#FFC000", height: "100%" }}>
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

/** 실행 **/
function Output({ code }) {
  const api_url_runcode = '/api/assignment/runcode'
  const [output, setOutput] = useState("실행중...");

  useEffect(async () => {
    const response = await fetch(api_url_runcode, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });
    const result = await response.json();
    let output;
    if (result?.success !== undefined) {
      output = "실행에 실패했습니다 ㅜㅜ";
    } else {
      output = result.result;
    }
    setOutput(output);
  }, [code]);

  return (
    <div className={styles.feedback}>
      <h3 className={styles.section_title}>실행 결과</h3>
      <div style={{ overflowY: "scroll", height: "100%", margin: "10px" }}>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {output}
        </p>
      </div>
    </div>
  )
}

function TestResults({ code, testsuite }) {
  return (
    <div className={styles.feedback}>
      <h3 className={styles.section_title}>테스트 결과</h3>
      <div style={{ overflowY: "scroll", height: "100%", margin: "10px" }}>
        {
          testsuite.map(
            testcase => {
              return (
                <TestResult
                  key={testcase.testnumber}
                  code={code}
                  testcase={testcase} />
              )
            }
          )
        }
      </div>
    </div>
  );
}

function TestResult({ code, testcase }) {
  const api_url_runcode = '/api/assignment/runcode'
  const [output, setOutput] = useState("실행중...");
  const [isPass, setIsPass] = useState("확인중...");

  useEffect(async () => {
    const codeWithTestCase = `${code}\nprint(${testcase.input})`;
    console.log(codeWithTestCase);
    const response = await fetch(api_url_runcode, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        code: codeWithTestCase,
      }),
    });
    const result = await response.json();
    let output;
    if (result?.success !== undefined) {
      output = "실행에 실패했습니다 ㅜㅜ";
    } else {
      output = result.result;
    }
    setOutput(output);
    if (output == testcase.output) {
      setIsPass("통과");
    } else {
      setIsPass("실패");
    }

  }, [code, testcase]);

  return (
    <div style={{ height: "100%", margin: "10px" }}>
      <p>입력: {testcase.input}</p>
      <p>예상: {testcase.output}</p>
      <p>출력: {output}</p>
      <p>결과: {isPass}</p>
    </div>
  )
}

function Hint({ code, testcase }) {
  const api_url_hint = '/api/assignment/hint'
  const [output, setOutput] = useState("힌트를 만들고 있습니다 :)");

  useEffect(async () => {
    const response = await fetch(api_url_hint, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    const result = await response.json();
    let output;
    if (result?.success !== undefined) {
      output = "실행에 실패했습니다 ㅜㅜ";
    } else {
      output = result.data;
    }
    setOutput(output);
  }, [code, testcase]);
  return (
    <div className={styles.feedback}>
      <h3 className={styles.section_title}>힌트</h3>
      <div style={{ overflowY: "scroll", height: "100%" }}>
        {output}
      </div>
    </div>
  )
}

export default function RightSideBar({ action, code, testsuite }) {
  // console.log('code');
  // console.log(code);
  console.log('testsuite');
  console.log(testsuite);
  // console.log('RBar');
  return (
    <div className={styles.sidebar}>
      {action === 'runCode' ?
        <Output code={code} /> : null}
      {action === 'runTestCase' ?
        <TestResults
          code={code}
          testsuite={testsuite}
        /> : null}
      {action === 'runTestSuite' ?
        <>
          <TestResults
            code={code}
            testsuite={testsuite}
          />
          <Hint
            code={code}
            testsuite={testsuite}
          />
        </> : null}
      {action === 'submit' ?
        <Final
          code={code}
          testsuite={testsuite}
        /> : null}
    </div>
  )
}