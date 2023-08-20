const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const UnauthenticatedError = require('../errors/unauthenticated_error');
const createTokenUser = require('../utils/createTokenUser');
const createJwtAndVarify = require('../utils/jwt');
const e = require('express');
const checkPermission = require('../utils/checkPermissions');

const getAllUser = async(req, res) => {
    console.log(req.user);
    const user = await User.find({role:'user'}).select('-password');
    return res.status(StatusCodes.OK).json({user, count:user.length});
}


const getSingalUser = async(req, res) => {
    console.log(req.user);
    const {id:userId} = req.params;
    const users = await User.findOne({_id:userId}).select('-password');
    if(!users) {
        throw new NotFoundError(`No user with id:${userId}`);
    }
    checkPermission(req.user, users._id);
    return res.status(StatusCodes.OK).json({users});
}


const showCurrentUser = (req, res) => {
    return res.status(StatusCodes.OK).json({user:req.user});
}


const updateUser = async(req, res) => {
  const {name, email} = req.body;
  if(!name || !email) {
    throw new BadRequestError('Please provide name and email');
  }
// update user using findoneandupdate
  const user = await User.findOneAndUpdate({_id:req.user.id}, {name, email}, {
    new:true,
    runValidators:true
  } );

   

  const tokenUser = createTokenUser(user);
  createJwtAndVarify.attatchCookiesToResponse({res, user:tokenUser});
  return res.status(StatusCodes.OK).json({user:tokenUser});

}


const updateUserPassword = async(req, res) => {
  const {oldPassword, newPassword} = req.body;
  if(!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both value');
  }

  const user = await User.findById(req.user.id);
  const isPasswordCurrect = await user.comparePassword(oldPassword);
  if(!isPasswordCurrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;
  await user.save();
  return res.status(StatusCodes.OK).json({msg:'Success! password updated'});
}


module.exports = {
    getAllUser,
    getSingalUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}