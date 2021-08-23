/*
 * Title: Customers Schema
 * Description: Defines the schema for each customer
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = customerSchema;
