import { useContext } from "react";
const axios = require("axios");

module.exports = {
    login:async function (username, password){
        axios.get(process.env.SERVER_URL + "/users",{
            body:{
                username: username,
                password: password
            },
            headers:{
                Bearer: getBearer()
            }
        })
    },
    signUp:async function (username, password, email, fName, lName){
        axios.post(process.env.SERVER_URL + "/users",{
            body:{
                username: username,
                password: password,
                email: email,
                fName: fName,
                lName: lName
            }
        })
    },
    getUser:async function(username){
        const response = await axios.get(process.env.SERVER_URL + "/users/" + username,{
            headers:{
                Bearer: getBearer()
            }
        });
        
        return response;
    }
};