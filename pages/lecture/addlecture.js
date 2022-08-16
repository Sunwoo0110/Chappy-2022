import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr"

import Header from "./components/_header";
import Footer from "./components/_footer";

import styles from "../../styles/lecture/Lecture.module.css";

import LectureAdder from "./components/_addlecture";



export default function AddLecture() {

    const [mode, setMode] = useState(0);

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