import {Button, Grid, InputAdornment, Link, Stack, TextField, Typography} from '@mui/material'
import request from 'graphql-request';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getUserInfo } from '../../../constants';

const StudentInfo = (props) =>{
    const info = props.Props[0]
    console.log("why  ", info)
    return(
        <Stack spacing={2} direction="column" justifyContent="center">
            <Grid container spacing={10}>
                <Grid item>
                    <Typography fontWeight='bold'>학생정보</Typography>
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
                    <Typography>{info.username}</Typography>
                    <Typography>{info.userid}</Typography>
                    <Typography>{info.department}</Typography>
                </Grid>
                <Grid item>
                    <Typography>연락처</Typography>
                    <Typography>학기수</Typography>
                    <Typography>이메일</Typography>
                </Grid>
                <Grid item>
                    <Typography>{info.cellnumber}</Typography>
                    <Typography>{info.semester}</Typography>
                    <Typography>{info.email}</Typography>
                </Grid>                
            </Grid>                     
        </Stack>
    )

}

export default StudentInfo