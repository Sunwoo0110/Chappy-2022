import { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/signup/Signup.module.css"
import loginStyles from "../../../styles/signup/_signup.module.css"
import * as userActions from "../../../store/modules/user";

export default function Signup() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user);

    const [inputs, setInputs] = useState({
        name: '',
        user_id: '',
        password: '',
        pwdcheck: '',
        email: '',
        cell_number: '',
        department: '',
        semester: '',
        type: '',
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
                // 회원 가입 성공
                if(response.data!=-1){
                    // setUserId(response.data);
                    alert("회원 가입 성공");
                    swindow.location.href = "/login";
                }
            })        
            .catch(function(err) {
                console.log(err);
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
            <div className={loginStyles["login-btn"]} onClick={Signup}>회원가입</div>
        </div>
    );
}
