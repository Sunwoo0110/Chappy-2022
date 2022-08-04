import { useState } from "react";
import Home from "./components/_home";
import Learning from "./components/_learning";
import Notice from "./components/_notice";
import Assignment from "./components/_assignment";
import Exam from "./components/_exam";

export default function Index() {
    const [mode, setMode] = useState(0);    
    const handleClickEvent = (curMode) => {
        setMode(curMode);
    };

    return(
        <div>
            <div>
                <button onClick={() => handleClickEvent(0)}>
                    홈
                </button>
                <button onClick={() => handleClickEvent(1)}>
                    공지                    
                </button>
                <button onClick={() => handleClickEvent(2)}>
                    학습
                </button>
                <button onClick={() => handleClickEvent(3)}>
                    과제
                </button>
                <button onClick={() => handleClickEvent(4)}>
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
    );
}
