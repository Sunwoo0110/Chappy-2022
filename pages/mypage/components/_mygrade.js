import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"
import { PlusSquare } from "react-bootstrap-icons"
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

function Grade(){
    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>전체성적</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class="btn btn-secondary btn-sm" type="button">채피 과목만 보기</button>
                <button style={{borderRadius:20}} class="btn btn-outline-secondary btn-sm" type="button">모든 과목 보기</button>
                </div>
            </div>
            <div className={styles.grade}>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>전체평점</div>
                    <div className={styles.grade_2}>4.0</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>이번학기 평점</div>
                    <div className={styles.grade_2}>4.0</div>
                </div>
                <Link href="/mypage/myfeedback">
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>피드백</div>
                    <div className={styles.grade_2}>50회</div>
                </div>
                </Link>
            </div>
            <div style={{marginTop:"15px"}} className={styles.gradegraph}>
                {/* 채피 과목 보기 */}
                <div>성적 그래프</div>

                {/* 모든 과목 보기 */}
                {/* <div style={{display:"flex", flexDirection:"row", width:"50%"}}>
                    <div>성적 그래프</div>
                    <div className={styles.add_lecture}>
                        <PlusSquare/>
                        <div>다른과목 추가하기</div>
                    </div>
                </div> */}
                <select style={{width:"15%"}} class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>학기별 보기</option>
                    <option value="1">2021년 1학기</option>
                    <option value="2">2022년 1학기</option>
                </select>
            </div>
            <div style={{background:"blue", width:"100%", height:"200px"}}>그래프</div>
        </div>
    )
}

function SubjectGrade({setMode2}){
    const user_id = "62a9a23fd5ca81cddd59604b" // user _id
    const semester = "2022년 1학기" // user _id
    const { data, error } = useSWR(`/api/lecture/${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    const toMode1 = async () => {
        setMode2(1);
    }

    const toMode2 = async () => {
        setMode2(2);
    }

    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>과목 성적통계</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class="btn btn-secondary btn-sm" type="button" onClick={()=>toMode1()}>이번 학기 과목만 보기</button>
                <button style={{borderRadius:20}} class="btn btn-outline-secondary btn-sm" type="button" onClick={()=>toMode2()}>모든 과목 보기</button>
                </div>
            </div>
            <div style={{width:"100%"}} class="row">
                {
                    data.lectures.map((lecture) => {
                        if (lecture.open===semester){
                            return (
                                <div class="col-6">
                                <div className={styles.lecture}>
                                    <div className={styles.lecture_name}>
                                        <div className={styles.lecture_name_1}>{lecture.name}</div>
                                        <div className={styles.lecture_name_2}>
                                        <div className={styles.lecture_open}>{lecture.open}</div>
                                        </div>
                                    </div>
                                    <div className={styles.lecture_prof}>{lecture.professor}</div>
                                    <div className={styles.lecture_id}>{lecture.classnumber}</div>
                                </div>
                                </div>
                            )
                        }
                        else{
                            return;
                        }
                    })
                }
            </div>
        </div>
    )
}


function AllSubjectGrade({setMode2}){
    const user_id = "62a9a23fd5ca81cddd59604b" // user _id
    const { data, error } = useSWR(`/api/lecture/${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    const toMode1 = async () => {
        setMode2(1);
    }

    const toMode2 = async () => {
        setMode2(2);
    }

    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>과목 성적통계</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class="btn btn-secondary btn-sm" type="button" onClick={()=>toMode1()}>이번 학기 과목만 보기</button>
                <button style={{borderRadius:20}} class="btn btn-outline-secondary btn-sm" type="button" onClick={()=>toMode2()}>모든 과목 보기</button>
                </div>
            </div>
            <div style={{width:"100%"}} class="row">
                {
                    data.lectures.map((lecture) => {
                    return (
                        <div class="col-6">
                        <div className={styles.lecture}>
                            <div className={styles.lecture_name}>
                                <div className={styles.lecture_name_1}>{lecture.name}</div>
                                <div className={styles.lecture_name_2}>
                                <div className={styles.lecture_open}>{lecture.open}</div>
                                </div>
                            </div>
                            <div className={styles.lecture_prof}>{lecture.professor}</div>
                            <div className={styles.lecture_id}>{lecture.classnumber}</div>
                        </div>
                        </div>
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

function SubmittedTask(){
    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>제출한 과제목록</div>
            </div>

            <div style={{width:"100%"}} class="shadow-sm">
            <div className={styles.submitted}>
                <div className={styles.submitted_1}>과목</div>
                <div className={styles.submitted_2}>날짜</div>
                <div className={styles.submitted_2}>교수자</div>
                <div className={styles.submitted_2}>채점진행</div>
                <div className={styles.submitted_2}>최종성적</div>
            </div>
            </div>

            <div style={{width:"100%"}}>
            <div className={styles.submitted}>
                <div className={styles.submitted_1}>알고리즘 중간고사</div>
                <div className={styles.submitted_2}>2021.04.18</div>
                <div className={styles.submitted_2}>홍길동</div>
                <div className={styles.submitted_2}>진행중</div>
                <div className={styles.submitted_2}>--</div>
            </div>
            <div className={styles.submitted}>
                <div className={styles.submitted_1}>알고리즘 주차과제: 9주차</div>
                <div className={styles.submitted_2}>2021.04.18</div>
                <div className={styles.submitted_2}>홍길동</div>
                <div className={styles.submitted_2}>채점완료</div>
                <div className={styles.submitted_2}>100/100</div>
            </div>
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

export default function MyGrade() {
    //mode 1: 이번 학기 과목만
    //mode 2: 모든 과목
    const [mode2, setMode2] = useState(1);

    

    return (
        <div className={styles.content}>

            <Title mode={2}/>
            
            <Grade/>

            {
                mode2 === 1 ?
                <SubjectGrade setMode2={setMode2}/>
                :
                <AllSubjectGrade setMode2={setMode2}/>
            }
            

            {/* 과목 클릭 시 아래 컴포넌트 띄움 */}
            {/* <TestGrade/>
            <SubmittedTask/>
            <TestGradeGraph/>
            <DeductionFactor/> */}
            
        </div>
    )
}