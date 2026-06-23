const mongoose=require('mongoose')
const {Schema}=mongoose
const ProductSchema=new Schema({
  category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    required:true
  },
  categoryName:{
    type:String,
    required:true
  },
  imgurl:{
    type:[String],
    required:true
  },
  head:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  detail:{
    type:[String],
    required:true
  },
  productDetails:{
    Material:{
      type:String,
      required:true
    },
    Country:{
      type:String,
      required:true
    }
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
}, { collection: 'homepageproducts' })
module.exports=mongoose.model('homepageproducts',ProductSchema)
