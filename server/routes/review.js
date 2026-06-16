const express = require('express');
const router = express.Router();
const review = require('../models/ReviewSchema');
// const fetchuser=require('../middleware/fetchuser')
// Router to POST Items
router.post('/addreview', async (req, res) => {
    const {uid,Name,comment} = req.body;
    
    // Validate input fields
    if (!Name) return res.status(400).json({ error: "Name is required" });
    if (!comment) return res.status(400).json({ error: "Comment is required" });  
    if (!uid) return res.status(400).json({ error: "Id is required" });  

    try {
  
      const newreview = new review({
        uid,       
        Name,
        comment,
        // user:req.user.id,
      });
  
      await newreview.save();
      res.json(newreview);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.get('/getreviews', async (req, res) => {
    const { uid } = req.query; // Retrieve `uid` from query parameters
  
    if (!uid) {
      return res.status(400).json({ error: "Id is required" });
    }
  
    try {
      const list = await review.find({ uid }); // Find reviews by `uid`
      res.json(list); // Send the list as a response
    } catch (error) {
      console.error(error.message); // Log the error
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  module.exports=router