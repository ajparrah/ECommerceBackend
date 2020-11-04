const express = require('express');
const UserRouter = require('./routers/userRouter');

const app = express();

app.use('/user', UserRouter);

module.exports = app;