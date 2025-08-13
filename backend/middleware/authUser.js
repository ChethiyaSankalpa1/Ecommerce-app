import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized: Invalid user" });

    req.user = user;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "User not logged in" });
  }
};

export default authUser;
