const express = require("express");
const router = express.Router();
const logger = require('morgan')
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

const v1 = require("./routes/v1/index.js");
app.use("/v1", v1);

module.exports = app;