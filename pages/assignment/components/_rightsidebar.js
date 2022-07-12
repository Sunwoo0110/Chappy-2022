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
        height: '50%',
    },
    feedback: {
        display: 'flex',
        flexDirection: 'column',
        background: "white",
        height: '50%',
    },
    section_title:{
        background: "#414E5A",
        color: "white",
    }
}

function Outputs({ output }) {
    return (
        <div style={styles.outputs}>
            <h3 style={styles.section_title}>실행결과</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {output}
            </p>
        </div >
    )
}

function Feedback() {
    return (
        <div style={styles.feedback}>
            <h3 style={styles.section_title}>피드백</h3>
        </div>
    )
}

export default function RightSideBar({ output }) {
    return (
        <div style={styles.rightsidebar}>
            <Outputs output={output} />
            <Feedback />
        </div>
    )
}