import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography, List, ListItem} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import { useState } from 'react';

const Result = ({result}) => {
    const totalNum = result.length;
    // const [wrongNum, setWrongNum]= useState(0);
    var wrongNum = 0;

    const [grade, setGrade] = useState(0);
    const [grade_res, setGrade_Res] = useState('Correct');

    const Row = (props) => {

        const number = props.number + 1;
        const success = props.row.success;
        const input = props.row.input;
        const output = props.row.output;

        if(!success) {
            setGrade_Res('Wrong')
            wrongNum += 1
        }

        else {
            setGrade_Res('Correct')
        }

        // console.log(wrongNum)

        setGrade(100 * ((totalNum - (wrongNum/2))/ totalNum))

        return (
            <>
                <Typography fontWeight='bold' fontSize={13} style={{ marginLeft: "3%", marginTop:30, marginBottom:10, backgroundColor:"#fcf6d2" }}>
                    {`테스트케이스 ${number}번: ${success}`}
                </Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>{`입력값: ${input}`}</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>{`출력값: ${output}`}</Typography>
            </>

        )
    }

    return(
        <>
            <Box sx={{width: '25vw'}} >
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>채점 결과</Typography>
                </Box>

                <Box sx={{ height:'40vh', overflow: 'scroll'}}>
                    <Typography fontSize={13} style={{ marginLeft: "3%", marginTop:10}}>{`bwj2800님의 채점 결과는 ${grade_res} 입니다.`}</Typography>

                    <Typography fontSize={13} style={{ marginLeft: "3%", marginTop:10}}>{`총점: ${grade}`}</Typography>

                    <List sx={{ width: '100', height: '100'}}>
                            {result &&
                                result.map((v, inx) => {
                                    return <Row key={inx} row={v} number={inx}/>
                                })}
                    </List>
                </Box>

                {/* <Typography fontWeight='bold' fontSize={13} style={{ marginLeft: "3%", marginTop:30, marginBottom:10, backgroundColor:"#fcf6d2" }}>테스트케이스 1번: Fail</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>입력값: main([1, 1, 1, 2, 3])</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>출력값: [1, 2, 3]</Typography>

                <Typography fontWeight='bold' fontSize={13} style={{ marginLeft: "3%", marginTop:30, marginBottom:10, backgroundColor:"#fcf6d2" }}>테스트케이스 2번: Fail</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>입력값: main([3, 4, 5, 1, 2])</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>출력값: [3, 4, 5, 1]</Typography>

                <Typography fontWeight='bold' fontSize={13} style={{ marginLeft: "3%", marginTop:30, marginBottom:10, backgroundColor:"#fcf6d2" }}>테스트케이스 3번: Fail</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>입력값: main([])</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>출력값: []</Typography> */}

                {/* <Box sx={{backgroundColor: "#fcf6d2"}}>
                <Typography fontWeight='bold' fontSize={13} style={{ marginLeft: "3%", marginTop:30, marginBottom:10 }}>테스트케이스 4번: Fail</Typography>
                </Box>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>입력값: main([3, 4, 5, 1, 3])</Typography>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>출력값: [3, 4, 5, 1]</Typography> */}
            </Box>
        </>
    )

}

export default Result