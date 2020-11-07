const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new Schema({
  description: {
    type: String,
    unique: true,
    required: [true, 'La descripción de la categoria es obligatorio'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', //Este proviene del nombre del modelo al que hace referencia.
  }
});

CategorySchema.plugin(uniqueValidator, {
  message: '{PATH} debe ser un valor unico',
});

module.exports = mongoose.model('category', CategorySchema);