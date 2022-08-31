import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../styles/mypage/MyPage.module.css";

import Header from "../components/_header";
import Footer from "../components/_footer";
import LeftSideBar from "./components/_leftsidebar";
import MyAccount from "./components/_myaccount";

export default function Myassignment() {
    // 계정관리
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={5}/>
                </div>
                <div className={styles.content}>
                    <MyAccount/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}