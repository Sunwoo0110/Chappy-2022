import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'

import ReactDOM from "react-dom";
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import router from 'next/router';

const CodingBox = () =>{
    const executionClick = () => {
        showValue();
        router.push('../../codingExecution')
    }

    const submitClick = () => {
        router.push('../../codingSubmit')
    }

    
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
    }
    
    function showValue() {
        alert(editorRef.current.getValue());
    }

    return(

        <>
            <Box sx={{height: '90vh', width: '50vw', border: 1, borderColor: '#bdbdbd' }} >
                <Typography fontSize={15} style={{ marginLeft: "3%", marginTop: 15, marginBottom: 10}}>코드작성</Typography>

                <Box sx={{border: 1, borderColor: '#bdbdbd'}} style={{ marginLeft: "2%", marginRight: "2%", marginBottom: 20}}>
                    <Editor height="70vh" defaultLanguage="python" defaultValue="// some comment" 
                    onMount={handleEditorDidMount}/>
                </Box>

                <Button variant="contained" style={{ marginLeft: '1%' }} onClick={executionClick}>실행</Button>
                <Button variant="contained" style={{ marginLeft: '1%' }} >채점</Button>
                <Button variant="contained" color="error" style={{ marginLeft: "70%" }} onClick={submitClick}>제출</Button>
            </Box>
        </>
    )

}

export default CodingBox