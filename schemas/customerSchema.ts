/*
 * Title: Customers Schema
 * Description: Defines the schema for each customer
 * Author: Minhajul Karim
 * Date: 24 Jan 2025
 */

import mongoose from 'mongoose';

export const customerSchema = new mongoose.Schema({
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
