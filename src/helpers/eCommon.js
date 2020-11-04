const eCommon= {
  StatusResponse: {
    Ok: {
      Code: 200,
      Description: 'Ok',
    },
    BadRequest: {
      Code: 400,
      Description: 'Bad Request'
    },
    NotFound: {
      Code: 404,
      Description: 'Not Found'
    },
    InternalServerError: {
      Code: 500,
      Description: 'Internal Server Error'
    }
  }
}
module.exports = eCommon;