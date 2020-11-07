const { StatusResponse } = require('../../helpers/eCommon');
const UserService = require('../../services/userService');
const bcrypt = require('bcrypt');
const service = new UserService();

class UserController {

  static async create(req, res) {
    const body = req.body; // Esto se refiere a que en el body de la petición se pasa un par de clave-valor ejemplo name:Alejandro, por lo tanto, se puede validar que si es undefined que es el valor por defecto o algun caso particular retorne un estatus http como 400, 404 ... y retorne lo necesario para que sea manejado en el frontend
    const user = {
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role,
    }
    try {
      const result = await service.create(user);
      return res.json({
        status: StatusResponse.Ok.Code,
        ok: true,
        data: result,
      });
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }

  static async getAll(req, res) {
    //#region Pagination
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;
    //#endregion Pagination
    // Aqui en req.userLogged esta disponible el usuario que ingreso previamente. Y el middleware ya lo verifico con su token
    try {
      const users = await service.getUsers(from, limit);
      const usersQuantity = await service.getQuantityActiveUsers();
      // Asegura que si consiguio registros. Sino, manejar el error. ↓
      const status = users.length && usersQuantity ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      const successfully = status === StatusResponse.Ok.Code ? true : false;
      return res.status(status).json({
        status,
        ok: successfully,
        data: {
          users,
          quantity: usersQuantity,
        }
      });
      
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { password, isSignedByGoogle, ...userToUpdate } = req.body;
      const result = await service.update(id, userToUpdate);
      const status = result ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      return res.status(status).json({
        status,
        ok: true,
        data: result,
      });
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }
  
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await service.delete(id);
      const status = result ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      return res.status(status).json({
        status,
        ok: true,
        data: result,
      });
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }
}

module.exports = UserController;
