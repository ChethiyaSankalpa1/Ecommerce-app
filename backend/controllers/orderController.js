import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// 🧾 Place Order - Cash on Delivery (and others)
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address, paymentMethod } = req.body;

    if (!userId || !paymentMethod || !address || !items || !amount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Order items are invalid or empty" });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false,
      status: 'Pending',
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ success: false, message: "Order not placed" });
  }
};

// 🧾 Stripe Order (placeholder)
const placeOrderStripe = async (req, res) => {
  res.json({ success: false, message: "Stripe method not implemented yet" });
};

// 🧾 Razorpay Order (placeholder)
const placeOrderRazorpay = async (req, res) => {
  res.json({ success: false, message: "Razorpay method not implemented yet" });
};

// 📦 Get All Orders for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetch all orders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// 📦 Get Orders for a Specific User
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch user orders error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// ✅ Update Order Status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.status(400).json({ success: false, message: "Order ID and status are required" });

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ success: false, message: "Failed to update order status" });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
