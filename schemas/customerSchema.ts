/*
 * Title: Customers Schema
 * Description: Defines the schema for each customer
 * Author: Minhajul Karim
 * Date: 24 Jan 2025
 */

import { Schema } from 'mongoose';

export const customerSchema = new Schema({
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
