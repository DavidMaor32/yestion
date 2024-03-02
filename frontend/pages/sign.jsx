import { useState } from "react";
import regex from "../utils/regex";
import styles from "../styles/Sign.module.css";
import { useContext } from "react";
import BearerContext from "../contexts/BearerContext";
import { useRouter } from "next/router";
import axios from "axios";

const styles_local = {
    a:{
        color: "gray",
        cursor: "pointer",
        textDecoration: "underline"
    }
}

export default function Sign() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const bearer = useContext(BearerContext);
    const router = useRouter();

    async function signIn(userName, password){
        const response = await axios.get(process.env.SERVER_URL + "/users",{
            body:{
                username: userName,
                password: password
            }
        })

        return response;
    };

    async function signUp(userName, password, email, fName, lName){
        const response = await axios.post(process.env.SERVER_URL + "/users",{
            body:{
                username: userName,
                password: password,
                email: email,
                fName: fName,
                lName: lName
            }
        })

        return response;
    }

    function submitHandler(){
        let response;
        if (isSignUp){
            response=signUp(username, password, email, fName, lName);
        } else {
            response=signIn(username, password);
        }
        switch (response.status) {
            case 200:
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                router.push("/" + response.data.username);
                break;
            case 401:
                router.push("/401");
                break;
            case 404:
                router.push("/404");
                break;
            default:
                alert("An error occurred");
                break;
        }
    }

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={submitHandler} className={styles.sign}>
                <input type="text" placeholder="username" regex={regex.username} onChange={e => {setUsername(e.target.value)}}/>
                <input type="password" placeholder="password" regex={regex.password} onChange={e => {setPassword(e.target.value)}}/>
                {isSignUp && <input type="text" placeholder="email" regex={regex.email} onChange={e => {setEmail(e.target.value)}}/>}
                {isSignUp && <input type="text" placeholder="first name" regex={regex.name} onChange={e => {setFName(e.target.value)}}/>}
                {isSignUp && <input type="text" placeholder="last name" regex={regex.name} onChange={e => {setLName(e.target.value)}}/>}
                <a type="button" onClick={() => setIsSignUp(!isSignUp)} style={styles_local.a}>
                    {isSignUp ? "already have an account? sign in!" : "new? sign up!"}
                </a>
                <button type="submit" onSubmit={() => submitHandler()}>login</button>
            </form>
        </div>
    );
}