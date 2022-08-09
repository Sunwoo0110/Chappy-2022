import styles from "../../../styles/lectureDetail/LectureDetail.module.css";
import { AiFillHome, AiFillCheckCircle } from "react-icons/ai";
import { RiBookletFill, RiDraftLine } from "react-icons/ri"
import { BsMegaphoneFill } from "react-icons/bs"

// BsReverseLayoutTextSidebarReverse
// BsCheckCircleFill
// BsMegaphoneFill
// RiDraftLine

export default function Menu({ mode, setMode }) {
    const handleClickEvent = (curMode) => {
        setMode(curMode);
    };

    return(
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
    );
}