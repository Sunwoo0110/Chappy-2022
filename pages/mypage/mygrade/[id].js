import { useState } from "react";
import useSWR, { useSWRConfig } from "swr"

import styles from "../../../styles/mypage/MyPage.module.css";

import Header from "../../components/_header";
import Footer from "../../components/_footer";
import LeftSideBar from "../components/_leftsidebar";
import MyGrade from "../components/_lecturemygrade";

export function getServerSideProps({ params }) {
    return {
      props: {
        params,
      },
    };
}

export default function Mygrade(props) {
    // 내 성적 관리
    const lecture_id = props.params.id;
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={2}/>
                </div>
                <div className={styles.content}>
                    <MyGrade lecture_id={lecture_id}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}