import UserProvider, { useUser, useUserState } from '../contexts/UserContext';
import Header from '../components/Header';
import { useEffect } from 'react';

require('dotenv').config();

export default function App({ Component, pageProps }) {
    const user = useUser();



    return (
        <UserProvider >
            <Header />
            <Component {...pageProps} />
        </UserProvider>
    );
}