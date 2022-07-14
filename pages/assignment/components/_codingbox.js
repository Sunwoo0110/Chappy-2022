import Editor from "@monaco-editor/react";
import { useRef } from "react";

const styles = {
    codingbox: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        flexGrow: 1,
        background: 'white',
        rowGap: '5px',
    },
    border: {
        margin:"auto",
        marginTop:"1%",
        marginBottom:"1%",
        width: '95%',
        height: '90%',
        border: "2px solid #bdbdbd"
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        justifyContent: 'space-between',
        paddingLeft:"2.5%",
        paddingRight:"2.5%"
    },
    btn: {
        marginLeft:"5px",
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
            <div style={styles.border}>
                <Editor
                    language="python"
                    onValidate={handleEditorValidation}
                    onMount={handleEditorDidMount}
                    value={baseCode} />
            </div>
            <div style={styles.buttons}>
                <div>
                    <button type="button" class="btn btn-primary" onClick={() => checkPoint('run')}>실행</button>
                    <button style={styles.btn} type="button" class="btn btn-primary" onClick={() => checkPoint('test')}>채점</button>
                </div>
                <div>
                    <button type="button" class="btn btn-danger" onClick={() => checkPoint('submit')}>제출</button>
                </div>
            </div>
        </div>
    )
}