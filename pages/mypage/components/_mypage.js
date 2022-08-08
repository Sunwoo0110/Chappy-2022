import styles from "../../../styles/mypage/_main.module.css"

import Title from "./_title";

// _1 마이페이지
// _2 내 성적관리
// _3 나의 피드백
// _4 내 과제관리
// _5 계정관리
// _6 환경설정
// _7 문의하기

function StudentInfo() {
    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>학생정보</div>
                <div className={styles.moving_page}>계정관리에서 수정하기 ></div>
            </div>
            <div className={styles.studentinfo}>
                <div className={styles.studentinfo_image}>사진</div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이름</div>
                        <div className={styles.studentinfo_3}>백우정</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학과</div>
                        <div className={styles.studentinfo_3}>소프트웨어</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학기수</div>
                        <div className={styles.studentinfo_3}>5</div>
                    </div>
                </div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>아이디</div>
                        <div className={styles.studentinfo_3}>bwj2800</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>연락처</div>
                        <div className={styles.studentinfo_3}>0101111111</div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이메일</div>
                        <div className={styles.studentinfo_3}>bbb@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LearningInfo() {
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
                    <div style={{width:"100%"}}>
                    <div className={styles.lecture}>
                        <div className={styles.lecture_name}>
                            <div className={styles.lecture_name_1}>알고리즘</div>
                            <div className={styles.lecture_name_2}>2021년 1학기</div>
                            <button type="button" class="btn-close" dataToggle="modal fade" data-bs-target="#deleteChecker" aria-label="Close"></button>

                            <div class="modal fade" id="deleteChecker" tabindex="-1" aria-labelledby="deleteCheckerLabel" aria-hidden="true">
                                <div id="deleteChecker" class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="deleteCheckerLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ...
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.lecture_prof}>홍길동 교수님</div>
                        <div className={styles.lecture_id}>DES3004_01</div>
                    </div>
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