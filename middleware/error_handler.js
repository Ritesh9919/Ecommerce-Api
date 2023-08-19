const CustomAPIError = require('../errors/custom_api_error');
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'something went wrong please try again later'
  }

  if(err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `Dublicate value entered for ${Object.keys(err.keyValue)} field please choose another value`
  }

  if(err.name == 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    customError.statusCode = 400;
  }
  
  if(err.name == 'CastError') {
    customError.msg = `no job with this id:${err.value}`
    customError.statusCode = 404
  }
  
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg:customError.msg });
}

module.exports = errorHandlerMiddleware
