import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../../styles/mypage/MyPage.module.css";

import Header from "../components/_header";
import Footer from "../components/_footer";
import LeftSideBar from "../components/_leftsidebar";
import MyGrade from "../components/_lecturemygrade";

export default function Mygrade() {
    // 내 성적 관리
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={2}/>
                </div>
                <div className={styles.content}>
                    <MyGrade/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}