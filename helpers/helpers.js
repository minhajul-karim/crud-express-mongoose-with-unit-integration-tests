/*
 * Title: Helpers
 * Description: Helper functions that help the applicatoin to run
 * Author: Minhajul Karim
 * Date: 24 Aug 2021
 */

// Dependencies
const mongoose = require('mongoose');

// Database connection with mongoose
const db = process.env.NODE_ENV === 'test' ? 'test-customers' : 'customers';
const connectToMongodb = async (req, res, next) => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    next();
  } catch (err) {
      next(err);
  }
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    console.log(err);
    res.status(500).send('INTERNAL SERVR ERROR! :(');
  }
  return next(err);
};

module.exports = { connectToMongodb, errorHandler };
