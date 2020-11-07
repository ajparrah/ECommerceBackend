const express = require('express');
const UserRouter = require('./routers/userRouter');
const LoginRouter = require('./routers/loginRouter');

const app = express();

app.use('/user', UserRouter);
app.use('/login', LoginRouter);

module.exports = app;