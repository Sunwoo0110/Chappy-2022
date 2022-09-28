import Editor, { DiffEditor,  useMonaco } from "@monaco-editor/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import styles from "../../../styles/assignment/_codingbox.module.css"

import * as validationActions from "../../../store/modules/validation";

export default function CodingBox({ assignment, onClickCheckPoint }) {
    const editorRef = useRef(null);
    const [submit, setSubmit] = useState(false);

    const baseCode = assignment?.reference_code

    const validation = useSelector((state) => state.validation);

    const [code, setCode] = useState(baseCode);
    const [deco, setDeco] = useState([]);
    const [vars, setVars] = useState({});
    const [viewZoneId, setViewZoneId] = useState("");
    const { editor, monaco } = vars;

    const dispatch = useDispatch();

    function handleEditorValidation(markers) {
        markers.forEach(marker => console.log("onValidate:", marker.message))
    }

    function handleEditorChange(value, event) {
        setCode(value);
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
        // console.log("editor" + editorRef.current);
        // console.log(validation.click)
        setVars({ editor, monaco });
        
    }

    function checkPoint(action) {
        // if (editorRef.current === null) {
        //     console.log(editorRef.current)
        //     return
        // }
        // const code = editorRef.current.getValue()
        onClickCheckPoint(code, action);
        // console.log("action")
    }
    
    function openFile() {
        var input = document.createElement("input");

        input.type = "file";
        input.accept = ".py";
        input.onchange = function (event) {
            processFile(event.target.files[0]);
        };
        input.click();
    }

    function processFile(file) {
        
        var reader = new FileReader();
        
        reader.onload = function () {
            // output.innerText = reader.result;
            console.log(reader.result);
            setCode(reader.result);
        };
        reader.readAsText(file);
    }

    useEffect(() => {
        if (!editor || !monaco) {
            return;
        }
        const deco = editor.deltaDecorations(
            [],
            validation.deco
        );
        setDeco(deco);

        var id = null;

        editor.changeViewZones(function (changeAccessor) {
            var domNode = document.createElement('div');
            domNode.style.background = '#DFFFE2';
            domNode.innerHTML = 'Fix box to be correct:\n' + "<br>" + '&nbsp;&nbsp;&nbsp' + 'elif a == 1 and b == 2 and XXX and (d == 4) and (e == 5):\n' + 
            "<br>" + 'Traces: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 11 -> 13 -> 14';
            domNode.style.fontSize = '12px'

            id = changeAccessor.addZone({
                afterLineNumber: 2,
                heightInLines: 3,
                domNode: domNode
            });

            setViewZoneId(id);
            console.log("add" + id)
            console.log("add" + viewZoneId)

        });

        return () => {
            editor.deltaDecorations(deco, []);
            editor.changeViewZones(function (changeAccessor) {
                // console.log(viewZoneId)
                changeAccessor.removeZone(viewZoneId)
            });
        }
    }, [validation.click]);

    return (
        <div className={styles.codingbox}>
            <div>
                {
                    validation.click === true ? 
                    <div style={{display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "space-between"}}>
                        {checkPoint('hint')}
                        <div className={styles.section_title}>코드 입력</div>
                        <button type="button" style={{backgroundColor: "#FFD600", height: "100%", fontSize: "10px", color: "white", border: "none", marginRight: "10px"}} class="btn btn-warning" 
                        onClick={() => {
                            dispatch(validationActions.setVal({num: 0, click: false}));
                            dispatch(validationActions.setDeco({deco: []}));

                            editor.changeViewZones(function (changeAccessor) {
                                console.log("remove" + viewZoneId)
                                changeAccessor.removeZone(viewZoneId)
                            });
                        }}>힌트 모두 적용</button>
                    </div>
                    : 
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div className={styles.section_title}>코드 입력</div>
                    </div>
                }  
            </div>
            <div className={styles.border}>
                {
                    <Editor
                        language="python"
                        onValidate={handleEditorValidation}
                        onMount={handleEditorDidMount}
                        onChange={handleEditorChange}
                        defaultValue={baseCode}
                        value={code}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            fontSize: 12,
                            glyphMargin: true,
                            contextmenu: false
                        }} />
                } 
            </div>
            <div>
                {
                    submit === false ?
                    <div className={styles.buttons}>
                        <div style={{width: "50%"}}>
                            <button type="button" style={{backgroundColor: "white", border: "none"}} >
                                <img src="/images/file.png" className={styles.image_button} alt="file" onClick={() => {openFile();}}/>
                            </button>
                            <button type="button" style={{backgroundColor: "white", border: "none"}} >
                                <img src="/images/load.png" className={styles.image_button} alt="file" onClick={() => {location.reload();}}/>
                            </button>
                            <button type="button" style={{backgroundColor: "white", border: "none"}} >
                                <img src="/images/copy.png" className={styles.image_button} alt="file" 
                                onClick={() => navigator.clipboard.writeText(code)}/>
                            </button>
                        </div>
                        <div>
                            <button type="button" style={{backgroundColor: "#414E5A", fontSize: "12px"}} class="btn btn-secondary" onClick={() => checkPoint('run')}>실행</button>
                            <button type="button" style={{marginLeft: "5px", backgroundColor: "#414E5A", fontSize: "12px"}} class="btn btn-secondary" onClick={() => checkPoint('test')}>채점</button>
                            <button type="button" style={{marginLeft: "10px", backgroundColor: "#0B51FF", fontSize: "12px"}} class="btn btn-primary" onClick={() => {
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