import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../../styles/_codingbox.module.css"

export default function CodingBox({ assignment, onClickCheckPoint }) {
    const editorRef = useRef(null)

    const baseCode = assignment?.reference_code
    // console.log(assignment);
    // console.log(baseCode);

    const validation = useSelector((state) => state.validation);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor
    }

    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log("onValidate:", marker.message))
    }

    function checkPoint(action) {
        if (editorRef.current === null) return
        const code = editorRef.current.getValue()
        onClickCheckPoint(code, action)
    }

    return (
        <div className={styles.codingbox}>
            <div style={{flexDirection: "row"}}>
                <div className={styles.section_title}>코드 입력</div>
                {
                    validation.click === true ?
                    <div>
                        <button type="button" class="btn btn-primary" onClick={() => checkPoint('hintAll')}>힌트 모두 적용</button>
                    </div>   
                    : null   
                }   
            </div>
            <div className={styles.border}>
                <Editor
                    language="python"
                    onValidate={handleEditorValidation}
                    onMount={handleEditorDidMount}
                    value={baseCode} />
            </div>
            <div className={styles.buttons}>
                <div>
                    <button type="button" class="btn btn-primary" onClick={() => checkPoint('run')}>실행</button>
                    <button style={{marginLeft: "5px"}} type="button" class="btn btn-primary" onClick={() => checkPoint('test')}>채점</button>
                </div>
                <div>
                    <button type="button" class="btn btn-danger" onClick={() => checkPoint('submit')}>제출</button>
                </div>
            </div>
        </div>
    )
}