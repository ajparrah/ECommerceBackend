const User = require('../models/user');

class UserService {
  async create(userToAdd) {
    return await User(userToAdd).save();
  }

  async getUsers(from, limit) {
    return await User.find({ isActive: true }).skip(from).limit(limit);
  }

  async update(id, userToUpdate) {
    const options = {
      new: true,
      runValidators: true,
      context: 'query', //Es requerido para usar el este metodo y obligar a validar con el mongoose unique validator
    };
    return await User.findByIdAndUpdate(id, userToUpdate, options);
  }

  async delete(id) {
    const userToDelete = {
      isActive: false,
    };
    return await User.findByIdAndUpdate(id, userToDelete, { new: true });
  }

  async getQuantityActiveUsers() {
    return await User.countDocuments({ isActive : true });
  }
}
module.exports = UserService;
