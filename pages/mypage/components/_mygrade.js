import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"
import { useSelector, useDispatch } from 'react-redux';
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
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const semester = "2022년 1학기" // user _id
    const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)

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
                        if (lecture.open_semester===semester){
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
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)

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
        </div>
    )
}