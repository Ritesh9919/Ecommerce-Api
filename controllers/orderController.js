const Product = require('../models/product');
const Order = require('../models/order');
const {StatusCodes} = require('http-status-codes');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const checkPermission = require('../utils/checkPermissions');
const { json } = require('express');

const fakeStripeApi = async({amount, currency}) => {
    const clientSecret = 'someRandomValue';
    return {clientSecret, amount};

}


const createOrder = async(req, res) => {
    const {items:cartItem, tax, shippingFee} = req.body;
    if(!cartItem || cartItem.length < 1) {
        throw new BadRequestError('No cart item provided');
    }
    if(!tax || !shippingFee) {
        throw new BadRequestError('Please provide tax and shippingFee');
    }

    let orderItems = [];
    let subTotal = 0;

    for(let item of cartItem) {
        const dbProduct = await Product.findOne({_id:item.product});
        if(!dbProduct) {
            throw new NotFoundError(`No product with id:${item.product}`);
        }

        const {name, image, price, _id} = dbProduct;
        const getSingalOrderItem = {
            amount:item.amount,
            name,
            price,
            image,
            product:_id

        }
         orderItems = [...orderItems, getSingalOrderItem];
         subTotal += item.amount * price;
         
         
    }

    const total = tax + shippingFee + subTotal;
    const paymentIntent = await fakeStripeApi({
       amount:total,
       currency:'usd'
     });

    const order = await Order.create({
       orderItems,
       total,
       subTotal,
       tax,
       shippingFee,
       clientSecret:paymentIntent.clientSecret,
       user:req.user.id
    }) 
    return res.status(StatusCodes.CREATED).json({order, clientSecret:order.clientSecret, });
}


const getAllOrders = async(req, res) => {
    const orders = await Order.find({});
    return res.status(StatusCodes.OK).json({orders, count:orders.length});
}


const getSingalOrder = async(req, res) => {
    const {id:orderId} = req.params;
    const order = await Order.findOne({_id:orderId});
    if(!order) {
        throw new NotFoundError(`No order with id:${orderId}`);
    }
    checkPermission(req.user, order.user);
    return res.status(StatusCodes.OK).json({order});
}


const getCurrentUserOrders = async(req, res) => {
    const orders= await Order.findOne({user:req.user.id});
    return res.status(StatusCodes.OK).json({orders, count:orders.length});
}

const updateOrder = async(req, res) => {
    const {id:orderId} = req.params;
    const {paymentIntentId} = req.body;
    const order = await Order.findOne({_id:orderId});
    if(!order) {
        throw new NotFoundError(`No order with id:${orderId}`);
    }
    checkPermission(req.user, order.user);
    order.status = 'paid',
    order.paymentIntentId = paymentIntentId
    await order.save();
    return res.status(StatusCodes.OK).json({order});
}


module.exports = {
    getAllOrders,
    getSingalOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}