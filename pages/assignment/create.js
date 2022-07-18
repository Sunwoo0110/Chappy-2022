import Link from "next/link"
import { useRouter } from "next/router"

import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";

const NavBar = () => {
    return <nav style={{ width: '100%', height: '10%' }}>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/assignment">
            <a>Assignments</a>
        </Link>
        <h1>Create New Assignment</h1>
    </nav>
}

export default function CreateAssignment() {
    const editorRef1 = useRef(null)
    const editorRef2 = useRef(null)
    function handleEditorDidMount1(editor, monaco) {
        editorRef1.current = editor
    }
    function handleEditorDidMount2(editor, monaco) {
        editorRef2.current = editor
    }

    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log("onValidate:", marker.message))

    }

    const router = useRouter()

    async function onSave(event) {
        event.preventDefault()
        let assignment = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            example: document.getElementById('example').value,
            constraint: document.getElementById('constraint').value,
            base_code: editorRef1.current.getValue(),
            reference_code: editorRef2.current.getValue(),
        }
        await fetch('/api/assignment', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(assignment)
        })
        router.push('/assignment')
    }

    return (
        <div>
            <NavBar />
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">title</span>
                <input type="text" class="form-control" id="title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">description</span>
                <input type="text" class="form-control" id="description" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">example</span>
                <input type="text" class="form-control" id="example" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">constraint</span>
                <input type="text" class="form-control" id="constraint" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>
            
            <div style={{width: "90vw", height: "20vh"}}>
                <Editor language="python" onValidate={handleEditorValidation}
                    onMount={handleEditorDidMount1} value={"#write base code"} />
            </div>
            <div style={{width: "90vw", height: "20vh"}}>
                <Editor language="python" onValidate={handleEditorValidation}
                    onMount={handleEditorDidMount2} value={"#write reference code"} />
            </div>

            <button onClick={onSave}>저장</button>
        </div>
    )
}