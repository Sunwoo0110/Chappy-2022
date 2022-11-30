import { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/signup/Signup.module.css"
import loginStyles from "../../../styles/signup/_signup.module.css"
import * as userActions from "../../../store/modules/user";

export default function Signup() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user);

    const [inputs, setInputs] = useState({
        name: null,
        user_id: null,
        password: null,
        pwdcheck: null,
        email: null,
        cell_number: null,
        department: null,
        semester: null,
        type: null,
    });

    const {name, user_id, password, pwdcheck, email, cell_number, department, semester, type} = inputs;

    const onChangeInputs = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]:value,
        });
    };

    // const setUserId = useCallback( (user_id) => {
    //     let payload = {
    //         id: user_id,
    //     };
    //     dispatch(userActions.setUser(payload));
    // }, [dispatch]);


    async function Signup() {
        // console.log(userId);

        // 비밀번호 다름
        if ( password !== pwdcheck ) {
            alert("비밀 번호가 다릅니다");
        } else {
            await fetch('/api/aggregation/signup/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "user_id": user_id,
                    "password": password,
                    "email": email,
                    "cell_number": cell_number,
                    "department": department,
                    "semester": parseInt(semester),
                    "type": parseInt(type),
                }),
            })
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                var checkerModal = document.getElementById('checker')
                var modalBody = checkerModal.querySelector('#message')
                // 회원 가입 성공
                if(response.success == true){
                    // setUserId(response.data);
                    modalBody.textContent = "회원 가입에 성공하였습니다!";            
                    window.location.href = "/login";
                } 
                // 실패
                else {
                    if(response.error == "duplicated user exists")
                        modalBody.textContent = "회원 가입에 실패하였습니다. 중복된 아이디입니다.";
                    else
                        modalBody.textContent = "회원 가입에 실패하였습니다. 모든 항목을 채워주세요.";
                }
            })        
            .catch(function(err) {
                // console.log(err);
            })
        }
    };

    return (
        <div className={commonStyles.main}>
            <div className={loginStyles["input-content"]}>
                <div className={loginStyles.statement}>이름</div>
                <input 
                    name="name" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={name}
                />
                <div className={loginStyles.statement}>ID</div>
                <input 
                    name="user_id" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={user_id}
                />
                <div className={loginStyles.statement}>비밀번호</div>
                <input 
                    name="password" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={password}
                    type={"password"}
                />
                <div className={loginStyles.statement}>비밀번호 확인</div>
                <input 
                    name="pwdcheck" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={pwdcheck}
                    type={"password"}
                />
                <div className={loginStyles.statement}>이메일</div>
                <input 
                    name="email" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={email}
                    type={"email"}
                />
                <div className={loginStyles.statement}>연락처</div>
                <input 
                    name="cell_number" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={cell_number}
                    type={"tel"}
                />
                <div className={loginStyles.statement}>학과</div>
                <input 
                    name="department" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={department}
                />
                <div className={loginStyles.statement}>학기 수</div>
                <input 
                    name="semester" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={semester}
                />
                <div className={loginStyles.statement}>구분</div>
                <input 
                    name="type" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={type}
                />
            </div>
            <div className={loginStyles["login-btn"]} onClick={Signup} data-bs-toggle="modal" data-bs-target="#checker">회원가입</div>
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
