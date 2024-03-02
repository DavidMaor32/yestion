module.exports = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    username: /^[a-zA-Z0-9]{4,}$/,
    name: /^[a-zA-Z]{2,}$/,
    url: /^(http|https):\/\/[^ "]+$/,
    
};