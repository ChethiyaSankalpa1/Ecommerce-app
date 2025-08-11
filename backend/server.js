// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDb();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
