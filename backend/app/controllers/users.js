const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  listUserNames,
} = require("../services/users");

module.exports = {
  ListUserNames: async (req, res) => {
    try {
      const { search, paging, offset } = req.query;
      console.log(search, paging, offset);
      const users = await listUserNames(search, paging, offset);
      res.json(users.map((user) => user.userName));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;
      if (!userName || !password) {
        return res.status(400).send("Missing required fields");
      }
      const user = await getUser(userName);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!require("bcrypt").compareSync(password, user.passHash)) {
        return res.status(401).send("Invalid password");
      }

      res.send({
        userName: user.userName,
        email: user.email,
        fName: user.fName,
        lName: user.lName,
        friends: user.friends,
        friendRequests: user.friendRequests,
        sentRequests: user.sentRequests,
        sharedLists: user.sharedLists,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const username = req.params.username;
      const user = await getUser(username);
      if (!user) return res.status(404).send("User not found");
      res.json({
        userName: user.userName,
        email: user.email,
        fName: user.fName,
        lName: user.lName,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const { userName, password, email, fName, lName } = req.body;
      if (!userName || !password || !email || !fName || !lName) {
        return res.status(400).send("Missing required fields");
      }

      const passHash = require("bcrypt").hashSync(password, 10);
      const newUser = await createUser({
        userName,
        passHash,
        email,
        fName,
        lName,
      });
      res.send(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { password, userName } = req.body;
      if (!password || !userName) {
        return res.status(400).send("Missing required fields");
      }
      //verify password
      const user = await getUser(userName);
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (!require("bcrypt").compareSync(password, user.passHash)) {
        return res.status(401).send("Invalid password");
      }
      const deletedUser = await deleteUser(user.userName);
      res.json(deletedUser);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const username = req.params.username;
      const { newUsername, email, newPassword, lName, fName } = req.body;
      const newInfo = { newUsername, email, newPassword, lName, fName };
      newInfo.newPassword = newInfo.newPassword
        ? require("bcrypt").hashSync(newPassword, 10)
        : undefined;
      const updatedUser = await updateUser(username, newInfo);
      if (!updatedUser) return res.status(404).send("User not found");
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  ping: async (req, res) => {
    res.send("pong");
  },
};
