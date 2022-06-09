import {Button, Grid, Stack, TextField, Typography} from '@mui/material'

const ChangePassword = () =>{
    return(
        <Stack alignItems="center" direction="column" justifyContent="center">
            <Typography>비밀번호 변경하기</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>현재 비밀번호 입력</Typography>
                    <TextField id="input_current_pw" label="현재 비밀번호를 입력해주세요" variant="outlined"></TextField>
                </Grid>
                <Button variant="contained" style ={{width: '40%'}}>확인</Button>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>새 비밀번호</Typography>
                    <TextField id="input_new_pw" label="새로운 비밀번호를 입력해주세요" variant="outlined"></TextField>
                </Grid>
                <Button variant="contained" style ={{width: '40%'}}>확인</Button>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>새 비밀번호 확인</Typography>
                    <TextField id="check_new_pw" label="새로운 비밀번호를 다시 입력해주세요" variant="outlined"></TextField>
                </Grid>
                <Button variant="contained" style ={{width: '40%'}}>확인</Button>
            </Grid>
        </Stack>
    )

}
export default ChangePassword