import { useState } from "react";
import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import unitStyles from "../../../styles/lectureDetail/_unit.module.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiFillHome, AiFillCheckCircle } from "react-icons/ai";
import { RiBookletFill, RiDraftLine } from "react-icons/ri"
import { BsMegaphoneFill } from "react-icons/bs"

const UnitList = () => {
    //unit DB schema 정의

    const unitData = [
        {
            _id: 1,
            title: "recursion",
        },
        {
            _id: 2,
            title: "graph",
        },
        {
            _id: 3,
            title: "dfs",
        },
    ];    

    const [pick, setPick] = useState([]);

    const handleClickEvent = (target) => {
        let idx = pick.indexOf(target);
        if(idx==-1)
        pick.push(target);
        else
        pick.splice(idx, 1);
        setPick(pick);
        console.log(pick.includes(target));
        console.log(pick);
    };

    return (
        <div className={unitStyles.units}>
            {unitData.map((unit) => {
                return (
                    <div key={unit._id} className={unitStyles["unit-item"]}>
                        <button className={unitStyles["unit-item-btn"]} onClick={() => handleClickEvent(unit._id)}>
                            {unit.title}
                            <TiArrowSortedDown />
                        </button>
                        <div>
                            { pick.includes(unit._id)===true &&
                                (<div className={unitStyles["unit-item-dropdown"]}>
                                    <button className={unitStyles["unit-item-dropdown-btn"]}>
                                        <RiBookletFill color="#0B51FF" size="30px" />
                                        학습
                                    </button>
                                    <button className={unitStyles["unit-item-dropdown-btn"]}>
                                        <AiFillCheckCircle color="#0B51FF" size="30px" />
                                        과제
                                    </button>
                                    <button className={unitStyles["unit-item-dropdown-btn"]}>
                                        <RiDraftLine color="#0B51FF" size="30px" />
                                        프로그래밍 실습
                                    </button>
                                </div>)
                            }
                        </div>
                    </div>
                );
            })}

            {/* <button className={unitStyles["unit-item"]} onClick={() => handleClickEvent()}>
                recursion
                <TiArrowSortedDown/>
            </button>
            <button className={unitStyles["unit-item"]}>
                recursion
                <TiArrowSortedDown/>
            </button> */}
        </div>
    );
}

export default function Unit(){
    return (
        <div className={unitStyles.units}>
            <div className={unitStyles.title}>단원별 학습</div>
            <UnitList/>
        </div>
    );
}
