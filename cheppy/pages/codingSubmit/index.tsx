import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Grid, Typography } from "@mui/material";

import Problem from "./components/problem";
import Testcase from "./components/testcase";
import Header from "./components/header";
import CodingBox from "./components/codingBox";
import Grade from "./components/grade";
import Solutions from "./components/solutions";
import CompareAnswer from "./components/compareAnswer";

const CodingSubmit: NextPage = () => {
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


export default CodingSubmit;