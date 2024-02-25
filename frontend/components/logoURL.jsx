export default function LogoURL({logo, url}) {
    return (
        <a href={url}>
            <img src={logo} alt="logo" />
        </a>

    )
}