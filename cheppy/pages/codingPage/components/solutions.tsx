import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const Solutions = () =>{
    return(
        <>
            <Box sx={{width: '25vw'}} >
                <Box sx={{ height: 40, backgroundColor: "#414E5A"}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>해결방안</Typography>
                </Box>

                <Typography fontSize={13} style={{ marginLeft: "3%" }}>2번째 줄</Typography>
                <Button variant="outlined" style={{ marginLeft: "3%", marginTop:10 }}>Delete "this statement"</Button>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>버튼을 누르면 코드가 바뀝니다</Typography>

            </Box>
        </>
    )

}

export default Solutions