import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Button, Grid, Typography } from "@mui/material";

import Problem from "./components/problem";
import Testcase from "./components/testcase";
import Header from "./components/header";
import CodingBox from "./components/codingBox";
import Hint from "./components/hint";
import Result from "./components/result";
import ExecuteResult from "./components/executeResult";
import Grade from "./components/grade";
import Solutions from "./components/solutions";
import CompareAnswer from "./components/compareAnswer";
import axios from "axios";
import CodingBoxForSubmit from "./components/codingBoxForSubmit";

const CodingPage: NextPage = () => {
    const [mode, setMode] = useState(1);

    const [execution_res, setExecution_Res] = useState("");
    const [testcase_res, setTestcase_Res] = useState([]);

    /* mode: 0 채점 */
    /* mode: 1 실행 */
    /* mode: 2 제출 */
    return (
    <>
        <Header/>
        <Grid container>
            <Grid item>
                <Problem/>
                <Testcase/>
            </Grid>
            <Grid item>
            {
                mode === 2 ?
                <>
                <CodingBoxForSubmit/>
                </>
                :
                    <>
                    <CodingBox mode={mode} modeChanger={setMode} 
                    exe_result={execution_res} exe_resultChanger={setExecution_Res} 
                    tc_result={testcase_res} tc_resultChanger={setTestcase_Res} />
                    </>
            }
                
            </Grid>
            <Grid item>
            {
                mode === 0 ?
                <>
                <Result result={testcase_res}/>
                <Hint/> 
                </>
                : mode === 1 ?
                <>
                <ExecuteResult result={execution_res}/>
                </>
                    :
                    <>
                    <Grade/>
                    <Solutions/>     
                    <CompareAnswer/>  
                    </>
            }
            </Grid>
        </Grid>              
    </>
    );
};


export default CodingPage;
