import {Box, Button, Grid, Stack, TextField, Typography} from '@mui/material'
import Image from 'next/image'
import profile from '../img/profile.JPG'

// const handleClick = (e, text: string) => {
//     console.log(e);
//     console.log(text);
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;

    const name=data.input_name.value;
    const id=data.input_id.value;
    const department=data.input_department.value;
    const cellnumber=data.input_cellnumber.value;
    const semester=data.input_semester.value;
    const email=data.input_email.value;

    console.log("name", name);
    console.log("id", id);
    console.log("department", department);
    console.log("cellnumber", cellnumber);
    console.log("semeseter", semester);
    console.log("email", email);

    // const res = await request("http://localhost:3000/api/userServer", addTaskMutation, data);
};


const StudentInfo = (props) =>{
    console.log("all data ", props.Props)
    const info = props.Props[0]
    return(
        <Stack alignItems="center" onSubmit={handleSubmit} spacing={2} direction="column" justifyContent="center">
            <Grid container spacing={1}>
                <Grid item>
                    <Typography fontWeight='bold'>학생정보</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">수정하기</Button>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item>
                    <Image src={profile} height={240} width={240} layout="fixed"/>
                </Grid>
                <Grid item>
                    <Typography>이름</Typography>
                    <TextField id="input_name" label={info.username} variant="outlined"></TextField>
                    <Typography>학과</Typography>
                    <TextField id="input_department" label={info.department} variant="outlined"></TextField>
                    <Typography>학기수</Typography>
                    <TextField id="input_semester" label={info.semester} variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <Typography>아이디</Typography>
                    <TextField id="input_id" label={info.userid} variant="outlined"></TextField>
                    <Typography>연락처</Typography>
                    <TextField id="input_cellnumber" label={info.cellnumber} variant="outlined"></TextField>
                    <Typography>이메일</Typography>
                    <TextField id="input_email" label={info.email} variant="outlined"></TextField>
                </Grid>
            </Grid>
        </Stack>
    )

}
export default StudentInfo