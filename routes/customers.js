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
const { getUsersInfo } = require('../utils/utils');

// Compile a model
const name = process.env.NODE_ENV === 'test' ? 'test-customer' : 'customer';
const Customer = mongoose.model(name, customerSchema);

// Router object
const router = express.Router();

// Display details of all users
router.get('/', async (req, res) => {
  res.sendStatus(200);
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

module.exports = { router, Customer };
