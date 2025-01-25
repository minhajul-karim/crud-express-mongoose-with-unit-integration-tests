/*
 * Title: Customers Schema
 * Description: Defines the schema for each customer
 * Author: Minhajul Karim
 * Date: 24 Jan 2025
 */

import { Schema } from 'mongoose';
import { Customer } from '../helpers/types';

export const customerSchema = new Schema<Customer>({
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
