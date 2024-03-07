const ListModel = require("../models/list");
const userModel = require("../models/user");

module.exports = {
  createList: async (name, isPublic, OwnerUserName, description) => {
    const user = await userModel.getUser(OwnerUserName);
    return await ListModel.create({
      listName: name,
      isPublic,
      Owner: user,
      description,
    });
  },
  getList: async (username, listName) => {
    const user = await userModel.getUser(username);
    return await ListModel.findOne({ listName: listName, Owner: user });
  },
  getLists: async (username, paging, offset) => {
    const user = await userModel.getUser(username);
    return await ListModel.find({ Owner: user }).skip(offset).limit(paging);
  },
  findLists: async (search, paging, offset) => {
    return await ListModel.find({ listName: { $regex: search, $options: "i" } })
      .skip(offset)
      .limit(paging);
  },
  deleteList: async (username, listName) => {
    const user = await userModel.getUser(username);
    return await ListModel.deleteOne({ listName: listName, Owner: user });
  },
  updateList: async (username, listName, updatedValues) => {
    const { newName, newIsPublic, newDescription, newIsFavorite } =
      updatedValues;
    const user = await userModel.getUser(username);
    const list = await ListModel.findOne({ listName: listName, Owner: user });
    if (newName) list.listName = newName;
    if (newIsPublic) list.isPublic = newIsPublic;
    if (newDescription) list.description = newDescription;
    if (newIsFavorite) list.isFavorite = newIsFavorite;
    return await list.save();
  },
};
