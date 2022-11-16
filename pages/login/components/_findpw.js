import Link from "next/link";

import { useState } from "react";
import commonStyles from "../../../styles/login/Login.module.css"
import loginStyles from "../../../styles/login/_login.module.css"

export default function FindPW() {
    // const userId = useSelector(state => state.user);

    const [inputs, setInputs] = useState({
        user_id: '',
        email: '',
    });

    const {user_id, email} = inputs;

    const onChangeInputs = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]:value,
        });
    };

    async function findPw() {
        await fetch(`/api/user/profile?user_id=${user_id}&email=${email}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log("response.data[0]: ",response.data[0]);
            var checkerModal = document.getElementById('checker')
            var modalBody = checkerModal.querySelector('#message')
            if(response.data.length==0){
                modalBody.textContent = "잘못된 ID 또는 잘못된 이메일입니다.";
            }
            else{
                modalBody.textContent = "비밀 번호: "+response.data[0].password;
            }            
        })        
        .catch(function(err) {
            console.log(err);
        })
    };

    return (
        <div className={commonStyles.main}>
            <div className={loginStyles["input-content"]}>
                <div className={loginStyles.statement}>ID</div>
                <input 
                    name="user_id" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={user_id}
                />
                <div className={loginStyles.statement}>이메일</div>
                <input 
                    name="email" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={email}
                />
            </div>
            <div className={loginStyles["login-btn"]} onClick={findPw} data-bs-toggle="modal" data-bs-target="#checker">비밀번호 찾기</div>
            <div className={loginStyles["join-content"]}>
                <div className={loginStyles.desc}>아직 회원이 아니신가요?</div>
                <Link href="/signup">
                <div className={loginStyles["join-txt"]}>회원가입하기</div>
                </Link>
            </div>

            <div class="modal fade" id="checker" tabindex="-1" aria-labelledby="checkerLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body" style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"5px",margin:"30px"}}>
                            <div className="message" id="message">확인 중..</div>
                            <div>
                                <button type="button" class="btn btn-secondary" style={{flexGrow: "1", flexBasis: "1px",background: "#114AFF"}} data-bs-dismiss="modal">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
