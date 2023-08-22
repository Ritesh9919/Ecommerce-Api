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

reviewSchema.statics.calculateAverage = async function(productId) {
  const result = await this.aggregate([
    {$match:{product:productId}},
    {
      $group:{
        _id:null,
        averageRating:{$avg:'$rating'},
        numOfReviews:{$sum:1},
      }
    },
  ]);
  
  try {
    await this.model('Product').findOneAndUpdate({_id:productId}, {
      averageRating:Math.ceil(result[0]?.averageRating || 0),
      numOfReviews:result[0]?.numOfReviews || 0

    })
  } catch (error) {
    console.log(error);
  }
}

reviewSchema.post('save', async function() {
  await this.constructor.calculateAverage(this.product);
  console.log('Post save hook called ');
})

reviewSchema.post('remove', async function() {
  await this.constructor.calculateAverage(this.product);
  console.log('Post remove hook called');
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;