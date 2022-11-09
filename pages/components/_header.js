import Link from "next/link";

import styles from "../../styles/components/_header.module.css";
import {HouseDoorFill, PersonCircle} from 'react-bootstrap-icons';

export default function Header() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_left}>
                <Link href="/">
                    <HouseDoorFill color="blue" size={30}/>
                </Link>
            </div>
            <div className={styles.navbar_center}>
                <Link href="/lecture">
                    <div className={styles.navbar_menu}>강의목록</div>
                </Link>
                <Link href="/mypage/myfeedback">
                <div className={styles.navbar_menu}>나의 피드백</div>
                </Link>
                <Link href="/lecture/searchlecture">
                <div className={styles.navbar_menu}>수업검색하기</div>
                </Link>
            </div>
            <div className={styles.navbar_right}>
                <PersonCircle style={{cursor:"pointer"}} color="blue" size={30} data-bs-toggle="dropdown" aria-expanded="false"/>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">로그아웃</a></li>
                    <li><a class="dropdown-item" href="/mypage">마이페이지</a></li>
                    <li><a class="dropdown-item" href="/mypage">환경설정</a></li>
                </ul>
            </div>
        </nav>
    )
}