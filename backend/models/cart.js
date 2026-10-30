const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  items : [
    {
      productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
      },
      quantity :{
        type : Number,
        default : 1
      }
    }
  ]
})

const cart = mongoose.model('Cart', cartSchema)


module.exports = cart