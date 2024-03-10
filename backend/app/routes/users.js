const controller = require("../controllers/users.js");

const router = require("express").Router();

const cache = require("../middlewares/cache");
const auth = require("../middlewares/auth");

router.post("/sign-up", controller.createUser);
router.post("/login", controller.login);
router.get("/:username", cache, controller.getUser);
router.get("/", cache, controller.ListUserNames);
router.put("/:username", controller.updateUser);
router.delete("/", controller.deleteUser);
router.get("/ping", controller.ping);

module.exports = router;
