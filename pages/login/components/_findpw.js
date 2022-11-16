import Link from "next/link";

import { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/login/Login.module.css"
import loginStyles from "../../../styles/login/_login.module.css"
import * as userActions from "../../../store/modules/user";

export default function FindPW() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user);

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

    // const setUserId = useCallback( (user_id) => {
    //     let payload = {
    //         id: user_id,
    //     };
    //     dispatch(userActions.setUser(payload));
    // }, [dispatch]);

    async function FindPW() {
        // console.log(userId);
        await fetch('/api/aggregation/login/findpw', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "user_id": user_id,
                "email": email,    
            }),
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            // 비밀 번호 찾기 성공
            if(response.data!=-1){
                alert("비밀 번호는 " + response.data)
            } else {
                alert("회원 정보가 없습니다.")
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
            <div className={loginStyles["login-btn"]} onClick={FindPW}>비밀번호 찾기</div>
            <div className={loginStyles["join-content"]}>
                <div className={loginStyles.desc}>아직 회원이 아니신가요?</div>
                <Link href="/signup">
                <div className={loginStyles["join-txt"]}>회원가입하기</div>
                </Link>
            </div>
        </div>
    );
}
