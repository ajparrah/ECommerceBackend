const Category = require('../models/category');

class CategoryService {
  async getAll() {
    return Category
      .find({})
      .sort('description')
      .populate('user', 'name email'); // El id siempre es traido por defecto, asi que se omite en el segundo parametro que permite seleccionar cuales propiedades mostrar.
  }

  async getById(id) {
    return await Category.findById(id)
      .populate('user', 'name email');
  }

  async create(categoryToAdd) {
    return await Category(categoryToAdd).save();
  }

  async updateById(id, categoryToUpdate) {
    const options = {
      new: true,
      runValidators: true,
    };
    return await Category.findByIdAndUpdate(id, categoryToUpdate, options);
  }

  async deleteById(id) {
    return await Category.findByIdAndDelete(id)
  }
}
module.exports = CategoryService;
