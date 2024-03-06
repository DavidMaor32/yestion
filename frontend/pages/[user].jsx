import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import BearerContext from "../contexts/BearerContext";
import { useUser } from "../contexts/UserContext";


export default function User() {
    const router = useRouter();
    const { username } = router.query;
    // const [user, setUser] = useState({});
    const bearer = useContext(BearerContext);
    const user = useUser();

    console.log(user);
    async function getUser() {



        const response = await axios.post(process.env.SERVER_URL + "/users/" + username, {
            headers: {
                Bearer: bearer
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

            this is user {JSON.stringify(user)}

        </div>
    );
}