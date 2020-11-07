const User = require('../models/user');

class LoginService {
  async signIn(user) {
    return User.findOne({ email: user.email });
  }
}
module.exports = LoginService;
