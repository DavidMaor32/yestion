import { useUser, useUserState } from '../contexts/UserContext';
import styles from '../styles/Header.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
    //the pages  are user_profile and search. also have the logo
    const setUser = useUserState();
    const user = useUser();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [flag, setFlag] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !user) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    function logout() {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    }

    async function login() {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_URL + "/users/login",
            {
                userName: username,
                password: password,
            }
        );
        if (response.status === 200) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
    }


    return (
        <header className={styles.header}>
            {
                (router.asPath !== '/' && router.asPath !== '/sign') &&
                <nav>
                    <h1>Yestion</h1>
                    {
                        user ?
                            <ul>
                                <li><button onClick={() => router.push(`/${user.userName}`)}>{user.userName}</button></li>
                                <li><button onClick={() => logout()}>logout</button></li>
                            </ul>
                            :
                            <ul>
                                <li><button onClick={() => login()}>sign</button></li>
                                <li><input type="text" placeholder="username" value={username} onChange={e => { setUsername(e.target.value) }} /></li>
                                <li><input type="password" placeholder="password" value={password} onChange={e => { setPassword(e.target.value) }} /></li>
                            </ul>
                    }
                </nav>
            }
        </header>
    );
}