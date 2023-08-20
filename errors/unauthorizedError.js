const CustomAPIError = require('./custom_api_error');
const {StatusCodes} = require('http-status-codes');

class UnauthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}


module.exports = UnauthorizedError;