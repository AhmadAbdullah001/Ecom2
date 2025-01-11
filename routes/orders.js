const express = require('express');
const router = express.Router();
const orders = require('../models/OrderSchema');
const fetchuser = require('../middleware/fetchuser');
//Router to Add Orders
router.post('/addorders',fetchuser,async(req,res)=>{
    const{imageURI,title,price,date}=req.body;
    const item = new orders({
      imageURI,
      title,
      price,
      date,
      user:req.user.id,
    });
    try {
      await item.save();
      res.json("Order Placed")
    } catch (error) {
      res.json({error})
    }
  
  })
  router.get('/fetchorders', fetchuser, async (req, res) => {
    try {
      const id = req.user.id;
      const items = await orders.find({ user: req.user.id });
      res.json(items); // Send items directly as an array
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;
  