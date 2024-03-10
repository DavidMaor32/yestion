const {
  createList,
  getList,
  getLists,
  findLists,
  deleteList,
  updateList,
} = require("../services/lists");

module.exports = {
  createList: async (req, res) => {
    const { name, isPublic, description } = req.body;
    const { username } = req.params;
    try {
      if (!name) {
        return res.status(400).send("List name is required");
      }
      const ls = await getList(username, name);
      if (ls) {
        return res.status(400).send("List name already exists");
      }

      const list = await createList(name, isPublic, username, description);
      res.status(201).send(list);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getList: async (req, res) => {
    const { username, listName } = req.params;
    try {
      const list = await getList(username, listName);
      res.status(200).send(list);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getLists: async (req, res) => {
    const { username } = req.params;
    const { paging, offset } = req.query;
    try {
      const lists = await getLists(
        username,
        parseInt(paging),
        parseInt(offset)
      );
      res.status(200).send(lists);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  findLists: async (req, res) => {
    const { search } = req.query;
    const { paging, offset } = req.query;
    try {
      const lists = await findLists(search, parseInt(paging), parseInt(offset));
      res.status(200).send(lists.filter((list) => list.isPublic));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  deleteList: async (req, res) => {
    const { username, listName } = req.params;
    try {
      const ans = await deleteList(username, listName);
      res.status(204).send(ans);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  updateList: async (req, res) => {
    const { username, listName } = req.params;
    const { newName, newIsPublic, newDescription, newIsFavorite } = req.body;
    try {
      const updatedList = await updateList(username, listName, {
        newName,
        newIsPublic,
        newDescription,
        newIsFavorite,
      });
      res.status(200).send(updatedList);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
