import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import StudentInfo from "./components/StudentInfo";
import { Typography } from "@mui/material";

import { ApolloProvider } from '@apollo/client'
import { client } from "../../src/cllient/client"

const UserInfo: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <Typography fontWeight='bold' fontSize={30}>마이페이지</Typography> 
      <StudentInfo></StudentInfo>
    </ApolloProvider>
  );
};


export default UserInfo;
