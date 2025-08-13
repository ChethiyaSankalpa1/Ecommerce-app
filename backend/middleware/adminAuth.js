import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorised, login again" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token contains admin flag
    if (!decoded.admin) {
      return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }

    // Pass control to next middleware or route handler
    next();
  } catch (error) {
    // JWT verify errors or other errors
    return res.status(401).json({ success: false, message: "Invalid token or not authorised" });
  }
};

export default adminAuth;
