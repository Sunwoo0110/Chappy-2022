import {Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { gql, useMutation, useQuery, ApolloClient, ApolloProvider } from '@apollo/client'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const StudentInfo = () =>{
    const { data } = useQuery(GET_USER, {
        variables: { "id": "62a9a23fd5ca81cddd59604b"}
    })
    const user=data.getUser
    console.log("result: ", user)
    return(
        <Stack spacing={2} direction="column" justifyContent="center">
            <Grid container spacing={10}>
                <Grid item>
                    <Typography fontWeight='bold' fontSize={20}>학생정보</Typography>
                </Grid>
                <Grid item>
                    <Link href="../../changeInfo">{'계정관리에서 수정하기 >'}</Link>
                </Grid>
            </Grid>          
            
            <Grid container spacing={10}>
                <Grid item>
                    <Typography>이름</Typography>
                    <Typography>아이디</Typography>
                    <Typography>학과</Typography>
                </Grid>
                <Grid item>
                    <Typography>{user.username}</Typography>
                    <Typography>{user.userid}</Typography>
                    <Typography>{user.department}</Typography>
                </Grid>
                <Grid item>
                    <Typography>연락처</Typography>
                    <Typography>학기수</Typography>
                    <Typography>이메일</Typography>
                </Grid>
                <Grid item>
                    <Typography>{user.cellnumber}</Typography>
                    <Typography>{user.semester}</Typography>
                    <Typography>{user.email}</Typography>
                </Grid>                
            </Grid>                     
        </Stack>
    )

}

export default StudentInfo