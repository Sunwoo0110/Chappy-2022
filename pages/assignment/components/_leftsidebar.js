import styles from "../../../styles/assignment/_sidebar.module.css"
import { useSelector, useDispatch } from 'react-redux';
import useSWR, { useSWRConfig } from "swr"

import * as validationActions from "../../../store/modules/validation";


const fetcher = (url) => {
  // console.log('URL:', url, typeof url)
  if (typeof url != 'string') return { data: [] }
  return fetch(url).then((res) => {
    // console.log(res)
    return res.json()
  })
}

export default function LeftSideBar({ assignment, testsuite, onInteract }) {

  function Problem(props) {
    return (
      <div className={styles.problem}>
        <div className={styles.section_title}>문제와 제한사항</div>

        <div style={{ overflowY: "scroll", height: "100%" }}>
          <div className={styles.section_element}>문제</div>
          <div className={styles.content}>{props.data.description}</div>

          <div className={styles.section_element}>제한사항</div>
          <div className={styles.content}>{props.data.constraint}</div>
          {/* <p>{props.data.example}</p> */}
        </div>
      </div>
    )
  }

  function TestSuite(props) {
    console.log('testsuite at left');
    console.log(testsuite);
    if (testsuite === undefined) {
      return (
        <div className={styles.testcase}>
          <div className={styles.section_title}>테스트케이스</div>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div className={styles.testcase}>
        <div className={styles.section_title}>테스트케이스</div>
        <div style={{ overflowY: "scroll", height: "100%" }}>
          <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
            {testsuite.map((testcase) => {
              if (!testcase.is_open) return
              return (
                <li key={testsuite.indexOf(testcase)} style={{ listStyle: "none", paddingLeft: "0px" }}>
                  <div className={styles.example_title}>
                    {`테스트케이스 - ${testsuite.indexOf(testcase) + 1}`}
                    <button type="button" className={styles.val_button} onClick={() => {
                      const testNumber = testsuite.indexOf(testcase) + 1;
                      onInteract(testNumber, testcase.input[0], testcase.output[0]);
                    }}>검증</button>
                    <button className={styles.val_button}></button>
                  </div>
                  <div className={styles.example_content}>
                    <div className={styles.testcase_content}>
                      <div style={{ padding: "5px" }}>{`Input: `}</div>
                      <div style={{ padding: "5px" }}>{`${testcase.input[0]}`}</div>
                    </div>
                    <div className={styles.testcase_content}>
                      <div style={{ padding: "5px" }}>{`Output: `}</div>
                      <div style={{ padding: "5px" }}>{`${testcase.output[0]}`}</div>
                    </div>
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

  return (
    // <div style={styles.leftsidebar}>
    <div className={styles.sidebar}>
      <Problem data={assignment} />
      <TestSuite />
    </div>
  )
}