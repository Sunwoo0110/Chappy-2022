import { Stack, Grid, TextField, Typography, Button, InputAdornment } from '@mui/material'

const Site = () => {
    return(
        <div>
            <Stack alignItems="center" direction="column" justifyContent="center">
                {/* <h4>이름</h4> */}
                <Typography mt={1}> 이름</Typography>
                <TextField id="input-name" label="이름" variant="outlined" size="small" style ={{width: '40%'}}/>
                <Typography mt={1}>이메일</Typography>
                <TextField id="input-email" label="이메일" variant="outlined" size="small" style ={{width: '40%'}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {/* href 변경 (이메일 인증) */}
                            <Button variant='outlined' size="small" href="/">인증</Button>
                        </InputAdornment>
                    ),}}>
                </TextField>
                <Typography mt={1}>비밀번호</Typography>
                <TextField id="input-password" label="비밀번호" variant="outlined" size="small" 
                style ={{width: '40%'}} type="password"/>
                <Typography mt={1}>비밀번호 확인</Typography>
                <TextField id="input-check-password" label="비밀번호 확인" variant="outlined" size="small" 
                style ={{width: '40%'}} type="password"/>
                <Typography mt={2}></Typography>
                <Button variant="contained" style ={{width: '40%'}}>회원가입</Button>
            </Stack>
        </div>
    )
}

export default Site