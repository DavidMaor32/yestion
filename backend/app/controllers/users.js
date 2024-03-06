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

      const users = await listUserNames(search, paging, offset);
      res.json(users.map((user) => user.userName));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      const { userName, password } = req.body;
      if (!userName || !password) {
        return res.status(400).send("Missing required fields");
      }
      const user = await getUser(userName);
      if (!user) {
        console.log("1");
        return res.status(404).json({ message: "User not found" });
      }
      if (!require("bcrypt").compareSync(password, user.passHash)) {
        console.log("2");
        return res.status(401).send("Invalid password");
      }
      const token = require("jsonwebtoken").sign(
        { id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      console.log(user);
      res.header("Authorization", `Bearer ${token}`).send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await getUser(id);
      let usr;
      res.json(user);
    } catch (err) {
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
      const token = require("jsonwebtoken").sign(
        { id: newUser.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.header("Authorization", `Bearer ${token}`).send(newUser);
    } catch (err) {
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
      const user = (await getUser(userName))[0];
      if (!user) {
        return res.status(404).send("User not found");
      }
      if (!require("bcrypt").compareSync(password, user.passHash)) {
        return res.status(401).send("Invalid password");
      }
      const deletedUser = await deleteUser(user.userName);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const updatedUser = await updateUser(id, name);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  ping: async (req, res) => {
    res.send("pong");
  },
};
