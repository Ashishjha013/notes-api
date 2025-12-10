const express = require('express');
const mongoose = require('mpngoose');
const connectDB = require('./src/config/db');

// Initialize Express app
const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Notes API 📝');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running smoothly🚀! http://localhost:${process.env.PORT || 8080}`);
});
