const UserModel = require("../models/users");

module.exports = {
  createUser: async (userObject) => {
    return await UserModel.create({ ...userObject });
  },
  getUser: async (userName) => {
    return await UserModel.findOne({ userName: userName });
  },
  deleteUser: async (id) => {
    return await UserModel.deleteOne({ userName: id });
  },
  updateUser: async (userName, updatedInfo) => {
    const user = await UserModel.findOne({ userName: userName });
    if (!user) {
      return null;
    }
    if (updatedInfo.newUsername) {
      user.userName = updatedInfo.newUsername;
    }
    if (updatedInfo.newPassword) {
      user.passHash = updatedInfo.newPassword;
    }
    if (updatedInfo.email) {
      user.email = updatedInfo.email;
    }
    if (updatedInfo.fName) {
      user.fName = updatedInfo.fName;
    }
    if (updatedInfo.lName) {
      user.lName = updatedInfo.lName;
    }
    return await user.save();
  },
  listUserNames: async (search, paging, offset) => {
    return await UserModel.find({
      userName: { $regex: search || "", $options: "i" },
    })
      .skip(offset * paging || 0)
      .limit(paging || 10);
  },
};
