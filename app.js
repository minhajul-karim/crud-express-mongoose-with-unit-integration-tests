/*
 * Title: Project Initial File
 * Description: Initial file to start the application
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const { router: CustomerRouter } = require('./routes/customers');
const { connectToMongodb, errorHandler } = require('./helpers/helpers');

// App object
const app = express();

// Connect to mongodb
app.use(connectToMongodb);

// Handlebars settings
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  res.redirect('/customers');
});

// Settings to parse body of a POST request
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/customers', CustomerRouter);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
