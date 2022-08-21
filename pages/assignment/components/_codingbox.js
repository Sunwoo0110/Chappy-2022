import Editor, { DiffEditor,  useMonaco } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../../styles/assignment/_codingbox.module.css"

import * as validationActions from "../../../store/modules/validation";

export default function CodingBox({ assignment, onClickCheckPoint }) {
    const editorRef = useRef(null)
    const [submit, setSubmit] = useState(false);

    const baseCode = assignment?.reference_code
    // console.log(assignment);
    // console.log(baseCode);

    const validation = useSelector((state) => state.validation);
    const [code, setCode] = useState();

    const dispatch = useDispatch();

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
    }

    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log("onValidate:", marker.message))
    }

    function handleEditorChange(value, event) {
        setCode(value);
    }

    function checkPoint(action) {
        if (editorRef.current === null) return
        // const code = editorRef.current.getValue()
        const code = editorRef.current.getValue();
        onClickCheckPoint(code, action)
    }

    return (
        <div className={styles.codingbox}>
            <div style={{flexDirection: "row"}}>
                <div className={styles.section_title}>코드 입력</div>
                {
                    validation.click === true ? 
                    <div>
                        <button type="button" class="btn btn-warning" onClick={() => {
                            // checkPoint('hintAll')
                            dispatch(validationActions.setVal({num: 0, click: false}));
                        }}>힌트 모두 적용</button>
                        {checkPoint('hint')}
                    </div>    
                    : null   
                }  
            </div>
            <div className={styles.border}>
                {
                    validation.click === true ?
                    <DiffEditor
                        original={baseCode}
                        modified={code}
                        language="python"
                        options={{
                            enableSplitViewResizing: false,
                            renderSideBySide: false
                        }}/>
                    :
                    <Editor
                        language="python"
                        onValidate={handleEditorValidation}
                        onMount={handleEditorDidMount}
                        onChange={handleEditorChange}
                        value={baseCode}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            fontSize: 12,

                        }} />
                } 
            </div>
            <div>
                {
                    submit === false ?
                    <div className={styles.buttons}>
                        <div>
                            <button type="button" style={{backgroundColor: "#414E5A"}} class="btn btn-secondary" onClick={() => checkPoint('run')}>실행</button>
                            <button style={{marginLeft: "5px", backgroundColor: "#414E5A"}} type="button" class="btn btn-secondary" onClick={() => checkPoint('test')}>채점</button>
                        </div>
                        <div>
                            <button type="button" style={{backgroundColor: "#0B51FF"}} class="btn btn-danger" onClick={() => {
                                checkPoint('submit')
                                setSubmit(true);
                            }}>제출</button>
                        </div>
                    </div>
                    : null
                }
                
            </div>
        </div>
    )
}