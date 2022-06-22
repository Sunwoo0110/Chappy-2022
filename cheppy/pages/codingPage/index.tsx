import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Typography } from "@mui/material";

import Problem from "./components/problem";
import Testcase from "./components/testcase";
import Header from "./components/header";

const CodingPage: NextPage = () => {
  return (
    <>
        <Header/>
        <Problem/>
        <Testcase/>
    </>
  );
};


export default CodingPage;
