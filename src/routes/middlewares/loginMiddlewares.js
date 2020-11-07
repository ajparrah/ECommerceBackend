const { StatusResponse } = require('../../helpers/eCommon');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.get('token');
  jwt.verify(token, process.env.SEED, (error, payloadDecoded) => {
    if(error) {
      return res.status(StatusResponse.BadRequest.Code).json({
        status: StatusResponse.BadRequest.Code,
        ok: false,
        error: {
          message: 'Token invalido - Intenta generar uno nuevo'
        }
      });
    }
    req.userLogged = payloadDecoded.user;
    next();
  });
};

const verifyAdminROLE = (req, res, next) => {
  const { userLogged } = req;
  if(userLogged.role === 'ADMIN_ROLE') {
    next();
  } else {
    return res.status(StatusResponse.BadRequest.Code).json({
      status: StatusResponse.BadRequest.Code,
      ok: false,
      error: {
        message: 'Usuario no posee los permisos necesarios para esta operación',
      }
    });
  }
};

module.exports = { 
  verifyToken,
  verifyAdminROLE
};