import Link from "next/link";
import styles from "../../../styles/mypage/_sidebar.module.css"

function Menu({ mode }) {
    return (
        <div className={styles.sidebar}>
        {
            mode === 1 ?
            <Link href="/mypage">
                <div className={styles.menu} style={{color:"#0B51FF"}}>마이페이지</div>
            </Link>
            :
            <Link href="/mypage">
                <div className={styles.menu}>마이페이지</div>
            </Link>
        }
        {
            mode === 2 ?
            <Link href="/mypage/mygrade">
                <div className={styles.menu} style={{color:"#0B51FF"}}>내 성적 관리</div>
            </Link>
            :
            <Link href="/mypage/mygrade">
                <div className={styles.menu}>내 성적 관리</div>
            </Link>
        }
        {
            mode === 3 ?
            <Link href="/mypage/myfeedback">
                <div className={styles.menu} style={{color:"#0B51FF"}}>나의 피드백</div>
            </Link>
            :
            <Link href="/mypage/myfeedback">
                <div className={styles.menu}>나의 피드백</div>
            </Link>
        }
        {
            mode === 4 ?
            <Link href="/mypage/myassignment">
                <div className={styles.menu} style={{color:"#0B51FF"}}>내 과제관리</div>
            </Link>
            :
            <Link href="/mypage/myassignment">
                <div className={styles.menu}>내 과제관리</div>
            </Link>
        }
        {
            mode === 5 ?
            <Link href="/mypage/myaccount">  
                <div className={styles.menu} style={{color:"#0B51FF"}}>계정관리</div>
            </Link>
            :
            <Link href="/mypage/myaccount">  
                <div className={styles.menu}>계정관리</div>
            </Link>
        }
        <Link href="/mypage">
            <div className={styles.menu}>환경설정</div>
        </Link>
        <Link href="/mypage">
            <div className={styles.menu}>문의하기</div>
        </Link>
        </div>
    )
}


export default function LeftSideBar({ mode }) {
    return (
        <Menu mode={mode}/>
    )
}