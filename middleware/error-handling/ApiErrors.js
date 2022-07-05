const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class Api400Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "Bad Request.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api401Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    description = "Unautharized.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = {
  Api400Error,
  Api404Error,
  Api401Error,
};