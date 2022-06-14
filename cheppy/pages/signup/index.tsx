import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { Typography, Box, Stack } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import OtherService from './components/OtherService'
import Site from './components/Site'
import { client } from "../../src/client/client";

const signup: NextPage = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Site />
        <Stack alignItems="center" direction="row" justifyContent="center" style ={{width: '100%'}}>
          <Box sx={{ width: 250, height: 1.5, backgroundColor: 'black' }}  />
          <Typography mt={3} mb={3} ml={3} mr={3}>또는</Typography>
          <Box sx={{ width: 250, height: 1.5, backgroundColor: 'black' }}  />
        </Stack>
        <OtherService />
        <Stack alignItems="center" direction="row" justifyContent="center" style ={{width: '100%'}} mt={2}>
          <Link href="/">
            {/* href 변경 */}
            <a>더보기</a>
          </Link>
        </Stack>
    </div>
    </ApolloProvider>
  )
}

export default signup
