const UnauthenticatedError = require('../errors/unauthenticated_error');
const UnauthorizedError = require('../errors/unauthorizedError');
const {isTokenValid} = require('../utils/jwt');


const authenticateUser = (req, res, next) => {
    const token = req.signedCookies.token;
    if(!token) {
        throw new UnauthenticatedError('User Invalid');
    }
    
    try {
        const payload = isTokenValid({token});
        req.user = {name:payload.name, id:payload.id, role:payload.role};
        next();
    } catch (error) {
        throw new UnauthenticatedError('User Invalid');
    }
}


const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new UnauthorizedError('unauthrized to access this routes');
        }
        next();
    }
    
}


module.exports = {
    authenticateUser,
    authorizePermission
};