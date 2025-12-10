const mongoose = require('mpngoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
};

module.exports = connectDB;
