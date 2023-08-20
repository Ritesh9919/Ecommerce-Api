const UnauthenticatedError = require('../errors/unauthenticated_error');

const checkPermissions = (requestUser, resourceUserId) => {
        if(requestUser.role === 'admin') return;
    if(requestUser.id == resourceUserId.toString())return;
    throw new UnauthenticatedError('unauthrized to access this routes');
   
    
}


module.exports = checkPermissions;