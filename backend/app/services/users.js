const UserModel = require('../models/users');

module.exports = {
    createUser: async (userObject) => {
        return await UserModel.create({...userObject});
    },
    getUser: async (userName) => {
        const user = await UserModel.findByUserName(userName);
        const {name, passHash} = user;
        return {
            name,
            passHash
        };
    },
    deleteUser: async (id) => {
        return await UserModel.delete(id);
    },
    updateUser: async (id, name) => {
        return await UserModel.update(id, name);
    },
    listUserNames: async () => {
        return await UserModel.getAll();
    }
}

// export async function getUser(userName){
//     const user = await UserModel.findByUserName(userName);
//     const {name, passHash} = user;
//     return {
//         name,
//         passHash
//     };
// };


// export async function getUser(name, passHash){
//     return await UserModel.create({name,passHash});
// };