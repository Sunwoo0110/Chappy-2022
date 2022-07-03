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
    const [mode, setMode] = useState(0);

    const [execution_res, setExecution] = useState("");

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
                    <CodingBox mode={mode} modeChanger={setMode} result={execution_res} resultChanger={setExecution}/>
                    </>
            }
                
            </Grid>
            <Grid item>
            {
                mode === 0 ?
                <>
                <Result/>
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
