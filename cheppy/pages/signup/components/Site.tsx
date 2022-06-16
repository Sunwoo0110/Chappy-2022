import { Stack, Grid, TextField, Typography, Button, InputAdornment } from '@mui/material'
import { signUpUserMutation } from "../../../constants"
import { gql, useMutation, useQuery, ApolloClient, ApolloProvider } from '@apollo/client'
import { typeDefs } from '../../../database/schema'
import { request } from "graphql-request"
import { useState } from 'react'
import Link from 'next/link'
import router from 'next/router'
import { client } from "../../../src/client/client";

const Site = () => {
    
    const [values, setValues] = useState({ username: "", userid: "", email: "", password: "", check_password: ""})

    interface UserInventory {
        id: number
        userid: string
        password: string
        email: string
        username: string
        // cellnumber: string
        // department: string
        // usertype: number
        // semester: number
    }

    interface UserInput {
        userid: string
        password: string
        email: string
        username: string
    }

    const NEW_USER = gql`
    mutation newUser($input: UserInput!){
        # //userid: $userid, password: $password, email: $email, username: $username
        newUser(input: $input){
            userid
            password
            email
            username
        }
    }
    `

    const [newUser, { data, loading, error }] = useMutation<
        {newUser: UserInventory},
        {input: UserInput}
    >(NEW_USER, {
        onCompleted: (data) => {
            console.log(data)
        },
        variables: { input: {userid: values.userid, password: values.password, email: values.email, username: values.username}}
    })


    const handleClick = () => {
        if (values.password != values.check_password) {
        }
        else {
            newUser()
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }

    return(

        <div>
            {loading ? <p>loading! </p> : null}
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.newUser ? <p>Saved!</p> : null}
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
                <Button type='submit' variant="contained" style ={{width: '40%'}} 
                onClick={handleClick}>회원가입</Button>
            </Stack>
        </div>

    )
}

export default Site