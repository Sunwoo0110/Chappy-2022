import { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from "../../../styles/login/Login.module.css"
import loginStyles from "../../../styles/login/_login.module.css"
import * as userActions from "../../../store/modules/user";

export default function Login() {
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

    const setUserId = useCallback( () => {
        let payload = {
            id: id,
        };
        dispatch(userActions.setUser(payload));
    }, [dispatch, id]);

    // const setUserId = useCallback( async () => {
    //     let payload = {
    //         id: id,
    //     };
    //     await dispatch(userActions.setUser(payload));
    // }, [dispatch, id]);

    // async function setUserId() {
    //     let payload = {
    //         id: id,
    //     };
    //     return await dispatch(userActions.setUser(payload));
    // }

    // const setUserId = async () => {
    //     let payload = {
    //         id: id,
    //     };
    //     dispatch(userActions.setUser(payload));
    // }

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
            console.log(response);
            //로그인 성공
            if(response.data==0){
                setUserId();
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
                <div className={loginStyles["pwd-find-txt"]}>비밀번호를 잊어버렸나요?</div>
            </div>
            <div className={loginStyles["login-btn"]} onClick={onLogin}>로그인</div>
            <div className={loginStyles["join-content"]}>
                <div className={loginStyles.desc}>아직 회원이 아니신가요?</div>
                <div className={loginStyles["join-txt"]}>회원가입하기</div>
            </div>
        </div>
    );
}
