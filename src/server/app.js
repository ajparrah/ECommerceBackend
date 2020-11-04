require('../configs/config');
const express = require('express');
const mongoose = require('mongoose');
const { optionsMongoose } = require('../helpers/mongoose');
const app = express();
const bodyParser = require('body-parser');
//#region Middlewares
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(require('../routes/index')); // Rutas
//#endregion Middlewares

mongoose.connect('mongodb://localhost:27017/coffe', optionsMongoose)
  .then(() => console.log('Base de datos en MongoDB ONLINE'))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});