const express = require('express');
// Load environment variables from .env file
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./src/config/db');
const noteRoutes = require('./src/routes/noteRoutes');

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(helmet());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Notes API 📝');
});

// Note routes
app.use('/api/notes', noteRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running smoothly🚀! http://localhost:${process.env.PORT || 8080}`);
});
