import axios from "axios";
import { useState } from "react"

export default function EditUser({ user }) {
    const [newUsername, setNewUsrname] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [fName, setFName] = useState(user.fName);
    const [lName, setLName] = useState(user.lName);
    const [newPassword, setNewPassword] = useState("");
    const username = user.userName;

    async function edit() {
        const response = axios.put(process.env.NEXT_PUBLIC_SERVER_URL + "/users/" + user.userName, {
            userName: username,
            newUsername: newUsername,
            email: email,
            fName: fName,
            lName: lName,
            password: newPassword
        });
    }

    return <div>
        <input type="text" value={newUsername} onChange={(e) => setNewUsrname(e.target.value)}></input>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type="text" value={fName} onChange={(e) => setFName(e.target.value)}></input>
        <input type="text" value={lName} onChange={(e) => setLName(e.target.value)}></input>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
        <button></button>

    </div>
}