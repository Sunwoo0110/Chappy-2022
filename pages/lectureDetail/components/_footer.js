import Link from "next/link";
import styles from "../../../styles/lectureDetail/lectureDetail.module.css";
import {Envelope, Instagram, TelephoneFill} from 'react-bootstrap-icons';

export default function Footer() {
    return(
        <footer className="bg-light text-muted ">
            <div className={styles.footer}>
                <div className={styles.footer_1}>서비스 이용약관</div>
                <div className={styles.footer_1}>개인정보 처리방침</div>
                <div className={styles.footer_1}>cheppy 전체 공지</div>
                <div className={styles.footer_1}>문의하기</div>
                <div className={styles.footer_1}></div>
                <div className={styles.footer_icon}>
                <TelephoneFill color="gray" size={25}/>
                <Envelope color="gray" size={25}/>
                <Instagram color="gray" size={25}/>
                </div>
            </div>
            <div className={styles.footer_contact}>
                <div className="fw-bold">Cheppy</div>
                <div>
                <div>(주)채피 | 대표 홍길동 | 경기도 수원시 장안구 서부로 2066 반도체관</div>
                <div>010-1234-5678 | contactus@email.com</div>
                </div>
            </div>
        </footer>
    )
}