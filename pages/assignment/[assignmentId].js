import Router, { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr"
// import { useDispatch } from 'react-redux';

import LeftSideBar from "./components/_leftsidebar";
import CodingBox from "./components/_codingbox";
import RightSideBar from "./components/_rightsidebar";

import { HouseDoorFill } from 'react-bootstrap-icons';
import styles from "../../styles/assignment/CodingPage.module.css";

import { useSelector } from "react-redux";

const fetcher = (url) => {
  // console.log('URL:', url, typeof url)
  if (typeof url != 'string') return { data: [] }
  return fetch(url).then((res) => {
    // console.log(res)
    return res.json()
  })
}

const NavBar = ({ assignment }) => {
  const router = useRouter();
  return <nav className={styles.navbar}>
    <div className={styles.navbar_left}>
      <div >
        <div onClick={() => { router.back() }}>
          <HouseDoorFill size={30} />
        </div>
        <div>
          <Link href="/mypage">
            <HouseDoorFill size={30} />
          </Link>
        </div>
      </div>
    </div>
    <div className={styles.navbar_center}>
      <div className={styles.navbar_title}>{assignment?.lectureName}</div>
      <div className={styles.navbar_title}>week 1: {assignment?.title}</div>
    </div>
    <div className={styles.navbar_right}>
      <div className={styles.navbar_title}>2일 13분 30분 남았습니다</div>
      <button type="button" style={{ backgroundColor: "#414E5A", border: "none" }} >
        <img src="/images/setting.png" className={styles.image_button} alt="file" onClick={() => { }} />
      </button>
    </div>
  </nav>
};

async function submit(user_id, assignment, code) {
  console.log(`user_id: ${user_id}`);
  const submission = {
    user_id: user_id,
    lecture_id: assignment.lecture_id,
    type: 0,
    ref_id: assignment._id,
    user_code: code,
    submission_state: 1,
    submission_date: new Date(),
  };

  const api_url_submission = '/api/submission/submission'
  const response = await fetch(api_url_submission, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(submission),
  });
  const result = await response.json();
  return result.data;
}

let assignment;
export default function CodingPage(props) {
  /** States
   * Assignment
   * Testsuite
   * Submission
   * Code
   * Output
   * Hint
   * Feedback
   * Grade
  */
  const user = useSelector(state => state.user);
  const user_id = user.id;
  const router = useRouter();
  const [action, setAction] = useState("init");
  const [code, setCode] = useState("");
  const [testsuite, setTestsuite] = useState([]);
  const [testQueue, setTestQueue] = useState([]);

  const { assignmentId } = router.query;
  const api_url_assignment = `/api/assignment/${assignmentId}`;
  console.log(api_url_assignment);
  const { data, error } = useSWR(api_url_assignment, fetcher);
  assignment = data?.data[0];

  useEffect(async () => {
    if (assignment === undefined) return;
    const api_url_testsuite = `/api/assignment/testcases?assignmentId=${assignment._id}`
    const response = await fetch(api_url_testsuite, {
      method: 'GET',
      headers: { "Content-Type": 'application/json', },
    });
    const result = await response.json();
    console.log("TS")
    console.log(result)
    setTestsuite(result.data);
  }, [assignment]);

  const submissionHandler = async (action, code) => {
    if (action !== null) {
      setAction(action);
    }
    setCode(code);

    console.log(action);
    if (action === 'runCode') {

    } else if (action === 'runTestSuite') {
      setTestQueue(testsuite);
    } else if (action === 'submit') {
      submit(user_id, assignment, code)
        .then(submission => {
          console.log(`Submission ID: ${submission._id}`);
          // grade(submission._id)
        });
    }  };

  const testcaseHandler = async (testNumber, input, expectedOutput) => {
    setAction('runTestCase')
    setTestQueue([testsuite[testNumber - 1]]);
  };

  if (assignment === undefined) {
    return (<div>과제를 불러오는 중입니다.</div>);
  } else {
    //Temporal
    assignment.lectureName = '알고리즘 개론';
    //Temporal: end
  }


  return (
    <div className={styles.container}>
      <NavBar assignment={assignment} />
      <div className={styles.main}>
        <div className={styles.leftsidebar}>
          <LeftSideBar
            assignment={assignment}
            testsuite={testsuite}
            onInteract={testcaseHandler}
          />
        </div>
        <div className={styles.codingbox}>
          <CodingBox
            assignment={assignment}
            onInteract={submissionHandler}
          />
        </div>
        <div className={styles.rightsidebar}>
          <RightSideBar
            action={action}
            code={code}
            testsuite={testQueue}
          />
        </div>
      </div>
    </div>
  )
};