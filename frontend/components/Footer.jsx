import LogoURL from "./logoURL";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    return  <footer className={styles.Footer}>
            <LogoURL logo="/logos/discord-48.svg" url="https://www.discord.com/users/397711598547894275" />
            <LogoURL logo="/logos/github-48.svg" url="https://github.com/DavidMaor32" />
            <LogoURL logo="/logos/linkedin-48.svg" url="https://www.linkedin.com/in/david-maor/" />
            <LogoURL logo="/logos/instagram-48.svg" url="https://www.instagram.com/panda_unicorn32/" />
        </footer>;
}