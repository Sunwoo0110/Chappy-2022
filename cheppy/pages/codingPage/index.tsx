import React, { FunctionComponent, useState } from "react";
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Typography } from "@mui/material";

import { ApolloProvider } from '@apollo/client'
import { client } from "../../src/cllient/client"

const CodingPage: NextPage = () => {
  return (
    <>
      <Typography fontWeight='bold' fontSize={30}>마이페이지</Typography> 
    </>
  );
};


export default CodingPage;
