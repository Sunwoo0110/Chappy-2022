const styles = {
    rightsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'skyblue',
        rowGap: '5px',
    },
    outputs: {
        display: 'flex',
        flexDirection: 'column',
        background: '#6495ED',
    },
    feedback: {
        display: 'flex',
        flexDirection: 'column',
        background: '#6495ED',
    },
}

function Outputs({ output }) {
    return (
        <div style={styles.outputs}>
            <h3>실행결과</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {output}
            </p>
        </div >
    )
}

function Feedback() {
    return (
        <div style={styles.feedback}>
            <h3>피드백</h3>
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