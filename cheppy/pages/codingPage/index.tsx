import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Grid, Typography } from "@mui/material";

import Problem from "./components/problem";
import Testcase from "./components/testcase";
import Header from "./components/header";
import CodingBox from "./components/codingBox";
import ExecuteResult from "./components/executeResult";
import Hint from "./components/hint";
import Result from "./components/result";
import Grade from "./components/grade";
import Solutions from "./components/solutions";
import CompareAnswer from "./components/compareAnswer";

const CodingPage: NextPage = () => {
  return (
    <>
        <Header/>
        <Grid container>
            <Grid item>
                <Problem/>
                <Testcase/>
            </Grid>
            <Grid item>
                <CodingBox/>
            </Grid>
            <Grid item>
                <Grade/>
                <Solutions/> 
                <CompareAnswer/>       
            </Grid>
        </Grid>              
    </>
  );
};


export default CodingPage;
