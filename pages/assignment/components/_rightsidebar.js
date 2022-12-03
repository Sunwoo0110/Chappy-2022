import styles from "../../../styles/assignment/_sidebar.module.css";
// import { ResponsivePie } from '@nivo/pie'
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/** 제출 성적 **/
function Final({ code, testsuite }) {
  const api_url_hint = '/api/assignment/run'
  const [output, setOutput] = useState("평가중...)");

  const [total_score, setTotalScore] = useState("평가중...)");
  const [func_score, setFuncScore] = useState("평가중...)");
  const [func_msg, setFuncMSG] = useState([]);
  const [effi_score, setEffiScore] = useState("평가중...)");
  const [loc_score, setLOCScore] = useState("평가중...)");
  const [rw_score, setRWScore] = useState("평가중...)");
  const [cf_score, setCFScore] = useState("평가중...)");
  const [df_score, setDFScore] = useState("평가중...)");
  const [read_score, setReadScore] = useState("평가중...)");
  const [read_msg, setReadMSG] = useState([]);

  const [check, setCheck] = useState(false);

  useEffect(async () => {
    const response = await fetch(api_url_hint, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        code: code,
        mode: 'submit',
      }),
    });
    const result = await response.json();
    let output;

    let total_score;
    let func_score;
    let func_msg=[];
    let effi_score;
    let loc_score;
    let rw_score;
    let cf_score;
    let df_score;
    let read_score;
    let read_msg=[];
    
    if (result?.success !== undefined) {
      output = "실행에 실패했습니다 ㅜㅜ";
      setOutput(output);
    } else {
      output = result.data;
      var output_json = JSON.parse(output);
      var keys = Object.keys(output_json);

      console.log("json" + output)
      for (var i=0; i<keys.length; i++) {
        var key = keys[i];
        var results = output_json[key];

        if (key == "Functional") {
          func_score = results["score"];
          // func_msg = JSON.stringify(results["msg"]);
          setFuncMSG([])
          
          for (var j=1; j<=Object.keys(results["msg"]).length; ++j) {
            var num = new String(j)
            func_msg.push(results["msg"][num])
          }
        } else if(key == "Efficiency") {
          effi_score = results["score"]
          loc_score = results["Line of code"];
          rw_score = results["Reservation Word"];
          cf_score = results["Control Flow"];
          df_score = results["Data Flow"];
        } else {
          read_score = results["score"];

          for (var j=1; j<=Object.keys(results["msg"]).length; ++j) {
            read_msg.push(results["msg"][j-1])
          }
          // read_msg = JSON.stringify(results["msg"]);
        }
      }
      
      total_score = parseInt(
        (
        parseInt(func_score) 
        + parseInt(effi_score) 
        + parseInt(read_score)) 
        / 3
      )
      setTotalScore(total_score)
      setFuncScore(func_score);
      setFuncMSG(func_msg);
      setEffiScore(effi_score)
      setLOCScore(loc_score);
      setRWScore(rw_score);
      setCFScore(cf_score);
      setDFScore(df_score);
      setReadScore(read_score);
      setReadMSG(read_msg);

      setCheck(true);

    }
    
  }, [code, testsuite]);

  const [type, setType] = useState(1);

  const handle = {
    padClick: (data) => {
      console.log(data);
    },
  };

  let d =  {
    plugins: ["기능", "효율", "가독성"],       
    labels: ["기능", "효율", "가독성"],
    datasets: [{
        data: [func_score, effi_score, read_score],
        borderColor: "#000000",
        borderWidth: 2,
        cutout: "60%",  
        label: '라벨',
        backgroundColor: ["#00B0F0", "#92D050", "#FFC000"],
        hoverBackgroundColor: ["#00B0F0", "#92D050", "#FFC000"],
        hoverBorderColor: "#ff",   
    }]
  };
  let options= {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: "Overall Score"
        },
        datalabels: {
          display: true,
          formatter: (value,ctx) => {
              let total = 0
              for(let i = 0 ;i<3; i++ ){
                total += ctx.dataset.data[i]
              }
              let result = (value / total) *100
              if(value == 0){
                  return '';
              }else{
                  return result.toFixed(1) + '%';
              }
          },
          color: '#FFC000',
          backgroundColor: '#FFC000',
          weight: 'bold',
          textShadowBlur: 10,
          textShadowColor : 'black',
        },
        doughnutlabel: {
          labels: [{
            text: "test",
            font: {
              size: 20,
              weight: 'bold'
            }
          }, {
            text: 'total'
          }]
        }
      },
      // onClick: function(evt, element) {
      //   console.log(evt, element);
      //   console.log("click 도넛 index : ", element[0].index);
      //   console.log(labelData[element[0].index]);
      //   Doughnut(element[0].index);
      // }
  }

  return (
    <div className={styles.outputs}>
      <h3 className={styles.section_title}>제출 결과</h3>
      <div className={styles.problem}>
        <h3>Overall Score: {total_score}</h3>
        <div style={{ width: '100%', height: '75%' }}>
          <Doughnut type="doughnut" data={d} options={options} plugins={d.plugins} />
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
            <div style={{ backgroundColor: "#00B0F0", height: "100%", padding: "10px"}}>
              <div>{`기능 점수 : ${func_score}`}</div>
              <br></br>
              {func_msg.map(
                (f, index) => {
                  var res;
                  if ( f[1] === f[2]) {
                    res = "통과";
                  } else {
                    res = "실패";
                  }
                  return (
                    <div>
                      <div>{`테스트케이스 ${index+1}: ${res}`}</div>
                      <div>{`input: ${f[0]} output: ${f[1]} result: ${f[2]}`}</div>
                    </div>
                  )
                }
              )}
            </div>
            : type === 2 ?
              <div style={{ backgroundColor: "#92D050", height: "100%", padding: "10px"}}>
                <div>{`효율 점수 : ${effi_score}`}</div>
                <br></br>
                <div>{`Line of Code: ${loc_score}`}</div>
                <div>{`Reservation Word: ${rw_score}`}</div>
                <div>{`Control Flow: ${cf_score}`}</div>
                <div>{`Data Flow: ${df_score}`}</div>
              </div>
              :
              <div style={{ backgroundColor: "#FFC000", height: "100%", padding: "10px"}}>
                <div>{`가독성 점수 : ${read_score}`}</div>
                <br></br>
                {read_msg.map(
                  (rm, index) => {
                    return (
                      <div>
                        <div>{`${rm}`}</div>
                      </div>
                    )
                  }
                )}
              </div>
        }
      </div>
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

