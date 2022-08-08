import styles from "../../../styles/mypage/_main.module.css"

import Title from "./_title"

function SelectLecture(){
    return(
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>과목선택</div>
                <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20, marginLeft:"50%"}} class="btn btn-secondary" type="button">이번학기 과목만 보기</button>
                <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20}} class="btn btn-outline-secondary" type="button">모든 과목 보기</button>
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

function Objection(){
    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>이의제기</div>
            </div>

            <div style={{width:"100%"}} class="shadow-sm">
            <div className={styles.objection}>
                <div className={styles.objection_1}>과목</div>
                <div className={styles.objection_2}>날짜</div>
                <div className={styles.objection_2}>교수자</div>
                <div className={styles.objection_2}>확인여부</div>
                <div className={styles.objection_2}>답장보기</div>
            </div>
            </div>

            <div style={{width:"100%"}}>
            <div className={styles.objection}>
                <div className={styles.objection_1}>알고리즘 주차과제: 9주차</div>
                <div className={styles.objection_2}>2021.04.18</div>
                <div className={styles.objection_3}>홍길동</div>
                <div className={styles.objection_2}>확인</div>
                <div className={styles.objection_2}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">답변보기</button>
                </div>
            </div>
            <div className={styles.objection}>
                <div className={styles.objection_1}>알고리즘 주차과제: 9주차</div>
                <div className={styles.objection_2}>2021.04.18</div>
                <div className={styles.objection_3}>홍길동</div>
                <div className={styles.objection_2}>확인</div>
                <div className={styles.objection_2}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">답변보기</button>
                </div>
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

export default function MyAssignment() {
    return (
        <div className={styles.content}>

            <Title mode={4}/>
            
            <SelectLecture/>
            <Objection/>
            
        </div>
    )
}