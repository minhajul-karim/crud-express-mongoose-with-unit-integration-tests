/*
 * Title: Application tests
 * Description: Test suites for the application
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

/* global describe, beforeAll, beforeEach, afterAll, test, expect, jest */

// Dependencies
import mongoose from 'mongoose';
import app from '../app';
import { Customer } from '../routes/customers';

const supertest = require('supertest');

const request = supertest(app);

describe('Test /customers routes', () => {
  beforeAll(async () => {
    // Establish database connection
    const db = process.env.NODE_ENV === 'test' ? 'test-customers' : 'customers';
    try {
      await mongoose.connect(`mongodb://localhost:27017/${db}`);
    } catch (err) {
        console.log(err);
    }
    // Seed database
    try {
      await Customer.insertMany([
        {
          name: 'Minhajul Karim',
          email: 'mkr@gmail.com',
          phone: '01711092062',
        },
        {
          name: 'Iffat Jahan',
          email: 'iffat@gmail.com',
          phone: '01675013172',
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(() => {
    jest.setTimeout(90 * 1000);
  });

  // Test suite for testing the index route
  describe('index route', () => {
    test('should redirect customers to /customers and send response code 302', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(302);
    });

    test('should respond with 404 for requesting bogus routes', async () => {
      const response = await request.get('/foobar');
      expect(response.status).toBe(404);
    });
  });

  // Test suite for testing the customers route
  describe('/customers route', () => {
    test('should return status code 200', async () => {
      const response = await request.get('/customers');
      expect(response.status).toBe(200);
    });

    test('should return response that contains content-type=text/html', async () => {
      const response = await request.get('/customers');
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('should contain <p class="lead">Customers</p> inside body', async () => {
      const response = await request.get('/customers');
      expect(response.text).toMatch(/<p class='lead'>Customers<\/p>/);
    });
  });

  // Test suite for testing the /customers/add route
  describe('/customers/add route', () => {
    test('should return status code 200', async () => {
      const response = await request.get('/customers/add');
      expect(response.status).toBe(200);
    });

    test('should contain an HTML page that contains the add form that has content-type=text/html', async () => {
      const response = await request.get('/customers/add');
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('should respond with 400 if name is missing while creating a new user', async () => {
      const response = await request
        .post('/customers/add')
        .send('email=nolan@gmail.com&phone=123');
      expect(response.status).toBe(400);
    });

    test('should redirect to homepage after creating a new user', async () => {
      const response = await request
        .post('/customers/add')
        .send('name=Chistopher Nolan&email=nolan@gmail.com&phone=123');
      expect(response.status).toBe(302);
    });

    test('should update user info if user already exists without creating new instances', async () => {
      const customer = await Customer.findOne({ phone: '123' }).exec();
      const response = await request
        .post('/customers/add')
        .send(`_id=${customer?._id}&name=Chris Nolan&email=chris-nolan@gmail.com&phone=999`);
      const customers = await Customer.find({});
      expect(customers.length).toBe(3);
      expect(response.status).toBe(302);
    });
  });

  // Test suite for testing /customers/:userId/update route
  describe('/customers/customerId/update', () => {
    test('should return status render the form with pre-filled form data', async () => {
      const customer = await Customer.findOne({ phone: '01711092062' }).exec();
      const response = await request.get(`/customers/${customer?._id}/update`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/html/);
    });
  });

  // Test suite for testing /customer/:userId/remove route
  describe('/customers/customerId/remove', () => {
    test('should display <p class=\'lead text-center\'>User deleted</p>', async () => {
      const customer = await Customer.findOne({ phone: '01711092062' }).exec();
      const response = await request.get(`/customers/${customer?._id}/remove`);
      expect(response.text).toMatch(/<p class='text-center lead'>User deleted<\/p>/);
    });
  });

  // Test suite for testing /customer/search?q=text route
  describe('/customers/search/q?=text', () => {
    test('q?=iffat should return status code 200', async () => {
      const response = await request.get('/customers/search?q=iffat');
      expect(response.status).toBe(200);
    });

    test('q?=iffat should return response that contains content-type=text/html', async () => {
      const response = await request.get('/customers/search?q=iffat');
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('q?=IFFAT should display user info as a table data inside a table', async () => {
      const response = await request.get('/customers/search?q=IFFAT');
      expect(response.text).toMatch(/<td>Iffat Jahan<\/td>/);
    });

    test('q?=iffat@gmail should display user info as a table data inside a table', async () => {
      const response = await request.get('/customers/search?q=iffat@gmail');
      expect(response.text).toMatch(/<td>Iffat Jahan<\/td>/);
    });

    test('q?=01675013172 should display user info as a table data inside a table', async () => {
      const response = await request.get('/customers/search?q=01675013172');
      expect(response.text).toMatch(/<td>Iffat Jahan<\/td>/);
    });
  });

  // Clear users table and close db connection
  afterAll(async () => {
    await Customer.deleteMany({});
    mongoose.disconnect();
  });
});
