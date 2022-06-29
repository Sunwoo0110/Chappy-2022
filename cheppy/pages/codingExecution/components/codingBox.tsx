import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import router from 'next/router';

const CodingBox = () =>{
    const handleClick = () => {
        router.push('../../codingPage')
    }

    const submitClick = () => {
        router.push('../../codingSubmit')
    }

    return(
        <>
            <Box sx={{height: '90vh', width: '50vw', border: 1, borderColor: '#bdbdbd' }} >
                <Typography fontSize={15} style={{ marginLeft: "3%", marginTop: 15, marginBottom: 10}}>코드작성</Typography>

                <Box sx={{border: 1, borderColor: '#bdbdbd'}} style={{ marginLeft: "2%", marginRight: "2%", marginBottom: 20}}>
                    <Editor height="70vh" defaultLanguage="javascript" defaultValue="// some comment"/>
                </Box>
                <Button variant="contained" style={{ marginLeft: '1%' }}>실행</Button>
                <Button variant="contained" style={{ marginLeft: '1%' }} onClick={handleClick}>채점</Button>
                <Button variant="contained" color="error" style={{ marginLeft: "70%" }} onClick={submitClick}>제출</Button>
            </Box>
        </>
    )

}

export default CodingBox