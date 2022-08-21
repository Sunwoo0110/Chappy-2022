import styles from "../../../styles/assignment/_sidebar.module.css"
import { useSelector, useDispatch } from 'react-redux';

import * as validationActions from "../../../store/modules/validation";

export default function LeftSideBar({ assignment, example }) {

    function Problem(props) {
        return (
            <div className={styles.problem}>
                <div className={styles.section_title}>문제와 제한사항</div>
                
                <div style={{overflowY: "scroll", height:"100%"}}>
                    <div className={styles.section_element}>문제</div>
                    <div className={styles.content}>{props.data.description}</div>
    
                    <div className={styles.section_element}>제한사항</div>
                    <div className={styles.content}>{props.data.constraint}</div>
                    {/* <p>{props.data.example}</p> */}
                </div>
            </div>
        )
    }
    
    function Example(props) {
    
        const dispatch = useDispatch();
        const examples = props.data
    
        return (
            <div className={styles.testcase}>
                <div className={styles.section_title}>테스트케이스</div>
                <div style={{overflowY: "scroll", height:"100%"}}>
                <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                    {examples.map((ex) => {
                        if (!ex.is_open) return
                        return (
                            <li key={examples.indexOf(ex)} style={{listStyle: "none", paddingLeft: "0px"}}>
                                <div className={styles.example_title}>
                                    {`테스트케이스 - ${examples.indexOf(ex)+1}`}
                                    <button type="button" className={styles.val_button}  onClick={() => {
                                        dispatch(validationActions.setVal({num: examples.indexOf(ex), click: true}));
                                    }}>검증</button>
                                </div>
                                <div className={styles.example_content}>
                                    <div className={styles.testcase_content}>
                                        <div style={{padding: "5px"}}>{`Input: `}</div>
                                        <div style={{padding: "5px"}}>{`main({${ex.inputs}})`}</div>
                                    </div>
                                    <div className={styles.testcase_content}>
                                        <div style={{padding: "5px"}}>{`Output: `}</div>
                                        <div style={{padding: "5px"}}>{`main({${ex.expected_output}})`}</div>
                                    </div>
                                    {/* <button style={{marginLeft:"15px"}}type="button" class="btn btn-outline-primary" 
                                    onClick={() => navigator.clipboard.writeText(`main(${ex.inputs})`)}>Copy</button> */}
                                </div>
                            </li>
                        )
                    }
                    )}
                </ul>
                </div>
            </div>
        )
    }

    return (
        // <div style={styles.leftsidebar}>
        <div className={styles.sidebar}>
            <Problem data={assignment} />
            <Example data={example} />
        </div>
    )
}