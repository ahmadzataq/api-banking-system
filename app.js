require('dotenv').config();
const express = require("express");
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./libs/passport'); // Dipindahkan ke atas

const router = express.Router();
const logger = require('morgan')
const app = express();

const { SESSION_SECRET } = process.env;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs');

const v1 = require("./routes/v1/index.js");
app.use("/v1", v1);

const web = require('./routes/v1/web');
const api = require('./routes/v1/api');
app.use('/', web);
app.use('/api/v1', api);

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

module.exports = app;
