const mongoose = require ("mongoose")

const productSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String
  },
  price : {
    type : Number,
    required : true
  },
  catagory : {
    type : String
  },
  image : {
    type : String
  }
})