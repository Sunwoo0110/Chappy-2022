import {useState } from "react";

import Header from "./components/_header";
import Footer from "./components/_footer";

import styles from "../../styles/lecture/Lecture.module.css";

import LectureSearcher from "./components/_searchlecture";


export default function SearchLecture() {
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.content}>
                    <LectureSearcher/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}