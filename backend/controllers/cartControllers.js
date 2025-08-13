import userModel from '../models/userModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({ message: "Missing itemId or size" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    // Update directly in DB
    const updateResult = await userModel.updateOne(
      { _id: userId },
      { $set: { cartData } }
    );

    console.log('Add to cart update result:', updateResult);

    res.status(200).json({ message: "Added to cart", cartData });
  } catch (error) {
    console.error('AddToCart error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cartData: user.cartData || {} });
  } catch (error) {
    console.error('GetUserCart error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update cart item quantity
export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({ message: "Missing itemId, size or quantity" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    const updateResult = await userModel.updateOne(
      { _id: userId },
      { $set: { cartData } }
    );

    console.log('Update cart result:', updateResult);

    res.status(200).json({ message: "Cart updated", cartData });
  } catch (error) {
    console.error('UpdateCart error:', error);
    res.status(500).json({ message: "Server error" });
  }
};
