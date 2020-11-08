const express = require('express');
const UserRouter = require('./routers/userRouter');
const LoginRouter = require('./routers/loginRouter');
const CategoryRouter = require('./routers/categoryRouter');
const ProductRouter = require('./routers/productRouter');

const app = express();

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);

module.exports = app;