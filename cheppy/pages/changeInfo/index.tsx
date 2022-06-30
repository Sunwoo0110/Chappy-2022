import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import StudentInfo from "./components/StudentInfo";
import ChangePassword from "./components/ChangePassword";
import Quit from "./components/Quit";
import { Typography } from "@mui/material";

import { ApolloProvider } from '@apollo/client'
import { client } from "../../src/cllient/client"
import { useRouter } from "next/router"


const ChangeInfo: NextPage = () => {
  return (
    // // <ApolloProvider client={client}>
    //   <Typography fontWeight='bold' fontSize={30}>계정관리</Typography>
    //   <StudentInfo/>
    //   <ChangePassword/>
    //   <Quit/>
    // // </ApolloProvider>
    <></>
  );
};

export default ChangeInfo;