import Link from "next/link";
import { useState, useEffect  } from "react";
import useSWR, { useSWRConfig } from "swr"
import { useSelector } from 'react-redux';
import { useSession } from "next-auth/react"
import styles from "../../../styles/mypage/_mygrade.module.css"

import Title from "./_title"

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


function TestGrade({lecture_id}){

    // const user = useSelector(state => state.user);
    // const user_id = user.id;
    // const { data, error } = useSWR(`/api/aggregation/mypage/lecturemygrade?user_id=${user_id}&lecture_id=${lecture_id}`, fetcher)

    // if (error) return <div>Getting Lectures Failed</div>
    // if (!data) return <div>Loading...</div>

    // console.log("data.data: ",data.data);


    const { data: session, status } = useSession()
    var user_id = '';
    const [data, setData] = useState('');

    useEffect(async () => {
        if (status === "authenticated" && user_id != '') {
            const response = await fetch(`/api/aggregation/mypage/lecturemygrade?user_id=${user_id}&lecture_id=${lecture_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
            });
            const result = await response.json();
            
            if (result?.success !== true) {
                console.log("실행에 실패했습니다 ㅜㅜ");
            } else {
                // console.log("asdf:",result.data)
                setData(result.data)
                // console.log(data)
            }
        }        
    }, [user_id, status]);

    if (status === "loading") {
        return <>Loading...</>
    } else if (status === "unauthenticated") {
        window.location.href = "/login";
    } else {
        user_id = session.user.name;
    }


    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>시험성적통계</div>
                <div className={styles.section_title}>{">"}</div>
                <div className={styles.section_title}>{data.lecture_name}</div>
            </div>
            <div className={styles.testgrade}>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>계획된 시험</div>
                    <div className={styles.testgrade_blue}>{data.exam}개</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>진행한 시험</div>
                    <div className={styles.testgrade_blue}>{data.done_exam}개</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>놓친시험</div>
                    <div className={styles.testgrade_red}>{data.missed_exam}개</div>
                </div>
            </div>
            <div className={styles.testgrade}>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>과제</div>
                    <div className={styles.testgrade_blue}>{data.assignment}%</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>중간고사</div>
                    <div className={styles.testgrade_blue}>{data.midterm}</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>기말고사</div>
                    <div className={styles.testgrade_blue}>{data.endterm}</div>
                </div>
            </div>
        </div>
    )
}

function SubmittedTask({lecture_id}){
        const user = useSelector(state => state.user);
        const user_id = user.id;
        const { data, error } = useSWR(`/api/aggregation/mypage/submitted_assignments?user_id=${user_id}&lecture_id=${lecture_id}`, fetcher)

        if (error) return <div>Getting Lectures Failed</div>
        if (!data) return <div>Loading...</div>

        console.log("data.data2: ",data.data);
    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>제출한 과제목록</div>
            </div>

            <div style={{width:"100%"}} class="shadow-sm">
            <div className={styles.submitted}>
                <div className={styles.submitted_1}>제목</div>
                <div className={styles.submitted_2}>날짜</div>
                <div className={styles.submitted_2}>교수자</div>
                <div className={styles.submitted_2}>채점진행</div>
                <div className={styles.submitted_2}>최종성적</div>
            </div>
            </div>

            <div style={{width:"100%"}}>
            {
                data.data.map((sub) => {
                    return (
                        <div className={styles.submitted}>
                            <div className={styles.submitted_1}>{sub.title}</div>
                            <div className={styles.submitted_2}>{sub.date}</div>
                            <div className={styles.submitted_2}>{sub.professor}</div>
                            <div className={styles.submitted_2}>{sub.state}</div>
                            <div className={styles.submitted_2}>{sub.grade}</div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

function TestGradeGraph(){
    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>시험성적통계</div>
            </div>

            <div>주차별 점수분포</div>
            <div style={{background:"blue", width:"100%", height:"200px"}}>그래프</div>
        </div>
    )
}

function DeductionFactor(){
    return(

        <div style={{flexDirection:"row", columnGap:"3%"}} className={styles.section_bg}>
            <div style={{width:"40%"}}>
                <div style={{marginBottom:"10px"}} className={styles.section_title_bg}>
                    <div className={styles.section_title}>주 감점요인</div>
                </div>

                <div>길동님의 가장 큰 감점요인은 코드컨벤션입니다</div>
                <div style={{background:"blue", width:"100%", height:"200px"}}>그래프</div>
            </div>
            <div style={{width:"40%"}}>
                <div style={{marginBottom:"10px"}} className={styles.section_title_bg}>
                    <div className={styles.section_title}>세부 감점요인</div>
                </div>

                <div>감점요인을 더 자세히 분석해보세요</div>
                <div style={{background:"blue", width:"100%", height:"200px"}}>그래프</div>
            </div>
            
            <select style={{marginTop:"5%", width:"15%"}} class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
                <option selected>학기별 보기</option>
                <option value="1">다른 선택지?</option>
            </select>
        </div>
    )
}

// _1 마이페이지
// _2 내 성적관리
// _3 나의 피드백
// _4 내 과제관리
// _5 계정관리
// _6 환경설정
// _7 문의하기

export default function MyGrade({lecture_id}) {
    return (
        <div className={styles.content}>
            <Title mode={2}/>
            <TestGrade lecture_id={lecture_id}/>
            <SubmittedTask lecture_id={lecture_id}/>
            {/* <TestGradeGraph/>
            <DeductionFactor/> */}
        </div>
    )
}