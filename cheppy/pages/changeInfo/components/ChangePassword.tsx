import {Button, Grid, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, UPDATE_USER_INFO, UPDATE_USER_PASSWORD } from '../../../database/constants'
import { gql, useMutation, useQuery, ApolloClient, ApolloProvider } from '@apollo/client'
import { useState } from 'react'
import React from "react";

const ChangePassword = () =>{

    const { data } = useQuery(GET_USER, {
        variables: { "id": "62ab7d4865ffc19129687a35"}
    })
    //console.log("result1: ", data)
    const user=data
    //console.log("result2: ", user)

    const [values, setValues] = useState({ current_pw: "", new_pw: "", check_new_pw: ""})

    const [updateUserPassword, {}] = useMutation(UPDATE_USER_PASSWORD, {
        variables: {input: { password: values.new_pw},
            "id": "62ab7d4865ffc19129687a35",
          }
    })

    const textInput1 = React.useRef(null);
    const textInput2 = React.useRef(null);
    const textInput3 = React.useRef(null);

    const handleClick = () => {
        console.log(user)
        // if(values.current_pw!==user.password){
        //     console.log("wrong password ",values.current_pw," ",user.password)
        // }
        // else if(values.new_pw!==values.check_new_pw){
        //     console.log("password not matching",values.new_pw," ",values.check_new_pw)
        // }
        // else{
        //     console.log("password changed")
        //     updateUserPassword()
        //     textInput1.current.value = ""
        //     textInput2.current.value = ""
        //     textInput3.current.value = ""
        //}
    }

    const handleChange = (event) => {
        console.log(event.target.id, " " ,event.target.value)
        const { id, value } = event.target
        setValues({ ...values, [id]: value })
    }

    return(
        <Stack spacing={2} direction="column" justifyContent="center">
            <Typography fontWeight='bold' fontSize={20}>비밀번호 변경하기</Typography>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>현재 비밀번호 입력</Typography>
                </Grid>
                <Grid item>
                    <TextField inputRef={textInput1} id="current_pw" label="현재 비밀번호를 입력해주세요" variant="outlined" onChange={handleChange}></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" >확인</Button>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>새 비밀번호</Typography>
                </Grid>
                <Grid item>
                    <TextField inputRef={textInput2} id="new_pw" label="새로운 비밀번호를 입력해주세요" variant="outlined" onChange={handleChange}></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" >확인</Button>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>새 비밀번호 확인</Typography>
                </Grid>
                <Grid item>
                    <TextField inputRef={textInput3} id="check_new_pw" label="새로운 비밀번호를 다시 입력해주세요" variant="outlined" onChange={handleChange}></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit" onClick={handleClick}>완료</Button>
                </Grid>
            </Grid>
        </Stack>
    )

}
export default ChangePassword