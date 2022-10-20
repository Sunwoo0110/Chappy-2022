import styles from "../../styles/signup/Login.module.css"
import Header from "./components/_header";
import Signup from "./components/_signup";

export default function Index(){
    return(
        <div className={styles.container}>
            <Header/>
            <Signup/>
        </div>
    );
}