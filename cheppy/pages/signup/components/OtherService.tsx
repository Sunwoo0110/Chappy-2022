import { Stack, Grid, TextField, Typography, Button } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import naver from '../img/naver.png'
import kakao from '../img/kakao.png'
import github from '../img/github.png'
import google from '../img/google.png'

const OtherService = () => {
    return(
        <div>
            <Typography mb={1} style ={{width: '100%'}} align="center">다른 서비스로 가입하기</Typography>
            <Stack alignItems="center" direction="row" justifyContent="center" >
                {/* 추후 href 변경 (계정 연동) */}
                <Link href="/"> 
                    <a><Image src={naver} height={30} width={30} layout="fixed"/></a>
                </Link>
                <Typography m={0.5}></Typography>
                <Link href="/">
                    <a><Image src={kakao} height={30} width={30} layout="fixed"/></a>
                </Link>
                <Typography m={0.5}></Typography>
                <Link href="/">
                    <a><Image src={github} height={30} width={30} layout="fixed"/></a>
                </Link>
                <Typography m={0.5}></Typography>
                <Link href="/">
                    <a><Image src={google} height={30} width={30} layout="fixed"/></a>
                </Link>
            </Stack>
        </div>
    )
}

export default OtherService