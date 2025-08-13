// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRout.js';
import cartRouter from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDb();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('API working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
