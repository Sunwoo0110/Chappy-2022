import { CardText } from "react-bootstrap-icons";

import styles from "../../../styles/lecture/_deadline.module.css";


function Deadlines() {
    return (
        <div className={styles.deadline_bg}>
            <div className={styles.deadline}>
                <div className={styles.deadline_icon}><CardText size={50}/></div>
                <div className={styles.deadline_exp}>
                    <div className={styles.deadline_date_red}>10/26 11:59 PM</div>
                    <div className={styles.deadline_task}>Red-Black tree</div>
                </div>
            </div>
            <div className={styles.deadline}>
                <div className={styles.deadline_icon}><CardText size={50}/></div>
                <div className={styles.deadline_exp}>
                    <div className={styles.deadline_date}>10/26 11:59 PM</div>
                    <div className={styles.deadline_task}>Red-Black tree</div>
                </div>
            </div>
        </div>
    )
}

export default function Deadline() {
    return (
        <div style={{width:"100%"}}>
            <div className={styles.title}>데드라인</div>
            <Deadlines/>
            <div className={styles.moving_page_bg}>
                <div className={styles.moving_page}>캘린더로 보기</div>
            </div>
        </div>
    )
}