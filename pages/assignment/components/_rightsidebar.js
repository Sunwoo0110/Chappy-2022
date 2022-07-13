const styles = {
    rightsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'white',
        rowGap: '10px',
    },
    outputs: {
        display: 'flex',
        flexDirection: 'column',
        background: "white",
        height: '100%',
    },
    feedback: {
        display: 'flex',
        flexDirection: 'column',
        background: "white",
        height: '50%',
    },
    section_title:{
        color: "white",
        backgroundColor: "#414E5A",
        padding: "10px",
        fontFamily: "Arial",
        fontSize:"15px",
        fontWeight: "bold"
    },
}

function Outputs({ output }) {
    return (
        <div style={styles.outputs}>
            <div style={styles.section_title}>실행결과</div>
            <div style={{overflowY: "scroll", height:"100%"}}>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {output}
            </p>
            </div>
        </div >
    )
}

function Result() {
    return (
        <div style={styles.feedback}>
            <h3 style={styles.section_title}>채점결과</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}
function Hint() {
    return (
        <div style={styles.feedback}>
            <h3 style={styles.section_title}>힌트</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}
function Grade() {
    return (
        <div style={styles.feedback}>
            <h3 style={styles.section_title}>성적</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}
function Solutions() {
    return (
        <div style={styles.feedback}>
            <h3 style={styles.section_title}>해결방안</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}
function CompareAnswer() {
    return (
        <div style={styles.feedback}>
            <h3 style={styles.section_title}>답안비교</h3>
            <div style={{overflowY: "scroll", height:"100%"}}></div>
        </div>
    )
}

/* mode: 0 채점 */
/* mode: 1 실행 */
/* mode: 2 제출 */
export default function RightSideBar({ mode, output }) {
    return (
        <div style={styles.rightsidebar}>
            {
                mode === 0 ?
                <>
                <Result />
                <Hint/>
                </>
                : mode === 1 ?
                <Outputs output={output} />
                    :
                    <>
                    <Grade/>
                    <Solutions/>     
                    <CompareAnswer/> 
                    </>
            }            
        </div>
    )
}