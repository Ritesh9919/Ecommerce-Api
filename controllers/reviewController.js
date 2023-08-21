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


const getAllReviews = async(req, res) => {
    const reviews = await Review.find({});
    return res.status(StatusCodes.OK).json({reviews, count:reviews.length});
}


const getSingalReview = async(req, res) => {
    const {id:reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review) {
        throw new NotFoundError(`No review with id:${reviewId}`);
    } 
    return res.status(StatusCodes.OK).json({review});
}

const updateReview = async(req, res) => {
    const {id:reviewId} = req.params;
    const {rating, title, comment} = req.body;
    const review = await Review.findById(reviewId);
    if(!review) {
        throw new NotFoundError(`No review with id:${reviewId}`);
    }
    checkPermission(req.user, review.user);
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();
    return res.status(StatusCodes.OK).json({msg:'Review updated success'});
}

const deleteReview = async(req, res) => {
    const {id:reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review) {
        throw new NotFoundError(`No review with id:${reviewId}`);
    }
    checkPermission(req.user, review.user);
    await review.remove();
    return res.status(StatusCodes.OK).json({msg:'Review deleted success'});
}


module.exports = {
    createReview,
    getAllReviews,
    getSingalReview,
    updateReview,
    deleteReview
}