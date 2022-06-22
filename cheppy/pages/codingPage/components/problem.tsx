import {Box, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const Problem = () =>{
    return(
        <>
            <Box sx={{ height: 40, backgroundColor: "#414E5A"}}>
                <Typography fontWeight='bold' fontSize={15} style={{color: 'white', verticalAlign: "middle" }}>문제와 제한사항</Typography>
            </Box>

            <Box sx={{ height:30, backgroundColor: "#bdbdbd"}}>
                <Typography fontSize={13} style={{ verticalAlign: "middle" }}>문제</Typography>
            </Box>
            <Typography fontSize={13}>리스트의 반복되는 값을 모두 제거하시오.</Typography>

            <Box sx={{ height: 30, backgroundColor: "#bdbdbd"}}>
                <Typography fontSize={13}>제한사항</Typography>
            </Box>
            <Typography fontSize={13}>main 함수 내부에만 코드를 작성하고 return문으로 답을 변환하시오.</Typography>
        </>
    )

}

export default Problem