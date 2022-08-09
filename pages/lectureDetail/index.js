import { useState } from "react";
import Home from "./components/_home";
import Learning from "./components/_learning";
import Notice from "./components/_notice";
import Assignment from "./components/_assignment";
import Exam from "./components/_exam";
import Header from "./components/_header";
import styles from "../../styles/lectureDetail/lectureDetail.module.css";
import { AiFillHome, AiFillCheckCircle } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr"
import { RiBookletFill, RiDraftLine } from "react-icons/ri"
import { BsMegaphoneFill } from "react-icons/bs"
import Footer from "./components/_footer";
// BsReverseLayoutTextSidebarReverse
// BsCheckCircleFill
// BsMegaphoneFill
// RiDraftLine

export default function Index() {
    const [mode, setMode] = useState(0);    
    const handleClickEvent = (curMode) => {
        setMode(curMode);
    };

    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <div className={styles["lecture-info"]}>
                    Helloddd
                </div>

                <div className={styles["content-left"]}>
                    <div className={styles.menus}>
                        <button className={mode==0 ? styles["btn-selected"] : styles["btn-basic"]} onClick={() => handleClickEvent(0)}>
                            <AiFillHome/>  
                            홈
                        </button>
                        <button className={mode==1 ? styles["btn-selected"] : styles["btn-basic"]} onClick={() => handleClickEvent(1)}>
                            <BsMegaphoneFill/>
                            공지
                        </button>
                        <button className={mode==2 ? styles["btn-selected"] : styles["btn-basic"]} onClick={() => handleClickEvent(2)}>
                            <RiBookletFill/>
                            학습
                        </button>
                        <button className={mode==3 ? styles["btn-selected"] : styles["btn-basic"]} onClick={() => handleClickEvent(3)}>
                            <AiFillCheckCircle/>
                            과제
                        </button>
                        <button className={mode==4 ? styles["btn-selected"] : styles["btn-basic"]} onClick={() => handleClickEvent(4)}>
                            <RiDraftLine/>
                            시험
                        </button>
                    </div>

                    <div>
                        {
                            mode == 0 ?
                            <>
                            <Home/>
                            </>
                            : mode === 1 ?
                            <>
                            <Notice/>
                            </>
                            : mode === 2 ?
                            <>
                            <Learning/>
                            </>
                            : mode === 3 ?
                            <>
                            <Assignment/>
                            </>
                                :
                                <>
                                <Exam/>
                                </>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
