import styles from "../../styles/login/Login.module.css"
import Header from "./components/_findHeader";
import Footer from "../components/_footer";
import Login from "./components/_findpw";

export default function Index(){
    return(
        <div className={styles.container}>
            <Header/>
            <Login/>
            <Footer/>
        </div>
    );
}
