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
        email: '', 
        cell_number: '',
        department: '', 
        type: '',
        semester: ''
    });

    const {name, user_id, password, email, cell_number, department, type, semester} = inputs;

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
        await fetch('/api/user/profile', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "name":name,
                "user_id": user_id,
                "password": password,   
                "email":email,
                "cell_number":cell_number,
                "department":department,
                "type":type,
                "semester":semester,
                "lecture_list":[],
            }),
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response);

            // if(response.data!=-1){
            //     setUserId(response.data);
            //     window.location.href = "/lecture";
            // }
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
                    value={pwd}
                    type={"password"}
                />
                <div className={loginStyles.statement}>이메일</div>
                <input 
                    name="email" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={email}
                />
                <div className={loginStyles.statement}>연락처</div>
                <input 
                    name="cell_number" 
                    className={loginStyles.input}
                    onChange={onChangeInputs}
                    value={cell_number}
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
                <div className={loginStyles.select_input}>
                    <select style={{height:'50px'}} class="form-select form-select-sm" id="type" aria-label="Floating label select example">
                        <option selected value="0">학생</option>
                        <option value="1">교수</option>
                    </select>
                </div>
            </div>
            <div className={loginStyles["login-btn"]}>회원가입</div>
        </div>
    );
}
