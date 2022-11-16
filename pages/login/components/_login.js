import Link from "next/link";

import { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/login/Login.module.css"
import loginStyles from "../../../styles/login/_login.module.css"
import * as userActions from "../../../store/modules/user";

import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
    const { data: session } = useSession()

    if(session){
        window.location.href = "/lecture";
    }

    console.log("session: ",session)
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

    // const setUserId = useCallback( async () => {
    //     let payload = {
    //         id: id,
    //     };
    //     await dispatch(userActions.setUser(payload));
    // }, [dispatch, id]);

    async function onLogin() {

        const response = await signIn("id-password-credential", {
            id,
            pwd,
            redirect: false
        });
        console.log("response: ", response);
        
        console.log(userId);
        await fetch('/api/aggregation/login/login', {
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

    const onSubmitSearch = (e) => {
        if (e.key === "Enter") {
            onLogin();
        }
    };

    return (
        <div className={commonStyles.main}>
            <div className={loginStyles["input-content"]}>
                <div className={loginStyles.statement}>ID</div>
                <input 
                    name="id" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={id}
                    onKeyDown={onSubmitSearch}
                />
                <div className={loginStyles.statement}>비밀번호</div>
                <input 
                    name="pwd" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={pwd}
                    type={"password"}
                    onKeyDown={onSubmitSearch}
                />
                <Link href="/login/findpw">
                <div className={loginStyles["pwd-find-txt"]}>비밀번호를 잊어버렸나요?</div>
                </Link>
            </div>
            <div className={loginStyles["login-btn"]} onClick={onLogin}>로그인</div>
            <div className={loginStyles["join-content"]}>
                <div className={loginStyles.desc}>아직 회원이 아니신가요?</div>
                <Link href="/signup">
                <div className={loginStyles["join-txt"]}>회원가입하기</div>
                </Link>
            </div>
        </div>
    );
}
