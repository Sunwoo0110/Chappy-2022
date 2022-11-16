import styles from "../../styles/login/Login.module.css"
import Header from "./components/_findHeader";
import FindPW from "./components/_findpw";

export default function Index(){
    return(
        <div className={styles.container}>
            <Header/>
            <FindPW/>
        </div>
    );
}
