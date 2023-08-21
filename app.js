const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const User = require('./model/userSchema');
const path = require('path');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;

require('./db/conn');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookieParser());
app.use(express.json());
app.use(require('./router/auth'));

// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get("/*", function (_, res) {
    res.sendFile(
        path.resolve(__dirname, 'client', 'build')
    );
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});