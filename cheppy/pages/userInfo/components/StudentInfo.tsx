import {Button, Grid, InputAdornment, Link, Stack, TextField, Typography} from '@mui/material'
import request from 'graphql-request';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getUserInfo } from '../../../constants';

const StudentInfo = (props) =>{
    const info = props.Props[0]
    console.log("why  ", info)
    return(
        <Stack alignItems="center" direction="column" justifyContent="center">
            <Typography>학생정보</Typography>
            <Link href="../../changeInfo">{'계정관리에서 수정하기 >'}</Link>
            <Typography>이름</Typography>
            <Typography>{info.username}</Typography>
            <Typography>아이디</Typography>
            <Typography>{info.userid}</Typography>
            <Typography>학과</Typography>
            <Typography>{info.department}</Typography>
            <Typography>연락처</Typography>
            <Typography>{info.cellnumber}</Typography>
            <Typography>학기수</Typography>
            <Typography>{info.semester}</Typography>
            <Typography>이메일</Typography>
            <Typography>{info.email}</Typography>
        </Stack>
    )

}

export default StudentInfo