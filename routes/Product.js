const express = require('express');
const router = express.Router();
const product = require('../models/ProductSchema');
router.post('/addproduct',async(req,res)=>{
    const{imgurl,head,title,price,detail,productdetails}=req.body
    const newproduct=new product([
        imgurl,head,title,price,detail,productdetails
])
    try {

        await newproduct.save();
        res.json("Product Added to DataBase")
    } catch (error) {
        // res.status(404).json({error})
        res.json(req.body)
    }
})
router.get('/fetchproducts',async(req,res)=>{
    const list=await product.find()
    res.json(list)
})
module.exports=router