const ListModel = require('../models/list');
const userModel = require('../models/user');

module.exports = {
    createList: async (name, isPublic, OwnerUserName, description) => {
        const user = await userModel.getUser(OwnerUserName);
        return await ListModel.create({listName: name, isPublic, Owner: user, description});
    },
    getList: async (username, listName) => {
        const user = await userModel.getUser(username);
        return await ListModel.findOne({listName: listName, Owner: user});
    },
    deleteList: async (username, listName) => {
        const user = await userModel.getUser(username);
        return await ListModel.deleteOne({listName: listName, Owner: user});
    },
    
}