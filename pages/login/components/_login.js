import commonStyles from "../../../styles/login/Login.module.css"
import loginStyles from "../../../styles/login/_login.module.css"

export default function Login() {
    return (
        <div className={commonStyles.main}>
            <div className={loginStyles["input-content"]}>
                <div className={loginStyles.statement}>ID</div>
                <input className={loginStyles.input}></input>
                <div className={loginStyles.statement}>비밀번호</div>
                <input className={loginStyles.input}></input>
                <div className={loginStyles["pwd-find-txt"]}>비밀번호를 잊어버렸나요?</div>
            </div>
            <div className={loginStyles["login-btn"]}>로그인</div>
            <div className={loginStyles["join-content"]}>
                <div className={loginStyles.desc}>아직 회원이 아니신가요?</div>
                <div className={loginStyles["join-txt"]}>회원가입하기</div>
            </div>
        </div>
    );
}
