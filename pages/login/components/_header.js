import Link from "next/link";

import commonStyles from "../../../styles/login/Login.module.css"
import headerStyles from "../../../styles/login/_header.module.css"
import { IoIosArrowBack } from "react-icons/io";

export default function Header() {
    return (
        <div className={commonStyles.header}>
            <Link href="/">
            <div className={headerStyles["back-txt"]}>
                <IoIosArrowBack size="35px"/>
                메인으로 돌아가기
            </div>
            </Link>
            <div className={headerStyles["login-txt"]}>로그인</div>
            <div className={headerStyles["login-desc-txt"]}>로그인하고 당신의 코딩 생활을 시작하세요</div>
        </div>
    )
}