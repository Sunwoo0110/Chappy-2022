import Editor from "@monaco-editor/react";
import { useRef } from "react";

const styles = {
    codingbox: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // height: '95%',
        flexGrow: 1,
        background: '#F0F8FF',
        rowGap: '5px',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        columnGap: '5px',
        justifyContent: 'space-between',
    },
}

export default function CodingBox({ assignment, onClickCheckPoint }) {
    const editorRef = useRef(null)

    const baseCode = assignment?.reference_code
    console.log(assignment);
    console.log(baseCode);
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
        <div style={styles.codingbox}>
            <Editor
                language="python"
                onValidate={handleEditorValidation}
                onMount={handleEditorDidMount}
                value={baseCode} />

            <div style={styles.buttons}>
                <div>
                    <button onClick={() => checkPoint('run')}>실행</button>
                    <button onClick={() => checkPoint('test')}>채점</button>
                </div>
                <div>
                    <button onClick={() => checkPoint('submit')}>제출</button>
                </div>
            </div>
        </div>
    )
}