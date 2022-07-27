function MyList(props) {

    var lectures = props.lectures;
    // var lectures = [{"name": "sdf", "professor": "Sdf", "classnumber": "ff", "open": "1"}]

    return (
        <div>
            <ul>
                {lectures.map((le) => {
                    return (
                        <li key={lectures.indexOf(le)}>
                            <div>
                                <h4>{`${le.name}`}</h4>
                                <h4>{`${le.professor}`}</h4>
                                <h4>{`${le.classnumber}`}</h4>
                                <h4>{`${le.open}`}</h4>
                            </div>
                        </li>
                    )}
                )}
            </ul>
        </div>
        
    )
}

export default function LectureList(props) {
    return (
        <div>
            <h3>강의 목록</h3>
            <MyList lectures={props.lectures}/>
        </div>
    )
}