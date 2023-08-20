const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, 'Please provide product name'],
        maxLength:[100, 'Name can not be more than 100 character']
    },
    price:{
        type:Number,
        trim:true,
        required:[true, 'Please provide product price'],
        default:0
    },
    description:{
        type:String,
        required:[true, 'Please provide product description'],
        maxLength:[1000, 'Description can not be more than 1000 characters']
    },
    image:{
        type:String,
        default:'/upload/example.jpg',
    },
    category:{
        type:String,
        required:[true, 'Please provide product category'],
        enum:['office', 'kitchen', 'bedroom'],

    },
    company:{
        type:String,
        required:[true, 'Please provide compnay name'],
        enum:{
            values:['ikea', 'liddy', 'marcos'],
            message:'{VALUE} is not supported'
        }
    },

    colors:{
        type:[String],
        default:['#222'],
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    freeShipping:{
        type:Boolean,
        default:false
    },
    inventory:{
        type:Number,
        required:true,
        default:15
    },
    averageRating:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }

}, {timestamps:true});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;