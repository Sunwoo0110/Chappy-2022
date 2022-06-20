import React, { useRef } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import { NextPage } from "next";

const coding: NextPage = () => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor; 
    }
    
    const showValue = ()  => {
        if (null !== editorRef.current) {
            alert(editorRef.current.getValue());
            // console.log(editorRef.current.getValue())
        }
    }

    return (
    <>
        <button onClick={showValue}>Show value</button>
        <Editor
            height="90vh"
            defaultLanguage="python"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
        />
    </>
    );
}

export default coding
