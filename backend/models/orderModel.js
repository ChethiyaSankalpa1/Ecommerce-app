import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { 
    type: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        size: { type: String },
      }
    ],
    required: true,
  },
  amount: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  status: { type: String, required: true, default: 'order placed' },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now },
});

const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default orderModel;
