import { createContext } from "react";

const BearerContext = createContext({
    bearer: "",
    setBearer: () => {},
});

export default BearerContext;