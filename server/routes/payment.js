const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fetchuser = require('../middleware/fetchuser');
const Order = require('../models/OrderSchema');
const crypto = require('crypto');

// Cashfree Configuration
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || 'placeholder_app_id';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || 'placeholder_secret_key';
const CASHFREE_API_URL = process.env.CASHFREE_API_URL || 'https://sandbox.cashfree.com/pg';
// const MERCHANT_ID = process.env.CASHFREE_MERCHANT_ID || 'placeholder_merchant_id';

// Create Payment Order
router.post('/create-order', fetchuser, async (req, res) => {
  try {
    const { amount, currency, productName, quantity, imageURI, date } = req.body;
    const userId = req.user.id;

    if (!amount || !productName || !imageURI) {
      return res.status(400).json({ error: "Missing required fields: amount, productName, imageURI" });
    }

    const orderId = `order_${userId}_${Date.now()}`;

    // Create order in database
    const newOrder = new Order({
      orderId,
      userId,
      title: productName,
      price: amount.toString(),
      imageURI,
      date: date || new Date().toISOString(),
      quantity: quantity || 1,
      paymentStatus: 'pending',
      paymentMethod: 'cashfree',
      user: new mongoose.Types.ObjectId(userId)
    });

    await newOrder.save();

    // Call Cashfree API to create payment session
    try {
      const cashfreeResponse = await fetch(`${CASHFREE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2021-05-21',
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: parseFloat(amount),
          order_currency: currency || 'INR',
          customer_details: {
            customer_id: userId,
            customer_email: 'customer@example.com',
            customer_phone: '9876543210'
          },
          order_meta: {
            notify_url: process.env.WEBHOOK_URL || 'http://localhost:3002/api/payment/webhook',
            return_url: process.env.FRONTEND_URL || 'http://localhost:3001'
          }
        })
      });

      const responseData = await cashfreeResponse.json();

      if (!cashfreeResponse.ok) {
        console.error('Cashfree API Error:', responseData);
        return res.status(400).json({ 
          error: responseData.message || 'Failed to create payment order',
          details: responseData
        });
      }

      // Extract payment session ID (Cashfree API v2021-05-21 returns order_token)
      const paymentSessionId = responseData.order_token;

      res.json({
        success: true,
        orderId,
        paymentSessionId,
        amount,
        currency: currency || 'INR',
        message: "Payment order created successfully"
      });

    } catch (cashfreeError) {
      console.error('Cashfree API Exception:', cashfreeError.message);
      return res.status(500).json({ error: "Failed to create payment session with Cashfree", details: cashfreeError.message });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Verify Payment
router.post('/verify-payment', fetchuser, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Missing orderId" });
    }

    // Find order by orderId
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Verify payment with Cashfree API
    try {
      const verifyResponse = await fetch(
        `${CASHFREE_API_URL}/orders/${orderId}/payments`,
        {
          method: 'GET',
          headers: {
            'x-api-version': '2023-08-01',
            'x-client-id': CASHFREE_APP_ID,
            'x-client-secret': CASHFREE_SECRET_KEY
          }
        }
      );

      const verifyData = await verifyResponse.json();

      if (verifyResponse.ok && verifyData.payments && verifyData.payments.length > 0) {
        const payment = verifyData.payments[0];

        // Check if payment is successful
        if (payment.payment_status === 'SUCCESS') {
          order.paymentStatus = 'completed';
          order.paymentId = payment.cf_payment_id;
          await order.save();

          return res.json({
            success: true,
            message: "Payment verified successfully",
            orderId,
            paymentId: payment.cf_payment_id
          });
        } else {
          order.paymentStatus = 'failed';
          await order.save();

          return res.status(400).json({
            success: false,
            message: "Payment not successful",
            status: payment.payment_status
          });
        }
      }

      return res.status(400).json({
        success: false,
        message: "Could not verify payment"
      });

    } catch (cashfreeError) {
      console.error('Cashfree Verification Error:', cashfreeError.message);
      return res.status(500).json({ error: "Failed to verify payment", details: cashfreeError.message });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Webhook handler for Cashfree payment notifications
router.post('/webhook', async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Missing orderId" });
    }

    // Verify with Cashfree API to get actual payment status
    try {
      const verifyResponse = await fetch(
        `${CASHFREE_API_URL}/orders/${orderId}/payments`,
        {
          method: 'GET',
          headers: {
            'x-api-version': '2023-08-01',
            'x-client-id': CASHFREE_APP_ID,
            'x-client-secret': CASHFREE_SECRET_KEY
          }
        }
      );

      const verifyData = await verifyResponse.json();

      if (verifyData.payments && verifyData.payments.length > 0) {
        const payment = verifyData.payments[0];
        const order = await Order.findOne({ orderId });

        if (order) {
          if (payment.payment_status === 'SUCCESS') {
            order.paymentStatus = 'completed';
            order.paymentId = payment.cf_payment_id;
          } else if (payment.payment_status === 'FAILED') {
            order.paymentStatus = 'failed';
          }
          await order.save();
        }
      }

      res.json({ success: true });
    } catch (cashfreeError) {
      console.error('Webhook verification error:', cashfreeError.message);
      res.json({ success: true }); // Always return success to Cashfree
    }
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.json({ success: true });
  }
});

module.exports = router;
