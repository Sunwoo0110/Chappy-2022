
import styles from "../../../styles/mypage/MyPage.module.css";

import Header from "../../components/_header";
import LeftSideBar from "../components/_leftsidebar";
import Feedback from "../components/_lecturemyfeedback";
import Footer from "../../components/_footer";

export function getServerSideProps({ params }) {
    return {
      props: {
        params,
      },
    };
}

export default function LectureMyFeedBack(props) {
    const lecture_id = props.params.id;
    // 나의 피드백
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.main}>
                <div className={styles.leftsidebar}>
                    <LeftSideBar mode={3}/>
                </div>
                <div className={styles.content}>
                    <Feedback lecture_id={lecture_id}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}