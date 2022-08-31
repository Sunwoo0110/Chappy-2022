import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../../styles/mypage/MyPage.module.css";

import Header from "../components/_header";
import LeftSideBar from "../components/_leftsidebar";
import Feedback from "../components/_myfeedback";
import Footer from "../components/_footer";


export default function MyFeedBack() {
    // 나의 피드백
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={3}/>
                </div>
                <div className={styles.content}>
                    <Feedback/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}