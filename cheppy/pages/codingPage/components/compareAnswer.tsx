import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const CompareAnswer = () =>{
    return(
        <>
            <Box sx={{width: '25vw'}}>
                <Box sx={{ height: 40, backgroundColor: "#414E5A"}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>답안비교</Typography>
                </Box>
            </Box>
        </>
    )

}

export default CompareAnswer