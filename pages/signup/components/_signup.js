import { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/signup/Login.module.css"
import loginStyles from "../../../styles/signup/_login.module.css"
import * as userActions from "../../../store/modules/user";

export default function Signup() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user);

    const [inputs, setInputs] = useState({
        id: '',
        pwd: '',
    });

    const {id, pwd} = inputs;

    const onChangeInputs = (e) => {
       const {name, value} = e.target;
       setInputs({
            ...inputs,
            [name]:value,
       });
    };

    const setUserId = useCallback( (user_id) => {
        let payload = {
            id: user_id,
        };
        dispatch(userActions.setUser(payload));
    }, [dispatch]);


    async function onLogin() {
        console.log(userId);
        await fetch('/api/user/profile/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "pwd": pwd,    
            }),
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            //로그인 성공
            if(response.data!=-1){
                setUserId(response.data);
                window.location.href = "/lecture";
            }
        })        
        .catch(function(err) {
            console.log(err);
        })
    };

    return (
        <div className={commonStyles.main}>
            <div className={loginStyles["input-content"]}>
                <div className={loginStyles.statement}>이름</div>
                <input 
                    name="name" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                />
                <div className={loginStyles.statement}>ID</div>
                <input 
                    name="id" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                />
                <div className={loginStyles.statement}>비밀번호</div>
                <input 
                    name="pwd" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={pwd}
                    type={"password"}
                />
                <div className={loginStyles.statement}>비밀번호 확인</div>
                <input 
                    name="pwdcheck" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={pwd}
                    type={"password"}
                />
                <div className={loginStyles.statement}>이메일</div>
                <input 
                    name="email" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                />
                <div className={loginStyles.statement}>연락처</div>
                <input 
                    name="cell_number" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={pwd}
                />
                <div className={loginStyles.statement}>학과</div>
                <input 
                    name="department" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                />
                <div className={loginStyles.statement}>학기 수</div>
                <input 
                    name="semester" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                />
                <div className={loginStyles.statement}>구분</div>
                <input 
                    name="type" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                />
            </div>
            <div className={loginStyles["login-btn"]}>회원가입</div>
        </div>
    );
}
