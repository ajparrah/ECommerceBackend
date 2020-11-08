const { StatusResponse } = require('../../helpers/eCommon');
const ProductService = require('../../services/productService');
const service = new ProductService();

class ProductController {
  async getAll(req, res) {
    // Aqui en req.userLogged esta disponible el usuario que ingreso previamente. Y el middleware ya lo verifico con su token
    // #region Pagination
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;
    // #endregion
    const categoryId = req.query.categoryId;
    try {
      if(categoryId) {
        const result = await service.getByCategoryId(from, limit, categoryId);
        const quantity = await service.getQuantity({ category: categoryId })
        const status = result.length && quantity ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
        const successfully = status === StatusResponse.Ok.Code ? true : false;
        return res.status(status).json({
          status,
          ok: successfully,
          data: {
            products: result,
            quantity
          },
        });
      }
      const result = await service.getAll(from, limit);
      const quantity = await service.getQuantity();
      const status = result.length && quantity ? StatusResponse.Ok.Code : StatusResponse.NotFound.Code;
      const successfully = status === StatusResponse.Ok.Code ? true : false;
      return res.status(status).json({
        status,
        ok: successfully,
        data: {
          products: result,
          quantity
        },
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
            message : 'No se ha encontrado el producto con el id solicitado',
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
    try {
      const body = req.body;
      const product = {
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        quantityStock: body.quantityStock,
        category: body.category,
        user: req.userLogged._id,
      };
      const result = await service.create(product);
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

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const product = {
        name: body.name,
        unitPrice: body.unitPrice,
        description: body.description,
        isAvailable: body.isAvailable,
        quantityStock: body.quantityStock,
        category: body.category,
        user: req.userLogged._id,
      };
      const result = await service.update(id, product);
      const status = result ? StatusResponse.Ok.Code : StatusResponse.BadRequest.Code;
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
            message: 'No existe el producto o ha ocurrido un problema al tratar de eliminarlo'
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

  async searchByLikeName(req, res) {
    // #region Pagination
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;
    // #endregion
    const likeName = req.params.name;
    try {
      const result = await service.getByLike(from, limit, likeName);
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

}
module.exports = ProductController;
