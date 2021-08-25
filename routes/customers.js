/*
 * Title: Router object for /customers path
 * Description: This router object will be used for all paths following /customers
 * Author: Minhajul Karim
 * Date: 4 Aug 2021
 */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const customerSchema = require('../schemas/customerSchema');
const { getCustomersInfo } = require('../utils/utils');
const { errorHandler } = require('../helpers/helpers');

// Compile a model
const name = process.env.NODE_ENV === 'test' ? 'test-customer' : 'customer';
const Customer = mongoose.model(name, customerSchema);

// Router object
const router = express.Router();

// Display details of all users
router.get('/', async (req, res, next) => {
  try {
    // Get all users from db
    const result = await Customer.find({});
    // Copy desired properties from prototype of objects received from db
    const customers = getCustomersInfo(result);
    // Render homepage
    res.render('home', { customers });
  } catch (err) {
     next(err);
  }
});

// Show add new customer form
router.get('/add', (req, res) => {
  res.sendStatus(200);
});

// Create new user
router.post('/add', async (req, res) => {
  res.sendStatus(200);
});

// Update existing user
router.get('/:userId/update', async (req, res) => {
  res.sendStatus(200);
});

// Remvoe users
router.get('/:userId/remove', async (req, res) => {
  res.sendStatus(200);
});

// Search information
router.get('/search/', async (req, res) => {
  res.sendStatus(200);
});

router.use(errorHandler);

module.exports = { router, Customer };
