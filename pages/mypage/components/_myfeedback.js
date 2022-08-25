import styles from "../../../styles/mypage/_myfeedback.module.css"
import Title from "./_title"


function TotalFeedback(){
    return(
        <div className={styles.section_bg}>
            <div className={styles.grade}>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>전체평점</div>
                    <div className={styles.grade_2}>4.0</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>이번학기 평점</div>
                    <div className={styles.grade_2}>4.0</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>전체평점</div>
                    <div className={styles.grade_2}>35회</div>
                </div>
            </div>
            
            <div style={{width:"100%"}}>
                <div className={styles.lecture}>
                    <div className={styles.lecture_name}>
                        <div className={styles.lecture_name_1}>알고리즘</div>
                        <div className={styles.lecture_name_2}>2021년 1학기</div>
                    </div>
                    <div className={styles.lecture_prof}>홍길동 교수님</div>
                    <div className={styles.lecture_id}>DES3004_01</div>
                </div>
            </div>
        </div>
    )
}

function SubjectFeedback(){
    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>나의 피드백</div>
                <div className={styles.section_title}>></div>
                <div className={styles.section_title}>알고리즘</div>
            </div>
            <div className={styles.grade}>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>제공된 피드백</div>
                    <div className={styles.grade_2}>18개</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>시험</div>
                    <div className={styles.grade_2}>6개</div>
                </div>
                <div className={styles.grade_item}>
                    <div className={styles.grade_1}>과제</div>
                    <div className={styles.grade_2}>12개</div>
                </div>
            </div>
        </div>
    )
}

function FeedbackList(){
    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>피드백 목록</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class="btn btn-secondary btn-sm" type="button">이번 학기 과제만 보기</button>
                <button style={{borderRadius:20}} class="btn btn-outline-secondary btn-sm" type="button">모든 과제 보기</button>
                </div>
            </div>

            
            <div className={styles.objection}>
                <div className={styles.objection_1}>과제 및 시험</div>
                <div className={styles.objection_2}>과목</div>
                <div className={styles.objection_2}>제출날짜</div>
                <div className={styles.objection_2}>피드백확인</div>
            </div>

            <div style={{width:"100%"}}>
            <div className={styles.objection}>
                <div className={styles.objection_1}>알고리즘 중간고사</div>
                <div className={styles.objection_2}>알고리즘</div>
                <div className={styles.objection_2}>2021.04.18</div>
                <div className={styles.objection_2}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">피드백 보기</button>
                </div>
            </div>
            <div className={styles.objection}>
                <div className={styles.objection_1}>알고리즘 중간고사</div>
                <div className={styles.objection_2}>알고리즘</div>
                <div className={styles.objection_2}>2021.04.18</div>
                <div className={styles.objection_2}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">피드백 보기</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default function Feedback() {
    return (
        <div className={styles.content}>
            <Title mode={3}/>
            {/* <TotalFeedback/> */}
            <SubjectFeedback/>
            <FeedbackList/>
        </div>
    )
}