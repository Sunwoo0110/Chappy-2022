import {useState } from "react";
import Header from "../../../components/_header";
import Footer from "../../../components/_footer";
import styles from "../../../../styles/lecture/Lecture.module.css";
import NoticeAdder from "../../components/_addnotice";

export function getServerSideProps({ params }) {
    return {
      props: {
        params,
      },
    };
}

export default function AddNotice(props) {
    const lecture_id = props.params.id;

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.content}>
                    <NoticeAdder lecture_id={lecture_id}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}