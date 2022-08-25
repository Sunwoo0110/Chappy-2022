import styles from "../../styles/login/Login.module.css"
import Header from "./components/_header";
import Login from "./components/_login";

export default function Index(){
    return(
        <div className={styles.container}>
            <Header/>
            <Login/>
        </div>
    );
}
