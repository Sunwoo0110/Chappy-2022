import useSWR, { useSWRConfig } from "swr"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../../styles/mypage/_myaccount.module.css"

import Title from "./_title"

// import 'bootstrap';
// import Modal from "bootstrap/js/dist/modal";


const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}


function StudentInfo_edit() {
    
    const { mutate } = useSWRConfig()
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/user/profile/${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onUpdate(_id) {

        var _username=document.getElementById('username').value;
        var _department=document.getElementById('department').value;
        var _semester=document.getElementById('semester').value;
        var _userid=document.getElementById('userid').value;
        var _cellnumber=document.getElementById('cellnumber').value;
        var _email=document.getElementById('email').value;

        document.getElementById('username').value = null; 
        document.getElementById('department').value = null; 
        document.getElementById('semester').value = null; 
        document.getElementById('userid').value = null; 
        document.getElementById('cellnumber').value = null; 
        document.getElementById('email').value = null; 

        if(_username==='') _username=data.user.name;
        if(_department==='') _department=data.user.department;
        if(_semester==='') _semester=data.user.semester;
        if(_userid==='') _userid=data.user.user_id;
        if(_cellnumber==='') _cellnumber=data.user.cell_number;
        if(_email==='') _email=data.user.email;

        let user = {
            name: _username,
            department: _department,
            semester: _semester,
            user_id: _userid,
            cell_number: _cellnumber,
            email: _email,
        }

        await fetch(`/api/user/profile/${user_id}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(user)
        })

        mutate(`/api/user/profile/${user_id}`);
    }

    return (
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>학생정보</div>
                <button style={{borderRadius:20}} class="btn btn-primary btn-sm" type="button" onClick={()=>onUpdate(user_id)}>수정하기</button>
            </div>
            <div className={styles.studentinfo}>
                <div className={styles.studentinfo_image}>사진</div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이름</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" id="username" class="form-control" placeholder={data.user.name} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학과</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" id="department" class="form-control" placeholder={data.user.department} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>학기수</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" id="semester" class="form-control" placeholder={data.user.semester} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </div>
                <div style={{width:"30%"}}>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>아이디</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" id="userid" class="form-control" placeholder={data.user.user_id} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>연락처</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" id="cellnumber" class="form-control" placeholder={data.user.cell_number} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={styles.studentinfo_data}>
                        <div className={styles.studentinfo_1}>이메일</div>
                        <div className={styles.studentinfo_2}>
                            <input type="text" id="email" class="form-control" placeholder={data.user.email} aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChangePassword() {
    
    const { mutate } = useSWRConfig()
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const { data, error } = useSWR(`/api/user/profile/${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onUpdate(_id) {

        var _curpw=document.getElementById('curpw').value;
        var _newpw=document.getElementById('newpw').value;
        var _checknewpw=document.getElementById('checknewpw').value;

        document.getElementById('curpw').value = null; 
        document.getElementById('newpw').value = null; 
        document.getElementById('checknewpw').value = null; 

        if(_curpw===data.user.password && _newpw===_checknewpw){
            let pw = {
                password: _newpw,
            }
    
            await fetch(`/api/user/profile/${user_id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(pw)
            })
    
            mutate(`/api/user/profile/${user_id}`);
        }
        else{
            console.log("failed changing pw")
        }
        
    }


    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>비밀번호 변경하기</div>
                <div className={styles.section_title_exp}>비밀번호를 주기적으로 변경하고 개인정보를 보호하세요</div>
            </div>
            <div className={styles.changepw}>
                <div className={styles.changepw_1}>현재 비밀번호 입력</div>
                <div className={styles.changepw_2}>
                    <input type="text" id="curpw" class="form-control" placeholder="현재 비밀번호를 입력해주세요" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className={styles.changepw_3}/>
            </div>
            <div className={styles.changepw}>
                <div className={styles.changepw_1}>새 비밀번호</div>
                <div className={styles.changepw_2}>
                    <input type="text" id="newpw" class="form-control" placeholder="새로운 비밀번호를 입력해주세요" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className={styles.changepw_3}/>
            </div>
            <div className={styles.changepw}>
                <div className={styles.changepw_1}>새 비밀번호 확인</div>
                <div className={styles.changepw_2}>
                    <input type="text" id="checknewpw" class="form-control" placeholder="새로운 비밀번호를 다시 입력해주세요" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div className={styles.changepw_3}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:20}} class="btn btn-primary" type="button" onClick={()=>onUpdate(user_id)}>확인</button>
                </div>
            </div>
        </div>
    )
}

function DeleteAccount() {

    const router = useRouter()
    
    const { mutate } = useSWRConfig()
    const user_id = "62ff6f624b99ac8a2bcbd01" // user _id 일단 없는 아이디로 줌
    // const user = useSelector(state => state.user);
    // const user_id = user.id;
    const { data, error } = useSWR(`/api/user/profile/${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onDelete(_id) {

        const newList =  await fetch(`/api/user/profile/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: _id }),
        })
        

        mutate(`/api/user/profile/${user_id}`);

        console.log("delete account");

        router.push('/')
    }


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
                    <button style={{fontSize:"small", display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100%", borderRadius:20}} class="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteChecker">탈퇴하기</button>

                    <div class="modal fade" id="deleteChecker" tabindex="-1" aria-labelledby="deleteCheckerLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body" style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"5px",margin:"30px"}}>
                                    <div className={styles.deletecheck}>정말 탈퇴하시겠습니까?</div>
                                    <div className={styles.deletecheck_exp}>한번 탈퇴하면 같은 아이디로 재가입 할 수 없습니다.</div>
                                    <div className={styles.deletecheck_exp}>또, 탈퇴 이후 일주일동안은 다시 회원가입하실 수 없으니 주의해주세요.</div>
                                    <div className={styles.buttons}>
                                        <button type="button" class="btn btn-secondary" style={{flexGrow: "1", flexBasis: "1px",background: "#114AFF"}} data-bs-dismiss="modal">취소</button>
                                        <button type="button" class="btn btn-primary" style={{flexGrow: "1", flexBasis: "1px", background: "#FF0000"}} onClick={()=>onDelete(user_id)} data-bs-dismiss="modal">탈퇴하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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