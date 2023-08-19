
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad_request');
const UnauthenticatedError = require('../errors/unauthenticated_error');
const createJwtAndVarify = require('../utils/jwt');

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const isEmailAlreadyExist = await User.findOne({ email });
    if (isEmailAlreadyExist) {
        throw new BadRequestError('Email already exist');
    }

    // first user registred as admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({ name, email, password, role });

    const tokenUser = { name: user.name, id: user._id, role: user.role };
    createJwtAndVarify.attatchCookiesToResponse({res, user:tokenUser});
    return res.status(StatusCodes.CREATED).json({ user: tokenUser});
}

module.exports.login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('please provide email and password');
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCurrect = await  user.comparePassword(password);
    if(!isPasswordCurrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const tokenUser = { name: user.name, id: user._id, role: user.role };
    createJwtAndVarify.attatchCookiesToResponse({res, user:tokenUser});
    return res.status(StatusCodes.CREATED).json({ user: tokenUser});

}


module.exports.logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires:new Date(Date.now()),
    })

    return res.status(StatusCodes.OK).json({msg:'user logout successfully'});
}