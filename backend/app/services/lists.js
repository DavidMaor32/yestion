const ListModel = require("../models/lists");
const { getUser } = require("../services/users");

module.exports = {
  createList: async (name, isPublic, OwnerUserName, description) => {
    const user = await getUser(OwnerUserName);
    if (!user) throw new Error("User not found");
    return await ListModel.create({
      listName: name,
      isPublic,
      Owner: user,
      description,
    });
  },
  getList: async (username, listName) => {
    const user = await getUser(username);
    return await ListModel.findOne({ listName: listName, Owner: user });
  },
  getLists: async (username, paging, offset) => {
    const user = await getUser(username);
    return await ListModel.find({ Owner: user })
      .skip(offset || 0)
      .limit(paging || 10);
  },
  findLists: async (search, paging, offset) => {
    return await ListModel.find({
      listName: { $regex: search || "", $options: "i" },
    })
      .skip(offset || 0)
      .limit(paging || 10);
  },
  deleteList: async (username, listName) => {
    const user = await getUser(username);
    return await ListModel.deleteOne({ listName: listName, Owner: user });
  },
  updateList: async (username, listName, updatedValues) => {
    const { newName, newIsPublic, newDescription, newIsFavorite } =
      updatedValues;
    const user = await getUser(username);
    if (!user) throw new Error("User not found");
    const list = await ListModel.findOne({ listName: listName, Owner: user });
    if (!list) throw new Error("List not found");
    if (newName) list.listName = newName;
    if (newIsPublic) list.isPublic = newIsPublic;
    if (newDescription) list.description = newDescription;
    if (newIsFavorite) list.isFavorite = newIsFavorite;
    return await list.save();
  },
};
