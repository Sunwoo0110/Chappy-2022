import { useCallback, useEffect, useState } from "react";
import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import unitStyles from "../../../styles/lectureDetail/_unit.module.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiBookletFill, RiDraftLine } from "react-icons/ri"
import { useSelector, useDispatch } from 'react-redux';
import axios from "../../../lib/api";
import * as weekActions from "../../../store/modules/week"

const fetcher = async (url, queryParams='') => {
    if (typeof url != 'string')
        return { data: [] }
    return await axios.get(url, {params: queryParams})
        .then((res) => {
            return res.data
        })
}

const UnitList = ({ lecture_id, mode, setMode, dropdown, setDropdown }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const user_id = user.id;

    const selectedWeek = useSelector(state => state.week);
    const learningWeek = selectedWeek.learning;
    const assignmentWeek = selectedWeek.assignment;
    const setLearningWeek = useCallback( (week) => {
        let payload = {
            learning: week,
        };
        dispatch(weekActions.setLearning(payload));
    }, [dispatch]);
    const setAssignmentWeek = useCallback( (week) => {
        let payload = {
            assignment: week,
        };
        dispatch(weekActions.setAssignment(payload));
    }, [dispatch]);

    const paramData = {
        lecture_id: lecture_id,
    };
    const { data, error } = useSWR([`/api/aggregation/lectureDetail/unit`, paramData], fetcher);

    if (error) return <div>Getting Units Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data.unit_id.length==0) return <div>공개된 주차가 없습니다.</div>

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

    const handleLearningClickEvent = (target) => {
        setMode(2);
        setLearningWeek(target);
        window.scrollTo({top:0, left:0, behavior:'auto'});
    }

    const handleAssignemntClickEvent = (target) => {
        setMode(3);
        setAssignmentWeek(target);
        window.scrollTo({top:0, left:0, behavior:'auto'});
    }

    return (
        <div className={unitStyles.units}>
            {data.data.unit_id.map((unit) => {
                return (
                    <div key={unit} className={unitStyles["unit-item"]}>
                        <button className={unitStyles["unit-item-btn"]} onClick={() => handleClickEvent(unit)}>
                            {unit}주차
                            <TiArrowSortedDown />
                        </button>
                        <div>
                            { dropdown.includes(unit)===true &&
                                <div className={unitStyles["unit-item-dropdown"]}>
                                    <div className={unitStyles["unit-item-dropdown-btn"]} onClick={() => handleLearningClickEvent(unit)}>
                                        <RiBookletFill className={unitStyles["unit-item-dropdown-btn-icon"]}/>
                                        <div className={unitStyles["unit-item-dropdown-btn-title"]}>학습</div>
                                    </div>
                                    <div className={unitStyles["unit-item-dropdown-btn"]} onClick={() => handleAssignemntClickEvent(unit)}>
                                        <AiFillCheckCircle className={unitStyles["unit-item-dropdown-btn-icon"]}/>
                                        <div className={unitStyles["unit-item-dropdown-btn-title"]}>과제</div>
                                    </div>
                                    {/* <div className={unitStyles["unit-item-dropdown-btn"]}>
                                        <RiDraftLine className={unitStyles["unit-item-dropdown-btn-icon"]}/>
                                        <div className={unitStyles["unit-item-dropdown-btn-title"]}>프로그래밍 실습</div>
                                    </div> */}
                                </div>
                            }
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function Unit({ lecture_id, mode, setMode, dropdown, setDropdown }){
    return (
        <div className={unitStyles.units}>
            <div className={unitStyles.title}>주차별 학습</div>
            <UnitList lecture_id={lecture_id} mode={mode} setMode={setMode} dropdown={dropdown} setDropdown={setDropdown}/>
        </div>
    );
}
