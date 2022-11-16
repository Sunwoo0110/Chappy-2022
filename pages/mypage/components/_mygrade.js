import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr"
import { useSelector, useDispatch } from 'react-redux';
import { Bootstrap, PlusSquare } from "react-bootstrap-icons"
import styles from "../../../styles/mypage/_mygrade.module.css"
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import Title from "./_title"

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function Grade(){
    const semester = "2022년 1학기"
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/aggregation/mypage/mygrade?user_id=${user_id}&semester=${semester}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>
    
    console.log("data.data: ",data.data)

    let d =  {
        labels: data.data.semesters,
        datasets: [{
            data: data.data.grades,
            borderColor: "#0B51FF",
            borderWidth: 2
        }]
    };
    let options= {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            }
        }
    }

    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>전체성적</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                </div>
            </div>
            <div className={styles.grade}>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>전체평점</div>
                    <div className={styles.grade_2}>{data.data.total}</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>이번학기 평점</div>
                    <div className={styles.grade_2}>{data.data.this_semester}</div>
                </div>
            </div>
            <div style={{marginTop:"15px"}} className={styles.gradegraph}>
                <div>성적 그래프</div>
                <select style={{width:"15%"}} class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>학기별 보기</option>
                    <option value="1">다른 옵션</option>
                    <option value="2">뭐가 있지</option>
                </select>
            </div>
            <Line type="line" data={d} options={options}/>
        </div>
    )
}

function SubjectGrade({setMode, mode}){
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const semester = "2022년 1학기"
    let d;

    if(mode===1){
        d = useSWR(`/api/aggregation/mypage/mylectures?user_id=${user_id}&open_semester=${semester}`, fetcher);
    }
    else{
        d = useSWR(`/api/aggregation/mypage/mylectures?user_id=${user_id}`, fetcher);
    }
    
    if (d.error) return <div>Getting Lectures Failed</div>
    if (!d.data) return <div>Loading...</div>

    const toMode1 = async () => {
        setMode(1);
    }

    const toMode2 = async () => {
        setMode(2);
    }

    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>과목 성적통계</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class={mode==1 ? "btn btn-secondary btn-sm" : "btn btn-outline-secondary btn-sm"} type="button" onClick={()=>toMode1()}>이번 학기 과목만 보기</button>
                <button style={{borderRadius:20}} class={mode==2 ? "btn btn-secondary btn-sm" : "btn btn-outline-secondary btn-sm"} type="button" onClick={()=>toMode2()}>모든 과목 보기</button>
                </div>
            </div>
            <div style={{width:"100%"}} class="row">
                {
                    d.data.lectures.map((lecture) => {
                        return (
                            <Link as={`/mypage/mygrade/${lecture._id}`}
                                href={{
                                    pathname: "/mypage/mygrade/[id]",
                                    query: { data: JSON.stringify(lecture._id) },
                                }}>
                            <div class="col-6">
                            <div className={styles.lecture}>
                                <div className={styles.lecture_name}>
                                    <div className={styles.lecture_name_1}>{lecture.name}</div>
                                    <div className={styles.lecture_name_2}>{lecture.open_semester}</div>
                                </div>
                                <div className={styles.lecture_prof}>{lecture.professor}</div>
                                <div className={styles.lecture_id}>{lecture.lecture_num}</div>
                            </div>
                            </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

function TestGrade(){
    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>시험성적통계</div>
                <div className={styles.section_title}>></div>
                <div className={styles.section_title}>알고리즘</div>
            </div>
            <div className={styles.testgrade}>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>계획된 시험</div>
                    <div className={styles.testgrade_blue}>18개</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>진행한 시험</div>
                    <div className={styles.testgrade_blue}>6개</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>놓친시험</div>
                    <div className={styles.testgrade_red}>1개</div>
                </div>
            </div>
            <div className={styles.testgrade}>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>주차과제</div>
                    <div className={styles.testgrade_blue}>98%</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>중간고사</div>
                    <div className={styles.testgrade_blue}>채점중</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>기말고사</div>
                    <div className={styles.testgrade_grey}>미진행</div>
                </div>
            </div>
            <div className={styles.testgrade}>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>발표</div>
                    <div className={styles.testgrade_grey}>없음</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>과제</div>
                    <div className={styles.testgrade_blue}>100%</div>
                </div>
                <div className={styles.testgrade_item}>
                    <div className={styles.testgrade_black}>평소학습</div>
                    <div className={styles.testgrade_grey}>없음</div>
                </div>
            </div>
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

export default function MyGrade() {
    //mode 1: 이번 학기 과목만
    //mode 2: 모든 과목
    const [mode, setMode] = useState(1);

    return (
        <div className={styles.content}>

            <Title mode={2}/>
            
            <Grade/>
            <SubjectGrade setMode={setMode} mode={mode}/>

        </div>
    )
}