import {Box, Button, Popover, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import * as React from 'react';

const Solutions = () =>{

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <>
            <Box sx={{width: '25vw', marginBottom:3}} >
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Grid container>
                        <Grid item width="25%">
                            <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "12%", marginRight: "6%", color: 'white'}}>해결방안</Typography>
                        </Grid>
                        <Grid item width="8%">
                            <Box sx={{ backgroundColor: "#FFD600", borderRadius: 2}}>
                                <Typography fontWeight='bold' fontSize={13}  align="center">11+</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Typography fontSize={14} fontWeight='bold' style={{ marginLeft: "5%", marginTop: 15 }}>2번째 줄</Typography>
                <Button variant="outlined" style={{ marginLeft: "20%", marginTop:10 }} onClick={handleClick}>Delete this statement</Button>
                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>
                <Typography align="center" fontSize={13} style={{ marginLeft: "3%", marginTop:5 }}>버튼을 누르면 코드가 바뀝니다</Typography>

            </Box>
        </>
    )

}

export default Solutions