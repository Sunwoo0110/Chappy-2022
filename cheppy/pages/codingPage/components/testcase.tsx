import {Box, Button, Popover, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import Link from "next/link"
import * as React from 'react';

const Testcase = () =>{
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    //testcase 버튼 클릭시 클립보드 복사
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
        copyClipboard("main([1, 1, 1, 2, 3])");
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //클립보드 복사 함수
    const copyClipboard = async (
        text: string,
        successAction?: () => void,
        failAction?: () => void,
        ) => {
        try {
            await navigator.clipboard.writeText(text);
            successAction && successAction();
        } catch (error) {
            failAction && failAction();
        }
    };

    return(
        <>
            <Box sx={{width: '25vw'}} >
                <Box sx={{ height: 40, backgroundColor: "#414E5A", verticalAlign: 'middle', pt:1.2}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white' }}>테스트케이스</Typography>
                </Box>

                <Box sx={{height:'50vh', overflow: 'scroll'}}>
                    <Button variant="outlined" style={{ marginLeft: "3%", marginTop:15 }} onClick={handleClick}>테스트케이스 1번</Button>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                        <Typography sx={{ p: 2 }}>main([testcase]) copied.</Typography>
                    </Popover>
                    <Typography fontSize={13} style={{ marginLeft: "3%" }}>입력값: main([1, 1, 1, 2, 3])</Typography>
                    <Typography fontSize={13} style={{ marginLeft: "3%" }}>출력값: [1, 2, 3]</Typography>

                    <Button variant="outlined" style={{ marginLeft: "3%" , marginTop:15}} onClick={handleClick}>테스트케이스 2번</Button>
                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                        <Typography sx={{ p: 2 }}>main([testcase]) copied.</Typography>
                    </Popover>
                    <Typography fontSize={13} style={{ marginLeft: "3%" }}>입력값: main([3, 4, 5, 1, 2])</Typography>
                    <Typography fontSize={13} style={{ marginLeft: "3%" }}>출력값: [3, 4, 5, 1]</Typography>
                </Box>
            </Box>
        </>
    )

}

export default Testcase