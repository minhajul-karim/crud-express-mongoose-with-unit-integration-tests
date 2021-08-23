/*
 * Title: Project Initial File
 * Description: Initial file to start the application
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const { router: CustomerRouter } = require('./routes/customers');

// App object
const app = express();

// Database connection with mongoose
const db = process.env.NODE_ENV === 'test' ? 'test-customers' : 'customers';
mongoose.connect(`mongodb://localhost:27017/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.log(err);
  });

// Handlebars settings
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// Settings to parse body of a POST request
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/customers', CustomerRouter);

// Error handler middleware
function errorHandler(err, req, res, next) {
  if (!res.headersSent) {
    res.status(500).json({ error: err });
  }
  return next(err);
}

app.use(errorHandler);

module.exports = app;
