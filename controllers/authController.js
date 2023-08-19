
const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require('../errors/bad_request');

module.exports.register = async(req, res) => {
    const {name, email, password} = req.body;
    const isEmailAlreadyExist = await User.findOne({email});
    if(isEmailAlreadyExist) {
      throw new BadRequestError('Email already exist');
    }

    // first user registred as admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin':'user';    
    const user = await User.create({
        name,
        email,
        password,
        role});
    return res.status(StatusCodes.CREATED).json({user});
}

module.exports.login = (req, res) => {
    return res.send('Log in user');
}


module.exports.logout = (req, res) => {
    return res.send('Log out user');
}