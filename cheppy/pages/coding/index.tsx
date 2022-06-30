import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import { NextPage } from "next";

const coding: NextPage = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState('')

    const handleEditorChange = (event) => {
        // console.log(event);
        setValue(event)
    }
    
    const showValue = ()  => {
        alert(value)
    }

    const runValue = () => {
        
    }

    const gradeValue = () => {

    }

    return (
    <>
        <button onClick={showValue}>Show value</button>
        <button onClick={runValue}>실행</button>
        <button onClick={gradeValue}>채점</button>
        <Editor
            height="90vh"
            defaultLanguage="python"
            defaultValue="// some comment"
            onChange={handleEditorChange}
        />
    </>
    );
}

export default coding
