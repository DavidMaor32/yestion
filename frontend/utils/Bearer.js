module.exports = {
    getBearer : () => {
        return localStorage.getItem("bearer");
    },
    setBearer : (token) => {
        localStorage.setItem("bearer", token);
    },
};