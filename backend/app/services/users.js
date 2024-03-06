const UserModel = require('../models/users');

module.exports = {
    createUser: async (userObject) => {
        return await UserModel.create({...userObject});
    },
    getUser: async (userName) => {
        //return all the details of the user, use findOne
        return await UserModel.findOne({userName: userName});
    },
    deleteUser: async (id) => {
        return await UserModel.delete(id);
    },
    updateUser: async (id, name) => {
        return await UserModel.update(id, name);
    },
    listUserNames: async (search,paging,offset) => {
        const filter = {};
        if(!paging){
            paging = 10;
        }
        if(!offset){
            offset = 0;
        }
        if(!search){
            filter.userName = new RegExp(search, 'gi');
        }
        
        return await UserModel.find(filter).limit(paging).skip(offset);
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