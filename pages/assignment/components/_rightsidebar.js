const styles = {
    rightsidebar: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'skyblue',
        rowGap: '5px',
    },
    results: {
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

function Results({ result }) {
    return (
        <div style={styles.results}>
            <h3>실행결과</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {result}
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

export default function RightSideBar({ result }) {
    return (
        <div style={styles.rightsidebar}>
            <Outputs result={result} />
            <Feedback />
        </div>
    )
}