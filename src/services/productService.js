const Product = require('../models/product');
class ProductService {
  async getAll(from, limit) {
    return await Product
      .find({ isAvailable: true })
      .skip(from)
      .limit(limit)
      .populate('category', 'description user')
      .populate('user', 'name email');
  }

  async getQuantity(filter = null){
    if(filter) {
      filter = {...filter, isAvailable : true};
    } else {
      filter = { isAvailable: true };
    }
    return await Product.countDocuments(filter);
  }

  async getById(id) {
    return await Product
      .findById(id)
      .populate('category', 'description user')
      .populate('user', 'name email');
  }

  async getByCategoryId(from, limit, categoryId) {
    return await Product
      .find({ category: categoryId })
      .skip(from)
      .limit(limit)
      .populate('category', 'description user')
      .populate('user', 'name email');
  }

  async getByUserId(from, limit, userId) {
    return await Product
      .find({ user: userId })
      .skip(from)
      .limit(limit)
      .populate('category')
      .populate('user');
  }

  async getByLike(from, limit, likeName) {
    //Este metodo puede ser flexible para buscar segun una expresion regular. Tal y como lo permite mongoose.
    const nameToSearch = new RegExp(likeName, 'i'); // Esta es la expresion regular mas basica para que busque los mas cercano al termino
    return await Product
      .find({ name: nameToSearch, isAvailable: true })
      .skip(from)
      .limit(limit);
  }

  async create(product) {
    return await Product(product).save();
  }

  async update(id, productToUpdate) {
    const options = {
      new: true,
      runValidators: true,
      context: 'query', //Es requerido para usar el este metodo y obligar a validar con el mongoose unique validator
    };
    return await Product.findByIdAndUpdate(id, productToUpdate, options);
  }

  async deleteById(id) {
    return await Product.findByIdAndUpdate(id, { isAvailable: false });
  }
}
module.exports = ProductService;
