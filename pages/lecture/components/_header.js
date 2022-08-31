import Link from "next/link";

import styles from "../../../styles/lecture/Lecture.module.css";
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
                <div className={styles.navbar_menu}>수업검색하기</div>
            </div>
            <div className={styles.navbar_right}>
                <button style={{fontSize:"small", fontWeight: "bold", borderRadius:10}} type="button" class="btn btn-outline-primary">로그아웃</button>
                <PersonCircle color="blue" size={30}/>
            </div>
        </nav>
    )
}