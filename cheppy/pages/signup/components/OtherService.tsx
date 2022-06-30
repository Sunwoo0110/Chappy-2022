import { Stack, Grid, TextField, Typography, Button } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import naver from '../img/naver.png'
import kakao from '../img/kakao.png'
import github from '../img/github.png'
import google from '../img/google.png'

const OtherService = () => {
    const CLIENT_ID = "1e3e877538e3c93c3d91"
    const CLIENT_SECRET = "ef2e56d76d431cf6632b503c0136270bb8b9818c"

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
                <Link href="https://github.com/login/oauth/authorize?client_id=1e3e877538e3c93c3d91&redirect_uri=http://localhost:3000">
                    <a>
                        {/* response 받아서 user 정보 받아오기 */}
                        <Image src={github} height={30} width={30} layout="fixed"/>
                    </a>
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