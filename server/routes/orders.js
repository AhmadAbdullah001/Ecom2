const express = require('express');
const router = express.Router();
const orders = require('../models/OrderSchema');
const fetchuser = require('../middleware/fetchuser');
//Router to Add Orders
router.post("/addorders", fetchuser, async (req, res) => {

  try {

    const { imageURI, title, price, date, paymentMethod, quantity } = req.body;

    // Validation
    if (!imageURI || !title || !price || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Price validation
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    // Generate unique orderId for COD orders
    const orderId = `${req.user.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const item = new orders({
      imageURI,
      title,
      price,
      date,
      user: req.user.id,
      userId: req.user.id,
      orderId: orderId,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'cashfree' ? 'pending' : 'completed',
      quantity: quantity || 1
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: "Order Placed",
      orderId: orderId,
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