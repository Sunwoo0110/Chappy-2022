import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../../styles/mypage/_mypage.module.css"

import Title from "./_title";

// _1 마이페이지
// _2 내 성적관리
// _3 나의 피드백
// _4 내 과제관리
// _5 계정관리
// _6 환경설정
// _7 문의하기

import useSWR, { useSWRConfig } from "swr"

const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function StudentInfo() {
    
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/user/profile?_id=${user_id}`, fetcher)

    if (error) return <div>Getting User Info Failed</div>
    if (!data) return <div>Loading...</div>

    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>학생정보</div>
                <Link href="/mypage/myaccount">
                <div className={styles.moving_page}>계정관리에서 수정하기 ></div>
                </Link>
            </div>
            <div className={styles.studentinfo}>
                <div className={styles.studentinfo_image}>사진</div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이름</div>
                        <div className={styles.studentinfo_3}>{data.data[0].name}</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학과</div>
                        <div className={styles.studentinfo_3}>{data.data[0].department}</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학기수</div>
                        <div className={styles.studentinfo_3}>{data.data[0].semester}</div>
                    </div>
                </div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>아이디</div>
                        <div className={styles.studentinfo_3}>{data.data[0].user_id}</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>연락처</div>
                        <div className={styles.studentinfo_3}>{data.data[0].cell_number}</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이메일</div>
                        <div className={styles.studentinfo_3}>{data.data[0].email}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LearningInfo() {

    const { mutate } = useSWRConfig()
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const semester = "2022년 1학기"
    const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)

    if (error) return <div>Getting Lecture Info Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onDelete(_id) {

        const newList =  await fetch(`/api/lecture/info/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lecture_id: _id }),
        })

        mutate(`/api/lecture/info/${user_id}`);
        
    }

    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>학습정보</div>
            </div>
            <div className={styles.learninginfo_bg}>
                <div className={styles.learninginfo}>
                    <div className={styles.section_title_bg}>
                        <div>이번학기 출석부</div>
                        <div className={styles.moving_page}>과목별로 보기 ></div>
                    </div>
                    <div className={styles.attendance}>
                        <div className={styles.attendance_item}>
                            <div className={styles.attendance_black}>출석</div>
                            <div className={styles.attendance_blue}>35회</div>
                        </div>
                        <div className={styles.attendance_item}>
                            <div className={styles.attendance_black}>결석</div>
                            <div className={styles.attendance_red}>3회</div>
                        </div>
                        <div className={styles.attendance_item}>
                            <div className={styles.attendance_black}>제출</div>
                            <div className={styles.attendance_blue}>4회</div>
                        </div>
                        <div className={styles.attendance_item}>
                            <div className={styles.attendance_black}>미제출</div>
                            <div className={styles.attendance_blue}>0회</div>
                        </div>
                    </div>
                </div>
                <div className={styles.learninginfo}>
                    <div>이번학기 강의 관리</div>
                    <div style={{width:"100%"}} class="row">
                    {
                        data.lectures.map((lecture) => {
                            if (lecture.open_semester===semester){
                                return (
                                    <div class="col-6">
                                    <div className={styles.lecture}>
                                        <div className={styles.lecture_name}>
                                            <div className={styles.lecture_name_1}>{lecture.name}</div>
                                            <div className={styles.lecture_name_2}>
                                            <div className={styles.lecture_open}>{lecture.open_semester}</div>
                                            <button type="button" class="btn-close" aria-label="Close" data-bs-toggle="modal" data-bs-target="#deleteChecker"></button>
                                            <div class="modal fade" id="deleteChecker" tabindex="-1" aria-labelledby="deleteCheckerLabel" aria-hidden="true">

                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-body" style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"5px",margin:"30px"}}>
                                                        <div className={styles.deletecheck}>정말 목록에서 지울까요?</div>
                                                        <div className={styles.deletecheck_exp}>목록에서 지우면 해당 강의가 강의목록에서 지워지며,</div>
                                                        <div className={styles.deletecheck_exp}>알림도 오지 않습니다. 수강 취소는 학교 사이트를 이용해주세요.</div>
                                                        <div className={styles.buttons}>
                                                            <button type="button" class="btn btn-secondary" style={{flexGrow: "1", flexBasis: "1px",background: "#114AFF"}} data-bs-dismiss="modal">취소</button>
                                                            <button type="button" class="btn btn-primary" style={{flexGrow: "1", flexBasis: "1px", background: "#FF0000"}} onClick={()=>onDelete(lecture._id)} data-bs-dismiss="modal">네, 지울게요</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            </div>
                                        </div>
                                        <div className={styles.lecture_prof}>{lecture.professor} 교수님</div>
                                        <div className={styles.lecture_id}>{lecture.lecture_num}</div>
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
            </div>
        </div>
    )
}

export default function MyPage() {
    return (
        <div className={styles.content}>

            <Title mode={1}/>

            <StudentInfo/>
            <LearningInfo/>
        </div>
    )
}