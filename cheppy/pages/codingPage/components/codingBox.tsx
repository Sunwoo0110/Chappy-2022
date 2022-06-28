import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

const CodingBox = () =>{
    return(
        <>
            <Box sx={{width: '50vw', border: 1 }} >
                <Typography fontSize={15} style={{ marginLeft: "3%", marginTop: 15}}>코드작성</Typography>
                <Editor height="80vh" defaultLanguage="javascript" defaultValue="// some comment"/>
                {/* <Box sx={{height:500, border: 1 }} >
                </Box> */}
                <Button variant="contained" style={{ marginLeft: "1%" }}>실행</Button>
                <Button variant="contained" style={{ marginLeft: "1%" }}>채점</Button>
                <Button variant="contained" color="error" style={{ marginRight: "1%" }}>제출</Button>
            </Box>
        </>
    )

}

export default CodingBox