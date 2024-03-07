import { useUserState } from '../contexts/UserContext';
import styles from '../styles/Header.module.css';

export default function Header() {
    //the pages  are user_profile and search. also have the logo
    return (
        <header className={styles.header}>
            <h1>Yestion</h1>
            <nav>
                <ul>
                    <button onClick={() => { localStorage.removeItem('user'); }}>logout</button>
                </ul>
            </nav>
        </header>
    );
}