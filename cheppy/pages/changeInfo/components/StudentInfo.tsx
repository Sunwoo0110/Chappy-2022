import {Box, Button, Grid, Stack, TextField, Typography} from '@mui/material'

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
        <Stack alignItems="center" direction="column" justifyContent="center">
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography>학생정보</Typography>
                <Button variant="contained" type="submit" style ={{width: '40%'}}>수정하기</Button>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>이름</Typography>
                        <TextField id="input_name" label={info.username} variant="outlined"></TextField>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>아이디</Typography>
                        <TextField id="input_id" label={info.userid} variant="outlined"></TextField>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>학과</Typography>
                        <TextField id="input_department" label={info.department} variant="outlined"></TextField>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>연락처</Typography>
                        <TextField id="input_cellnumber" label={info.cellnumber} variant="outlined"></TextField>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>학기수</Typography>
                        <TextField id="input_semester" label={info.semester} variant="outlined"></TextField>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>이메일</Typography>
                        <TextField id="input_email" label={info.email} variant="outlined"></TextField>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )

}
export default StudentInfo