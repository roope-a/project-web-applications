const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('./auth/passport-config');
require('dotenv').config({ path: '../.env' });

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');

const app = express();

const mongoDB = "mongodb://0.0.0.0:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));

app.use(express.static(path.join(__dirname, 'build')));

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.resolve("..", "client", "build")));
//     app.get("*", (req, res) => 
//         res.sendFile(path.resolve("..", "client", "build", "index.html"))
//     );
// } else if (process.env.NODE_ENV === "development") {
//     var corsOptions = {
//         origin: "http://localhost:3000",
//         optionSuccessStatus: 200
//     };
//     app.use(cors(corsOptions))
// }

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);

module.exports = app;
