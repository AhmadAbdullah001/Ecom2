const mongoose=require('mongoose')
const {Schema}=mongoose
const ProductSchema=new Schema({
    imgurl:{
        type:[String],
        requried:true
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
    productdetails:{
        country:{
            type:String,
            required:true
        },
        material:{
            type:String,
            required:true
        }
    }
})
module.exports=mongoose.model('Product',ProductSchema)