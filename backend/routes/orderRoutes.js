import express from 'express';
import authUser from '../middleware/authUser.js';
import adminAuth from '../middleware/adminAuth.js';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
  res.json({ success: true, message: "Order route test working!" });
});

// Place an order (POST)
router.post('/place', authUser, async (req, res) => { 
  try {
    const userId = req.userId;
    const { items, amount, address, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must have items' });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      status: 'Ready to Ship',
      date: new Date(),
    });

    const savedOrder = await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get orders for logged-in user (GET)
router.get('/userorders', authUser, async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Fetching user orders error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ----------- ADMIN ROUTES FIXED BELOW ------------

// Get all orders (admin only)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Fetch all orders error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update order status (admin only)
router.post('/update-status', adminAuth, async (req, res) => { 
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'Missing orderId or status' });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, message: 'Order status updated' });
  } catch (error) {
    console.error('Update order status error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
