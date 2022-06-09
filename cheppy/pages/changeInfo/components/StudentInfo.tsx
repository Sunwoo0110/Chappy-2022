import {Grid, TextField, Typography} from '@mui/material'

const StudentInfo = (props) =>{
    console.log("aaa ",props)
    const info = props.Props[0]
    return(
        <div>
            <Typography>학생정보</Typography>
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
        </div>
    )

}
export default StudentInfo