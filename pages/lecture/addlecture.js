import {useState } from "react";

import Header from "./components/_header";
import Footer from "./components/_footer";

import styles from "../../styles/lecture/Lecture.module.css";

import LectureAdder from "./components/_addlecture";


export default function AddLecture() {
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.content}>
                    <LectureAdder/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}