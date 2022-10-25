import Editor from "@monaco-editor/react";
import React, { useRef, useState } from "react";

import styles from "../../../styles/assignment/_codingbox.module.css"

export default function CodingBox({ assignment, onInteract }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    onInteract('init', editorRef.current.getValue());
  }
  const handleContentChange = (value, event) => {
    onInteract(null, value);
  }

  function openFile() {
    var input = document.createElement("input");

    input.type = "file";
    input.accept = ".py";
    input.onchange = function (event) {
      processFile(event.target.files[0]);
      event.target.value = "";
    };
    input.click();
}

  function processFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
        // console.log(reader.result);
        editorRef.current.setValue(reader.result);
    };
    reader.readAsText(file);
  }
  
  function interaction (action) {
    onInteract(action, editorRef.current.getValue());
  }

  return (
    <div className={styles.codingbox}>
      <div className={styles.border}>
        <Editor
          language="python"
          onMount={handleEditorDidMount}
          onChange={handleContentChange}
          defaultValue={assignment?.reference_code}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 12,
            glyphMargin: true,
            contextmenu: false
          }} />
      </div>
      <div className={styles.buttons}>
        <div style={{ width: "50%" }}>
          <button type="button" style={{ backgroundColor: "white", border: "none" }}>
            <img src="/images/file.png" className={styles.image_button} alt="file"
            onClick={() => { openFile(); }} />
          </button>
          <button type="button" style={{ backgroundColor: "white", border: "none" }} >
            <img src="/images/copy.png" className={styles.image_button} alt="file" 
              onClick={() => navigator.clipboard.writeText(editorRef.current.getValue())} />
          </button>
        </div>
        <div>
          <button type="button"
            className="btn btn-secondary"
            style={{ backgroundColor: "#414E5A", fontSize: "12px" }}
            onClick={() => interaction('runCode')}>
            실행</button>
          <button type="button"
            className="btn btn-secondary"
            style={{ marginLeft: "5px", backgroundColor: "#414E5A", fontSize: "12px" }}
            onClick={() => interaction('runTestSuite')}>
            채점</button>
          <button type="button"
            className="btn btn-primary"
            style={{ marginLeft: "10px", backgroundColor: "#0B51FF", fontSize: "12px" }}
            onClick={() => interaction('submit')}>
            제출</button>
        </div>
      </div>
    </div>
  )
}