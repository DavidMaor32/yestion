import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";



export default function User() {
    const router = useRouter();
    const { username } = router.query;
    const[user, setUser] = useState({});

    async function getUser(){
        const response = await axios.get(process.env.SERVER_URL + "/users/" + username,{
            headers:{
                Bearer: localStorage.getItem("token")
            }
        });
        
        switch (response.status) {
            case 200:
                setUser(response.data);
                break;
            case 401:
                router.push("/401");
                break;
            case 404:
                router.push("/404");
                break;
            default:
                router.push("/500");
                break;
        }
    }


    return (
        <div>
            {
                user.usereName
            }
        </div>
    );
}