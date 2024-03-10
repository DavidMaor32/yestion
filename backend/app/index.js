const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require("./routes/users");
const listsRouter = require("./routes/lists");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/lists", listsRouter);

module.exports = app;
