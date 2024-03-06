const bodyParser = require("body-parser");
const express = require('express');
const usersRouter = require("./routes/users");
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', usersRouter);

module.exports = app;