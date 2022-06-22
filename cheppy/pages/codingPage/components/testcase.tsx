import {Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const Testcase = () =>{
    return(
        <>
            <Typography fontWeight='bold' fontSize={15} style={{ backgroundColor: "#414E5A", color: 'white'}}>테스트케이스</Typography>
            <Typography>테스트케이스 1번</Typography>
            <Typography>입력값: main([1, 1, 1, 2, 3])</Typography>
            <Typography>출력값: [1, 2, 3]</Typography>
            <Typography>테스트케이스 2번</Typography>
            <Typography>입력값: main([3, 4, 5, 1, 2])</Typography>
            <Typography>출력값: [3, 4, 5, 1]</Typography>
        </>
    )

}

export default Testcase