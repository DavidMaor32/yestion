import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

//is user is not the signed one, retrieve the user's data from the server
export default function User() {
    const [edit, setEdit] = useState(false);
    const router = useRouter();
    const user = useUser();

    async function getUser(username) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/" + username);
            console.log(response);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async function getLists(username) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/lists/ " + username);
            console.log(response);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }

    async function getPublicLists(username) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/lists/public/" + username);
            console.log(response);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }





    return (
        <>
            {
                user && user.userName == router.query.user && <button onClick={() => setEdit(!edit)}>Edit</button>
            }


        </>
    );
}