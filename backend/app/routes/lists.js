const controller = require("../controllers/lists.js");

const router = require("express").Router();

const cache = require("../middlewares/cache");

router.post("/create/:username", controller.createList);
router.get("/find/:username/:listName", cache, controller.getList);
router.get("/public/:username", cache, controller.findLists);
router.get("/:username", cache, controller.getLists);
router.put("/:username/:listName", controller.updateList);
router.delete("/:username/:listName", controller.deleteList);

module.exports = router;
