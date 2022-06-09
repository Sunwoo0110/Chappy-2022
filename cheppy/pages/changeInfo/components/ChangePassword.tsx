import {Button, Grid, Stack, TextField, Typography} from '@mui/material'

const ChangePassword = () =>{
    return(
        <Stack spacing={2} direction="column" justifyContent="center">
            <Typography fontWeight='bold' fontSize={20}>비밀번호 변경하기</Typography>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>현재 비밀번호 입력</Typography>
                </Grid>
                <Grid item>
                    <TextField id="input_current_pw" label="현재 비밀번호를 입력해주세요" variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" >확인</Button>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>새 비밀번호</Typography>
                </Grid>
                <Grid item>
                    <TextField id="input_new_pw" label="새로운 비밀번호를 입력해주세요" variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained" >확인</Button>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Typography>새 비밀번호 확인</Typography>
                </Grid>
                <Grid item>
                    <TextField id="check_new_pw" label="새로운 비밀번호를 다시 입력해주세요" variant="outlined"></TextField>
                </Grid>
                <Grid item>
                    <Button variant="contained">완료</Button>
                </Grid>
            </Grid>
        </Stack>
    )

}
export default ChangePassword