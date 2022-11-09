import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../styles/mypage/MyPage.module.css";

import Header from "../components/_header";
import Footer from "../components/_footer";
import LeftSideBar from "./components/_leftsidebar";
import MyPage from "./components/_mypage";

export default function Index() {
    // 마이페이지
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={1}/>
                </div>
                <div className={styles.content}>
                    <MyPage/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}