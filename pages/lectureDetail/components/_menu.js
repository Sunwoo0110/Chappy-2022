import menuStyles from "../../../styles/lectureDetail/_menu.module.css";
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
        <div className={menuStyles.menus}>
            <button className={mode==0 ? menuStyles["btn-selected"] : menuStyles["btn-basic"]} onClick={() => handleClickEvent(0)}>
                <AiFillHome/>  
                홈
            </button>
            <button className={mode==1 ? menuStyles["btn-selected"] : menuStyles["btn-basic"]} onClick={() => handleClickEvent(1)}>
                <BsMegaphoneFill/>
                공지
            </button>
            <button className={mode==2 ? menuStyles["btn-selected"] : menuStyles["btn-basic"]} onClick={() => handleClickEvent(2)}>
                <RiBookletFill/>
                학습
            </button>
            <button className={mode==3 ? menuStyles["btn-selected"] : menuStyles["btn-basic"]} onClick={() => handleClickEvent(3)}>
                <AiFillCheckCircle/>
                과제
            </button>
            <button className={mode==4 ? menuStyles["btn-selected"] : menuStyles["btn-basic"]} onClick={() => handleClickEvent(4)}>
                <RiDraftLine/>
                시험
            </button>
        </div>
    );
}