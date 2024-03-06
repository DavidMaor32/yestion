const { createContext } = require("react");

const ActiveLinkContext = createContext({
    activeLink: "",
    setActiveLink: () => {},
});

export default ActiveLinkContext;