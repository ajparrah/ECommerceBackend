const { StatusResponse } = require('../../helpers/eCommon');
const CategoryService = require('../../services/categoryService');
const service = new CategoryService();

class CategoryController {
  async getAll(req, res) {
     // Aqui en req.userLogged esta disponible el usuario que ingreso previamente. Y el middleware ya lo verifico con su token
     try {
      const result = await service.getAll();
      const status = result.length ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      const successfully = status === StatusResponse.Ok.Code ? true : false;
      return res.status(status).json({
        status,
        ok: successfully,
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

  async getById(req, res) {
    // Aqui en req.userLogged esta disponible el usuario que ingreso previamente. Y el middleware ya lo verifico con su token
    try {
      const id = req.params.id;
      const result = await service.getById(id);
      const status = result ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      const successfully = status === StatusResponse.Ok.Code ? true : false;
      if(successfully) {
        return res.status(status).json({
          status,
          ok: successfully,
          data: result,
        });
      } else {
        return res.status(status).json({
          status,
          ok: successfully,
          error: {
            message : 'No se ha encontrado la categoria con el id solicitado',
            id
          },
        });
      }
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }

  async create(req, res) {
    // Aqui en req.userLogged esta disponible el usuario que ingreso previamente. Y el middleware ya lo verifico con su token
    const body = req.body;
    const userId = req.userLogged._id;
    const category = {
      description: body.description,
      user: userId,
    };
    try {
      const result = await service.create(category);
      return res.json({
        status: StatusResponse.Ok.Code,
        ok: true,
        data: result,
      })
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const category = {
        description: body.description,
      };
      const result = await service.updateById(id, category);
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

  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await service.deleteById(id);
      const status = result ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      if(result) {
        return res.status(status).json({
          status,
          ok: true,
          data: result,
        });
      } else {
        return res.status(status).json({
          status,
          ok: false,
          error: {
            message: 'No existe el usuario o ha ocurrido un problema al tratar de eliminar la categoria'
          },
        });
      }
    } catch (error) {
      return res.status(StatusResponse.InternalServerError.Code).json({
        status: StatusResponse.InternalServerError.Code,
        ok: false,
        error,
      });
    }
  }
}

module.exports = CategoryController;
