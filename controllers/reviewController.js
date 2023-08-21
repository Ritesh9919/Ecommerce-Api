const Product = require('../models/product');
const Review = require('../models/review');
const {StatusCodes} = require('http-status-codes');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const checkPermission = require('../utils/checkPermissions');

const createReview = async(req, res) => {
    const {product:productId} = req.body;
    const product = await Product.findOne({_id:productId});
    if(!product) {
        throw new NotFoundError(`No product with id:${productId}`);
    }

    const alreadySubmitted = await Review.findOne({product:productId, user:req.user.id});
    if(alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product');
    }

    req.body.user = req.user.id;
    const review = await Review.create(req.body);
    return res.status(StatusCodes.CREATED).json({review});


    
}


const getAllReviews = (req, res) => {
    return res.send('Get All Reviews');
}


const getSingalReview = (req, res) => {
    return res.send('Get Singal Review');
}

const updateReview = (req, res) => {
    return res.send('Update Review');
}

const deleteReview = (req, res) => {
    return res.send('Delete Review');
}


module.exports = {
    createReview,
    getAllReviews,
    getSingalReview,
    updateReview,
    deleteReview
}