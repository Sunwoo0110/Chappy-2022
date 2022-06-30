import {Button, Grid, Stack, TextField, Typography} from '@mui/material'

const Quit = () =>{
    return(
        <Stack direction="column" justifyContent="center">
            <Typography fontWeight='bold' fontSize={20}>탈퇴하기</Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography>한번 탈퇴하면 같은 아이디로 재가입할 수 없습니다.</Typography>
                    <Typography>또, 탈퇴 이후 일주일 동안은 다시 회원가입하실 수 없으니 주의해주세요.</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" style ={{width: '40%'}}>탈퇴하기</Button>
                </Grid>
            </Grid>
        </Stack>
    )

}
export default Quit