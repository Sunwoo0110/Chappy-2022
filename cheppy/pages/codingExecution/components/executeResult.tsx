import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const ExecuteResult = () =>{
    return(
        <>
            <Box sx={{width: '25vw'}}>
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>실행결과</Typography>
                </Box>

                <Typography fontSize={13} style={{ marginLeft: "3%", marginTop:10}}>출력값:</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%"}}>아무런 출력값이 없습니다.</Typography>
            </Box>
        </>
    )

}

export default ExecuteResult