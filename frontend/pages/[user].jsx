import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import List from "../components/List";

export default function User() {
    const [edit, setEdit] = useState(false);
    const router = useRouter();
    const user = useUser();
    const [lists, setLists] = useState([]);
    let account = null;
    if (user && router.query.user == user.userName) {
        account = user;
    }
    else {
        account = async () => await getUser(router.query.user);
    }

    useEffect(() => {
        if (!user || router.query.user !== user.userName) {
            getPublicLists(router.query.user).then((data) => {
                console.log(data);
                setLists(data);
            });
        }
        else {
            getLists(router.query.user).then((data) => {
                console.log(data);
                setLists(data);
            });
        }
    }, []);

    async function getUser(username) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/" + username);
            console.log(response);
            switch (response.status) {
                case 200:
                    return response.data;
                case 404:
                    router.push("/404");
                    break;
                default:
                    alert('error');
                    break;
            }
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
            return response.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async function deleteUser(username) {
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL + "/users/" + username);
            console.log(response);
            if (response.status === 200) {
                alert('user deleted!');
                localStorage.removeItem('user');
                router.push('/');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {
                account && account.userName == router.query.user && <button onClick={() => setEdit(!edit)}>Edit</button>
            }
            <br />


            {
                edit ?
                    <div>
                        <lablel>Username    </lablel>
                        <input type="text" value={account.userName} ></input>
                        <br />
                        <lablel>email       </lablel>
                        <input type="text" value={account.email}></input>
                        <br />
                        <lablel>first name  </lablel>
                        <input type="text" value={account.fName}></input>
                        <br />
                        <lablel value="">last name    </lablel>
                        <input type="text" value={account.lName}></input>
                        <br />
                        <lablel>new password</lablel>
                        <input type="password" value={account.password}></input>
                        <br />
                        <button>Submit</button>
                    </div >
                    :
                    <div>
                        <h1>{router.query.user}</h1>
                        <h2>{account.fName + ' ' + account.lName}</h2>
                        <h2>{account.email}</h2>
                    </div>
            }


            {
                lists.map((list) => {
                    return <div>
                        <List list={list} user={router.query.user} />
                    </div>
                })
            }


            {
                user && account.userName == user.userName && <button onClick={() => deleteUser(router.query.user)}>Delete user</button>
            }
        </>
    );
}