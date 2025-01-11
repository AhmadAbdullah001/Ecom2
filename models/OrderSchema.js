const mongoose=require('mongoose')
const {Schema}=mongoose
const OrderSchema=new Schema({
    user:{ //this is the Reference to the user who owns or created the Note
        type:mongoose.Schema.Types.ObjectId,//This means the user field will store a unique ID (called an ObjectId) that corresponds to a user in another collection. In MongoDB, every document (or record) has a unique ObjectId.
         ref:'user'//This tells MongoDB that the user field is linked to a document from the "user" collection. So, each note will be associated with a specific user in the "user" collection.
    },
    imageURI:{
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
    date:{
        type:String
    }
})
module.exports = mongoose.model('Order',OrderSchema)