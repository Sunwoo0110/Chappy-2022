import styles from "../../../styles/mypage/_main.module.css";

export default function Title({mode}) {
    return (
        <div className={styles.title_bg}>
            {
                mode === 1 ?
                <>
                <div className={styles.title}>마이페이지</div>
                <div className={styles.title_exp}>나의 학습정보를 확인하세요</div>
                </>
                : mode === 2 ?
                <>
                <div className={styles.title} style={{color:"blue"}}>내 성적관리</div>
                <div className={styles.title_exp}>내 성적 통계를 모아보세요</div>
                </>
                : mode === 3 ?
                <>
                <div className={styles.title} style={{color:"blue"}}>나의 피드백</div>
                <div className={styles.title_exp}>내 성적 통계를 모아보세요</div>
                </>
                : mode === 4 ?
                <>
                <div className={styles.title} style={{color:"blue"}}>내 과제관리</div>
                <div className={styles.title_exp}>내 과제와 이의신청 내역을 관리하세요</div>
                </>
                : mode === 5 ?
                <>
                <div className={styles.title}>계정관리</div>
                <div className={styles.title_exp}>나의 계정정보를 관리하고 수정하세요</div>
                </>
                :
                <div className={styles.title}>미완</div>
            }
        </div>
    )
}