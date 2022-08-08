import styles from "../../../styles/mypage/_main.module.css"

import Title from "./_title"


function StudentInfo_edit() {
    return (
        <div className={styles.section_bg}>
            <div style={{columnGap:"70%"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>학생정보</div>
                <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20}} class="btn btn-primary" type="button">수정하기</button>
            </div>
            <div className={styles.studentinfo}>
                <div className={styles.studentinfo_image}>사진</div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이름</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학과</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학기수</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>아이디</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>연락처</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이메일</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChangePassword() {
    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>비밀번호 변경하기</div>
                <div className={styles.section_title_exp}>비밀번호를 주기적으로 변경하고 개인정보를 보호하세요</div>
            </div>
            <div className={styles.changepw}>
                <div className={styles.changepw_1}>현재 비밀번호 입력</div>
                <div className={styles.changepw_2}>
                    <input type="text" class="form-control" placeholder="현재 비밀번호를 입력해주세요" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className={styles.changepw_3}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20}} class="btn btn-outline-secondary" type="button">확인</button>
                </div>
            </div>
            <div className={styles.changepw}>
                <div className={styles.changepw_1}>새 비밀번호</div>
                <div className={styles.changepw_2}>
                    <input type="text" class="form-control" placeholder="새로운 비밀번호를 입력해주세요" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className={styles.changepw_3}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20}} class="btn btn-outline-secondary" type="button">확인</button>
                </div>
            </div>
            <div className={styles.changepw}>
                <div className={styles.changepw_1}>새 비밀번호 확인</div>
                <div className={styles.changepw_2}>
                    <input type="text" class="form-control" placeholder="새로운 비밀번호를 다시 입력해주세요" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className={styles.changepw_3}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20}} class="btn btn-primary" type="button">확인</button>
                </div>
            </div>
        </div>
    )
}

function DeleteAccount() {
    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>탈퇴하기</div>
            </div>
            <div className={styles.changepw}>
                <div className={styles.deleteaccount_1}>
                    <div>한번 탈퇴하면 같은 아이디로 재가입 할 수 없습니다.</div>
                    <div>또, 탈퇴 이후 일주일동안은 다시 회원가입하실 수 없으니 주의해주세요.</div>
                </div>
                <div className={styles.deleteaccount_2}>
                    <button style={{fontSize:"small", display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100%", borderRadius:20}} class="btn btn-outline-danger" type="button">탈퇴하기</button>
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

export default function MyAccount() {
    return (
        <div className={styles.content}>

            <Title mode={5}/>
            
            <StudentInfo_edit/>
            <ChangePassword/>
            <DeleteAccount/>
            
        </div>
    )
}