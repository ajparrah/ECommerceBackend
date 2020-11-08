const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'El nombre es obligatorio'],
  },
  unitPrice: {
    type: Number,
    required: [true, 'El precio unitario del producto es obligatorio'],
  },
  description: {
    type: String,
    required: false,
  },
  quantityStock: {
    type: Number,
    required: [true, 'La cantidad en el stock es obligatorio'],
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

ProductSchema.plugin(uniqueValidator, {
  message: '{PATH} debe ser un valor único',
});

module.exports = mongoose.model('product', ProductSchema);
