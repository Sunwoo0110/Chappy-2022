import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import router from 'next/router';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/modules";
import * as codeActions from "../../../store/modules/code";
import * as feedbackActions from "../../../store/modules/feedback";
import { FeedbackReduxState } from '../../../store/modules/feedback';

const CodingBox = ({ mode, modeChanger, result, resultChanger}) =>{
    const dispatch = useDispatch();
    const codeValue = useSelector((state: RootState) => state.code);
    const getCodeEvent = useCallback((code)=>{
        dispatch(codeActions.setCode(code));
    }, [dispatch]);

    const feedbackValue = useSelector((state: RootState) => state.feedback);
    const getFeedback = useCallback(async (code)=>{
        await axios.post('http://localhost:4000/feedback/get_feedback', {
            //feedback api 완성되면 연결
            code
        })
        .then((res) => {
            console.log("postFeedback success");
            console.log(res.data);
            let cnt = 0;
            const hint = Object.keys(res.data).map((line) => (
                res.data[line].map((contents) => (
                    Object.keys(contents).map((content) => (
                        cnt++
                    ))
                ))
            ));
            console.log(typeof res.data);
            let payload: FeedbackReduxState = {
                content: Object(res.data),
                num: cnt,
            };
            console.log(payload);        
            dispatch(feedbackActions.getFeedback(payload));
        })
        .catch(error => {
            console.log("postFeedback failed");
            console.log(error.response);
            let payload: FeedbackReduxState = {
                content: "Server Error",
                num: 0,
            };        
            dispatch(feedbackActions.getFeedback(payload));
        })
    }, [dispatch]);

    // console.log(codeValue);
    console.log(feedbackValue);

    const [value, setValue] = useState('');

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor; 
    }

    const handleEditorChange = (event) => {
        // console.log(event);
        setValue(event)
    }

    const gradingClick = async () => {
        await getCodeEvent(editorRef.current.getValue());
        //feedback api 연결 필요
        await getFeedback(editorRef.current.getValue());
        modeChanger(0);
    }

    const executionClick = async () => {
        //showValue();
        await axios.post('http://localhost:4000/runcode/run', {
                code: editorRef.current.getValue()
            })
            .then((res) => {
                console.log("success");
                console.log(res.data.result);
                resultChanger(res.data.result);
            })
            .catch(error => {
                console.log("failed");
                console.log(error.response)
            })
            modeChanger(1);
    }    

    const submitClick = async () => {
        await getCodeEvent(editorRef.current.getValue());
        // feedback api 연결 필요
        await getFeedback(editorRef.current.getValue());
        modeChanger(2);
    }
     
    function showValue() {
        alert(editorRef.current.getValue());
    }

    return(

        <>
            <Box sx={{height: '90vh', width: '50vw', border: 1, borderColor: '#bdbdbd' }} >
                <Typography fontSize={15} style={{ marginLeft: "3%", marginTop: 15, marginBottom: 10}}>코드작성</Typography>

                <Box sx={{border: 1, borderColor: '#bdbdbd'}} style={{ marginLeft: "2%", marginRight: "2%", marginBottom: 20}}>
                    <Editor
                        height="70vh"
                        defaultLanguage="python"
                        defaultValue="# some comment"
                        onMount={handleEditorDidMount}/>
                </Box>

                <Button variant="contained" style={{ marginLeft: '1%' }} onClick={executionClick}>실행</Button>
                <Button variant="contained" style={{ marginLeft: '1%' }} onClick={gradingClick}>채점</Button>
                <Button variant="contained" color="error" style={{ marginLeft: "70%" }} onClick={submitClick}>제출</Button>
            </Box>
        </>
    )

}

export default CodingBox