require('dotenv').config();
console.log(process.env.NEXT_PUBLIC_SERVER_URL);
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserProvider from "../contexts/UserContext";

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </UserProvider>
    );
}