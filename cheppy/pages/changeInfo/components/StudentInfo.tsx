import {Box, Button, Grid, Stack, TextField, Typography} from '@mui/material'
import Image from 'next/image'
import profile from '../img/profile.jpg'
import { GET_USER, UPDATE_USER_INFO } from '../../../database/constants'
import { gql, useMutation, useQuery, ApolloClient, ApolloProvider } from '@apollo/client'
import { useState } from 'react'
import React from "react";


const StudentInfo = () =>{

    const [values, setValues] = useState({ username: "", userid: "", department: "", cellnumber: "", semester: null, email: ""})

    const [updateUserInfo, {}] = useMutation(UPDATE_USER_INFO, {
        variables: {input: {username: values.username, userid: values.userid,
              department: values.department, cellnumber: values.cellnumber,
              semester: values.semester, email: values.email },
            "id": "62ab7d4865ffc19129687a35",
          }
    })

    const textInput1 = React.useRef(null);
    const textInput2 = React.useRef(null);
    const textInput3 = React.useRef(null);
    const textInput4 = React.useRef(null);
    const textInput5 = React.useRef(null);
    const textInput6 = React.useRef(null);

    const handleClick = () => {
        updateUserInfo()
        // textInput1.current.value = ""
        // textInput2.current.value = ""
        // textInput3.current.value = ""
        // textInput4.current.value = ""
        // textInput5.current.value = ""
        // textInput6.current.value = ""
    }

    const { data } = useQuery(GET_USER, {
        variables: { "id": "62ab7d4865ffc19129687a35"}
    })
    //console.log("result1: ", data)
    const user=data.getUser
    console.log("result2: ", user)

    const handleChange = (event) => {
        const { id, value } = event.target
        setValues({ ...values, [id]: value })
    }

    return(
        <Stack alignItems="center" spacing={2} direction="column" justifyContent="center">
            <Grid container spacing={1}>
                <Grid item>
                    <Typography fontWeight='bold' fontSize={20}>학생정보</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit" onClick={handleClick}>수정하기</Button>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item>
                    <Image src={profile} height={240} width={240} layout="fixed"/>
                </Grid>
                <Grid item>
                    <Typography>이름</Typography>
                    <TextField inputRef={textInput1} id="username" label={user.username} variant="outlined" onChange={handleChange}></TextField>
                    <Typography>학과</Typography>
                    <TextField inputRef={textInput2} id="department" label={user.department} variant="outlined" onChange={handleChange}></TextField>
                    <Typography>학기수</Typography>
                    <TextField inputRef={textInput3} id="semester" label={user.semester} variant="outlined" onChange={handleChange}></TextField>
                </Grid>
                <Grid item>
                    <Typography>아이디</Typography>
                    <TextField inputRef={textInput4} id="userid" label={user.userid} variant="outlined" onChange={handleChange}></TextField>
                    <Typography>연락처</Typography>
                    <TextField inputRef={textInput5} id="cellnumber" label={user.cellnumber} variant="outlined" onChange={handleChange}></TextField>
                    <Typography>이메일</Typography>
                    <TextField inputRef={textInput6} id="email" label={user.email} variant="outlined" onChange={handleChange}></TextField>
                </Grid>
            </Grid>
        </Stack>
    )

}
export default StudentInfo