const express = require('express');
const router = express.Router();
const orders = require('../models/OrderSchema');
const fetchuser = require('../middleware/fetchuser');
//Router to Add Orders
router.post("/addorders", fetchuser, async (req, res) => {

  try {

    const { imageURI, title, price, date } = req.body;

    // Validation
    if (!imageURI || !title || !price || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Price validation
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const item = new orders({
      imageURI,
      title,
      price,
      date,
      user: req.user.id,
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Order Placed",
      order: item
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Internal Server Error"
    });

  }

});
router.get("/fetchorders", fetchuser, async (req, res) => {

  try {

    const items = await orders
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(items);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Internal Server Error"
    });

  }

});


  
  module.exports = router;
  