function GradeResults({ code, testsuite }) {
  const api_url_grade = '/api/assignment/run'
  const [output, setOutput] = useState("채점중...");
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState('');
  const [test, setTest] = useState([]);
  const [tc, setTC] = useState([]);
  let op_json = null;

  useEffect(async () => {
    const response = await fetch(api_url_grade, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        code: code,
        mode: 'grade',
      }),
    });
    const result = await response.json();
    let op;
    
    if (result?.success !== undefined) {
      op = "채점에 실패했습니다 ㅜㅜ";
    } else {
      op = result.data;
      op_json = JSON.parse(op)
      setCheck(true)

      if (op_json[0].result) {
        setResult("정답")
      } else {
        setResult("오답")
      }

      setTest([op_json[1].test.total, op_json[1].test.pass, op_json[1].test.fail])

      setTC([])

      for (var i=1; i<=op_json[1].test.total; ++i) {
        var num = new String(i)
        setTC(tc => [...tc, op_json[2][num]])

        // console.log(op_json[2][num])
      }
      // setTC(op_json[2])
    }
    setOutput(op);
  }, [code, testsuite]);

  return (
    <div className={styles.feedback}>
      <h3 className={styles.section_title}>채점 결과</h3>
      <div style={{ overflowY: "scroll", height: "100%", margin: "10px" }}>
        { check ? 
        <div>
          <div>{result}</div>
          <div>{`total: ${test[0]} pass: ${test[1]} fail: ${test[2]}`}</div>
          {tc.map(
            (tc, index) => {
              var res;
              if ( tc[1] === tc[2]) {
                res = "통과";
              } else {
                res = "실패";
              }
              return (
                <div>
                  <div>{`테스트케이스 ${index+1}: ${res}`}</div>
                  <div>{`input: ${tc[0]} output: ${tc[1]} result: ${tc[2]}`}</div>
                </div>
              )
            }
          )}
        </div>
        : <div>{output}</div>}
      </div>
    </div>
  )
}

function Hint({ code, testcase }) {
  const api_url_hint = '/api/assignment/run'
  const [output, setOutput] = useState("힌트를 만들고 있습니다 :)");
  const [check, setCheck] = useState(false);
  const [hint, setHint] = useState([]);
  let op_json = null;

  useEffect(async () => {
    const response = await fetch(api_url_hint, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        code: code,
        mode: 'hint',
      }),
    });
    const result = await response.json();
    let op;
    if (result?.success !== undefined) {
      op = "실행에 실패했습니다 ㅜㅜ";
    } else {
      op = result.data;
      op_json = JSON.parse(op)
      console.log(op)

      setCheck(true);
      var num = Object.keys(op_json)
      setHint([])

      for (var i=0; i<Object.keys(op_json).length; ++i) {
        setHint(hint => [...hint, [ num[i], op_json[num[i]]]])
        // console.log(op_json[2][num])
      }
    }
    setOutput(output);
  }, [code, testcase]);
  return (
    <div className={styles.feedback}>
      <h3 className={styles.section_title}>힌트</h3>
      <div style={{ overflowY: "scroll", height: "100%", margin: "10px" }}>
        { check ? 
          <div>
            {hint.map(
              (h, index) => {
                  return (
                    <div>
                      <div>{`${h[0]}`}</div>
                      <div>{`${h[1]}`}</div>
                    </div>
                  )
              }
            )}
          </div>
        : <div>{output}</div>}
    </div>
  </div>
  )
}

export default function RightSideBar({ action, code, testsuite, close }) {
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
          <GradeResults
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
      {close === true ? 
        <Final
          code={code}
          testsuite={testsuite}
        /> : null}
    </div>
  )
}