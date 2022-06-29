import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Grid, Typography } from "@mui/material";

import Problem from "./components/problem";
import Testcase from "./components/testcase";
import Header from "./components/header";
import CodingBox from "./components/codingBox";
import ExecuteResult from "./components/executeResult";

const CodingExecution: NextPage = () => {
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
                <ExecuteResult/>
            </Grid>
        </Grid>              
    </>
  );
};


export default CodingExecution;