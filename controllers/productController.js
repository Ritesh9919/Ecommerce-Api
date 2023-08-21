const Product = require('../models/product');
const {StatusCodes} = require('http-status-codes');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const path = require('path');

const createProduct = async(req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    return res.status(StatusCodes.CREATED).json({product});
}

const getAllProducts = async(req, res) => {
   const product = await Product.find({});
   return res.status(StatusCodes.OK).json({product, count:product.length});
}


const getSingalProduct = async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) {
      throw new NotFoundError(`No product with this id:${id}`);
    }
    return res.status(StatusCodes.OK).json({product});
    
}


const updateProduct = async(req, res) => {
    const {id} = req.params;
    const product = await Product.findOneAndUpdate({_id:id},req.body, {
        new:true,
        runValidators:true
    });
    if(!product) {
        throw new NotFoundError(`No product with this id:${id}`);
      }

      await product.save();
      return res.status(StatusCodes.OK).json({msg:'Product updated successfully'});
}

const deleteProduct = async(req, res) => {
    const {id} = req.params;
    const product = await Product.findOne({_id:id});
    if(!product) {
        throw new NotFoundError(`No product with this id:${id}`);
      }
     await product.remove();
     return res.status(StatusCodes.OK).json({msg:'product deleted successfully'});
}

const uploadImage = async(req, res) => {
    if(!req.files) {
        throw new BadRequestError('No file uploaded');
    }
    const productImage = req.files.image;
    if(!productImage) {
        throw new BadRequestError('Please upload image');
    }
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize) {
        throw new BadRequestError('Please upload Image smaller than 1mb');
    }

    if(!productImage.mimetype.startsWith('image')) {
        throw new BadRequestError('Please upload image');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + productImage.name);
    await productImage.mv(imagePath);
    return res.status(StatusCodes.OK).json({image:`uploads/${productImage.name}`});
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingalProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}