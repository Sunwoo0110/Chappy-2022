import styles from "../../../styles/assignment/_sidebar.module.css"
import { useSelector, useDispatch } from 'react-redux';
import useSWR, { useSWRConfig } from "swr"

import * as validationActions from "../../../store/modules/validation";


const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

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
        const { data, error } = useSWR(`/api/assignment/testcases?assignmentId=${assignment._id}`, fetcher);
        if (error) return <div>Getting TestSuite Failed</div>
        if (!data) return <div>Loading...</div>
        if (data.data[0]==undefined) return <div>TestSuite Not Existing</div>
        const examples = data.data;
    
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
                                        console.log(`TC#${examples.indexOf(ex)} selected`);
                                        dispatch(validationActions.setVal({num: examples.indexOf(ex), click: true}));
                                        /* dispatch(validationActions.setDeco({deco: [
                                            {
                                                range: new monaco.Range(2, 1, 2, 1),
                                                options: {
                                                    isWholeLine: true,
                                                    className: "_codingbox_lineDeco__mFjG5",
                                                    glyphMarginClassName: "_codingbox_glyphDeco__5Hk3V"
                                                    // DOM 으로 css 검색해보기

                                                }
                                            }
                                        ]})) */
                                    }}>검증</button>
                                    <button className={styles.val_button}></button>
                                    {/* <button className={styles.val_button} type="button"
                                    onClick={() => navigator.clipboard.writeText(`main(${ex.input})`)}>Copy</button> */}
                                </div>
                                <div className={styles.example_content}>
                                    <div className={styles.testcase_content}>
                                        <div style={{padding: "5px"}}>{`Input: `}</div>
                                        <div style={{padding: "5px"}}>{`${ex.input}`}</div>
                                    </div>
                                    <div className={styles.testcase_content}>
                                        <div style={{padding: "5px"}}>{`Output: `}</div>
                                        <div style={{padding: "5px"}}>{`${ex.output}`}</div>
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