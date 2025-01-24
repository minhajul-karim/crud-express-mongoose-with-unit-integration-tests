/*
 * Title: Router object for /customers path
 * Description: This router object will be used for all paths following /customers
 * Author: Minhajul Karim
 * Date: 24 Jan 2025
 */

// Dependencies
import express from "express";
import mongoose from "mongoose";
import { customerSchema } from "../schemas/customerSchema";
import { getCustomersInfo } from "../utils/utils";
import { errorHandler } from "../helpers/helpers";

// Compile a model
const collectionName = process.env.NODE_ENV === 'test' ? 'test-customer' : 'customer';
const Customer = mongoose.model(collectionName, customerSchema);

// Router object
const router = express.Router();

// Display details of all users
router.get('/', async (req, res, next) => {
  try {
    // Get all users from db
    const result = await Customer.find({}).exec();
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
  res.render('add');
});

// Create new user
router.post('/add', async (req, res, next) => {
  const { _id, name, email, phone } = req.body;
  const errorMsgs: {message: string}[] = [];
  if (!name) errorMsgs.push({ message: 'Please provie your name' });
  if (!email) errorMsgs.push({ message: 'Please provie your email' });
  if (!phone) errorMsgs.push({ message: 'Please provie your phone number' });
  if (name && email && phone) {
    // Update information if user already exists
    if (_id) {
      // Find and update customer information having _id
      try {
        await Customer.findByIdAndUpdate(_id, {
          name,
          email,
          phone,
        }, { useFindAndModify: false }).exec();
        res.redirect('/customers');
      } catch (err) {
        next(err);
      }
    } else {
      // Create new customer
      try {
        // Delete _id field form the form as we want mongoose to generate ids
        delete (req.body._id);
        await Customer.create(req.body);
        res.redirect('/customers');
      } catch (err) {
        next(err);
      }
    }
  } else {
    // Show error messages above form
    res.status(400).render('add', {
      errorMsgs,
      name,
      email,
      phone,
    });
  }
});

// Update existing user
router.get('/:customerId/update', async (req, res, next) => {
  // Retrieve userId from URL
  const { customerId } = req.params;
  // Find the user with userId
  try {
    // TODO: WHAT WILL BE THE TYPE OF customer?
    const customer: any = await Customer.findById(customerId).exec();
    const { _id, name, email, phone } = customer;
    res.render('add', {
      _id,
      name,
      email,
      phone,
    });
  } catch (err) {
    next(err);
  }
});

// Remvoe users
router.get('/:customerId/remove', async (req, res, next) => {
  const { customerId } = req.params;
  try {
    await Customer.findOneAndDelete({ _id: customerId }).exec();
    res.render('deleted');
  } catch (err) {
    next(err);
  }
});

// Search information
router.get('/search/', async (req, res, next) => {
  // Extract the query parameters
  const { q } = req.query;
  // Generate a case insensitive regular expressionn
  const expression = new RegExp(q as string, 'i');
  try {
    // Find all fileds that contain query parameters
    const result = await Customer.find({
      $or: [
          { name: expression },
          { email: expression },
          { phone: expression },
        ],
      }).exec();
    // Copy desired properties from prototype of objects received from db
    const customers = getCustomersInfo(result);
    // Render results
    res.render('home', { customers });
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

module.exports = { router, Customer };
