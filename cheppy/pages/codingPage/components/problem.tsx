import {Box, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const Problem = () =>{
    return(
        <>
            <Box sx={{width: '25vw'}}>
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Typography fontWeight='bold' fontSize={15} style={{marginLeft: "3%", color: 'white' }}>문제와 제한사항</Typography>
                </Box>

                <Box sx={{height:'30vh', overflow: 'scroll'}}>
                    <Box sx={{ height:30, backgroundColor: "#bdbdbd", pt:0.5}}>
                        <Typography fontSize={13} style={{ marginLeft: "3%" }}>문제</Typography>
                    </Box>
                    <Typography fontSize={13} style={{ marginLeft: "3%", marginTop:10, marginBottom:10 }}>리스트의 반복되는 값을 모두 제거하시오.</Typography>

                    <Box sx={{ height: 30, backgroundColor: "#bdbdbd", pt:0.5}}>
                        <Typography fontSize={13} style={{ marginLeft: "3%" }}>제한사항</Typography>
                    </Box>
                    <Typography fontSize={13} style={{ marginLeft: "3%", marginTop:10, marginBottom:10 }}>main 함수 내부에만 코드를 작성하고 return문으로 답을 변환하시오.</Typography>
                </Box>
            </Box>
        </>
    )

}

export default Problem