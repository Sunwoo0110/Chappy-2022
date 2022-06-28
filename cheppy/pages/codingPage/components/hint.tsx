import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const Hint = () =>{
    return(
        <>
            <Box sx={{width: '25vw'}} >
                <Box sx={{ height: 40, backgroundColor: "#414E5A"}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>힌트</Typography>
                </Box>

                <Button variant="outlined" style={{ marginLeft: "3%", marginTop:10 }}>line 2</Button>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>Replace "Return" value</Typography>

                <Button variant="outlined" style={{ marginLeft: "3%", marginTop:10 }}>line 2</Button>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>Insert "Assignment" statement</Typography>

                <Button variant="outlined" style={{ marginLeft: "3%", marginTop:10 }}>line 3</Button>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>Insert "For" statement</Typography>

                <Button variant="outlined" style={{ marginLeft: "3%", marginTop:10 }}>line 4</Button>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>Insert "If" statement</Typography>

                <Button variant="outlined" style={{ marginLeft: "3%", marginTop:10 }}>line 5</Button>
                <Typography fontSize={13} style={{ marginLeft: "3%" }}>Insert "Augmented Assignment" statement</Typography>
            </Box>
        </>
    )

}

export default Hint