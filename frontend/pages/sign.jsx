import { useState } from "react";
import regex from "../utils/regex";
import styles from "../styles/Sign.module.css";
import { useContext } from "react";
import BearerContext from "../contexts/BearerContext";
import { useRouter } from "next/router";
import axios from "axios";
import { useUserState } from "../contexts/UserContext";
const myAxios = axios.create({
    validateStatus: function (status) {
        return status < 500;
    }
});

const styles_local = {
    a: {
        color: "gray",
        cursor: "pointer",
        textDecoration: "underline"
    }
}

export default function Sign() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("davidmaor");
    const [password, setPassword] = useState("admin123");
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const bearer = useContext(BearerContext);
    const router = useRouter();
    const setUser = useUserState();

    async function signIn(userName, password) {
        try {
            const response = await myAxios.post(
                process.env.NEXT_PUBLIC_SERVER_URL + "/users/login",
                {
                    userName: userName,
                    password: password,

                }
            );
            console.log(response);
            return response;
        }
        catch (err) {
            console.log(err);
        }

    };

    async function signUp(userName, password, email, fName, lName) {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/users/sign-up", {

                username: userName,
                password: password,
                email: email,
                fName: fName,
                lName: lName

            })

            return response;
        }
        catch (err) {
            console.log(err);
        }

    }

    async function submitHandler() {
        try {
            let response;
            if (isSignUp) {
                response = await signUp(username, password, email, fName, lName);
            } else {
                response = await signIn(username, password);
            }
            console.log(response)

            switch (response.status) {
                case 200:
                    setUser(response.data);
                    router.push(`/${response.data.userName}`);
                    break;
                case 401:
                    router.push("/401");
                    break;
                case 404:
                    router.push("/404");
                    break;
                default:
                    break;
            }
        }
        catch (er) {
            alert(er)
        }

    }

    return (
        <div>
            <h1>Sign</h1>
            <div className={styles.sign}>
                <input type="text" placeholder="username" regex={regex.username} value={username} onChange={e => { setUsername(e.target.value) }} />
                <input type="password" placeholder="password" regex={regex.password} value={password} onChange={e => { setPassword(e.target.value) }} />
                {isSignUp && <input type="text" placeholder="email" regex={regex.email} onChange={e => { setEmail(e.target.value) }} />}
                {isSignUp && <input type="text" placeholder="first name" regex={regex.name} onChange={e => { setFName(e.target.value) }} />}
                {isSignUp && <input type="text" placeholder="last name" regex={regex.name} onChange={e => { setLName(e.target.value) }} />}
                <a type="button" onClick={() => setIsSignUp(!isSignUp)} style={styles_local.a}>
                    {isSignUp ? "already have an account? sign in!" : "new? sign up!"}
                </a>
                <button onClick={submitHandler} >{isSignUp ? 'sign up' : 'login'}</button>
            </div>
        </div>
    );
}