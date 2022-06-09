import { Stack, Grid, TextField, Typography, Button, InputAdornment } from '@mui/material'
import { signUpUserMutation } from "../../../constants"
import { request } from "graphql-request"
import { useState } from 'react'
import Link from 'next/link'
import router from 'next/router'

const Site = () => {
    
    //let userid, email, password, check_password

    // let signUpUser = async (data: any) => {
    //     console.log(username);
    //     const res = await request("http://localhost:3000/api/userServer", signUpUserMutation, data);
    //     console.log(res);
    // }

    //
    
    //const [username, setUsername] = useState('');
    const [values, setValues] = useState({ username: "", userid: "", email: "", password: "", check_password: ""})

    const signUpUser = async () => {
        console.log(values)

        // check password
        if (values.password != values.check_password) {
            let cp = document.querySelector('#input-check-password')
            // password 칸 빨간색
            console.log("wrong")
        }

        else {
            const res = await request("http://localhost:3000/api/userServer", signUpUserMutation, { userid: "2", password: "2", email: "2", username: "2"});
            console.log(res)
            // router.push("/")
            // <Link href="/"></Link>
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
        //console.log(values)
    }

    return(
        <div>
            <Stack alignItems="center" direction="column" justifyContent="center">
                {/* <h4>이름</h4> */}
                <Typography mt={1}> 이름</Typography>
                <TextField id="input-name" label="이름" variant="outlined" size="small" 
                style ={{width: '40%'}} onChange={handleChange} name="username"/>
                <Typography mt={1}>아이디</Typography>
                <TextField id="input-userid" label="아이디" variant="outlined" size="small" style ={{width: '40%'}} 
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {/* href 변경 (아이디 중복) */}
                            <Button variant='outlined' size="small" href="/">중복 확인</Button>
                        </InputAdornment>
                    ),}} onChange={handleChange} name="userid"/>
                <Typography mt={1}>이메일</Typography>
                <TextField id="input-email" label="이메일" variant="outlined" size="small" style ={{width: '40%'}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {/* href 변경 (이메일 인증) */}
                            <Button variant='outlined' size="small" href="/">인증</Button>
                        </InputAdornment>
                    ),}}
                    onChange={handleChange} name="email">
                </TextField>
                <Typography mt={1}>비밀번호</Typography>
                <TextField id="input-password" label="비밀번호" variant="outlined" size="small" 
                style ={{width: '40%'}} type="password" onChange={handleChange} name="password"/>
                <Typography mt={1}>비밀번호 확인</Typography>
                <TextField id="input-check-password" label="비밀번호 확인" variant="outlined" size="small" 
                style ={{width: '40%'}} type="password" onChange={handleChange} name="check_password"/>
                <Typography mt={2}></Typography>
                <Button variant="contained" style ={{width: '40%'}} onClick={signUpUser}>회원가입</Button>
            </Stack>
        </div>
    )
}

export default Site