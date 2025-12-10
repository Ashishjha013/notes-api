const express = require('express');
// Load environment variables from .env file
const helmet = require('helmet');
require('dotenv').config();
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');
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

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running smoothly🚀! http://localhost:${process.env.PORT || 8080}`);
});
