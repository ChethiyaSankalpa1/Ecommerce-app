// config/mongodb.js
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUrl = `${process.env.MONGODB_URI}/e-commerce`;
    await mongoose.connect(dbUrl);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};

export default connectDb;
