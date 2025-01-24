/*
 * Title: Project Initial File
 * Description: Initial file to start the application
 * Author: Minhajul Karim
 * Date: 23 Jan 2025
 */

// Dependencies
import express from 'express';
import { connectToMongodb, errorHandler } from './helpers/helpers';
import { router as CustomerRouter } from './routes/customers';
const exphbs = require('express-handlebars');

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

export default app;
