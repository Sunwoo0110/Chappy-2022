import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import { generateKey } from 'crypto';
import { GetServerSideProps } from 'next'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';


const getHint = async() => {
    console.log("dldld");
    await axios.post('http://localhost:4000/feedback/get_feedback', {
        //feedback api 완성되면 연결
    })
    .then((res) => {
        const hintData = res.data;
        console.log("success");
        console.log(hintData);
        return hintData;
    })
    .catch(error => {
        console.log("failed");
        console.log(error.response);
        return error.response;
    })
    
}

export default getHint
