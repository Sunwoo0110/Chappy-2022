import { useEffect, useState } from "react";
import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import unitStyles from "../../../styles/lectureDetail/_unit.module.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiBookletFill, RiDraftLine } from "react-icons/ri"

const UnitList = ({ dropdown, setDropdown }) => {
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

    const handleClickEvent = (target) => {
        let idx = dropdown.indexOf(target);

        if(idx==-1){
            let newVal = target;
            setDropdown([newVal, dropdown]);
        }
        else{
            dropdown.splice(idx, 1);
            setDropdown([...dropdown]);
        }
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
                            { dropdown.includes(unit._id)===true &&
                                <div className={unitStyles["unit-item-dropdown"]}>
                                    <div className={unitStyles["unit-item-dropdown-btn"]}>
                                        <RiBookletFill className={unitStyles["unit-item-dropdown-btn-icon"]}/>
                                        <div className={unitStyles["unit-item-dropdown-btn-title"]}>학습</div>
                                    </div>
                                    <div className={unitStyles["unit-item-dropdown-btn"]}>
                                        <AiFillCheckCircle className={unitStyles["unit-item-dropdown-btn-icon"]}/>
                                        <div className={unitStyles["unit-item-dropdown-btn-title"]}>과제</div>
                                    </div>
                                    <div className={unitStyles["unit-item-dropdown-btn"]}>
                                        <RiDraftLine className={unitStyles["unit-item-dropdown-btn-icon"]}/>
                                        <div className={unitStyles["unit-item-dropdown-btn-title"]}>프로그래밍 실습</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function Unit({ dropdown, setDropdown }){
    console.log("export default=====");
    console.log(typeof dropdown);
    console.log(dropdown);
    return (
        <div className={unitStyles.units}>
            <div className={unitStyles.title}>단원별 학습</div>
            <UnitList dropdown={dropdown} setDropdown={setDropdown}/>
        </div>
    );
}
