const { StatusResponse } = require('../../helpers/eCommon');
const LoginService = require('../../services/loginService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = new LoginService();

class LoginController {
  async signIn(req, res) {
    const body = req.body;
    const user = {
      email: body.email,
      password: body.password,
    };
    try {
      const existUser = await service.signIn(user);
      let status;
      if (existUser) { // Mongoose retorna un null si no lo consigue.
        status = StatusResponse.Ok.Code;
        if (bcrypt.compareSync(user.password, existUser.password)) {
          const payload = { user: existUser };
          const token = jwt.sign(payload, process.env.SEED, { expiresIn: process.env.CAD_TOKEN });
          return res.status(status).json({
            status,
            ok: true,
            data: {
              user: existUser,
              token,
            },
          });
        } else {
          return this.troubleEmailOrPassword(res);
        }
      } else {
        return this.troubleEmailOrPassword(res);
      }
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }

  troubleEmailOrPassword(res) {
    let status = StatusResponse.BadRequest.Code;
    return res.status(status).json({
      status,
      ok: false,
      error: {
        message: 'Usuario y/o contraseña no son validos',
      },
    });
  }
}

module.exports = LoginController;
