import Link from "next/link";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../styles/mypage/MyPage.module.css";

import Header from "../components/_header";
import Footer from "../components/_footer";
import LeftSideBar from "./components/_leftsidebar";
import MyAssignment from "./components/_myassignment";

export default function Myassignment() {
    // 내 과제관리
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={4}/>
                </div>
                <div className={styles.content}>
                    <MyAssignment/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}