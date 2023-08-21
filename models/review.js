const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
rating:{
  type:Number,
  min:1,
  max:5,
  require:[true, 'please provide rating']
},

title:{
  type:String,
  trim:true,
  required:[true, 'please provide review title'],
  maxLength:100
},

comment:{
type:String,
required:[true, 'please provide review text']
},

product:{
   type:mongoose.Types.ObjectId,
   ref:'Product',
   required:true
},

user:{
  type:mongoose.Types.ObjectId,
  ref:'User',
  required:true
}
},{timestamps:true});


reviewSchema.index({product:1, user:1}, {unique:true});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;