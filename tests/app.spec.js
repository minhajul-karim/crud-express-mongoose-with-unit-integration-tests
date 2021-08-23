/*
 * Title: Application tests
 * Description: Test suites for the application
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

/* global describe, beforeAll, afterAll, test, expect */

// Dependencies
const supertest = require('supertest');
const app = require('../app');
const { Customer } = require('../routes/customers');

const request = supertest(app);

describe('Test /customers routes', () => {
  // Clear db and run migrations
  beforeAll(async () => {
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
    ], (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  // Test suite for testing the index route
  describe('index route', () => {
    test('should respond with 200 for GET request', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
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

    test('should contain content-type=text/html', async () => {
      const response = await request.get('/customers/add');
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('should display the form', async () => {
      const response = await request.get('/customers/add');
      expect(response.text).toMatch(
        /<form action='\/customers\/add' method='POST'>/,
      );
    });

    test('should redirect to homepage after creating a new user', async () => {
      const response = await request
        .post('/customers/add')
        .send('name=Abbas Mustan&email=abbas@gmail.com&phone=0190909090909');
      expect(response.status).toBe(302);
    });

    test('should display <p class="text-center text-danger">Please provie your name</p> if name is missing while creating a new user', async () => {
      const response = await request
        .post('/customers/add')
        .send('email=abbas@gmail.com&phone=0190909090909');
      expect(response.text).toMatch(/<p class='text-center text-danger'>Please provie your name<\/p>/);
    });

    test('should update user info if user already exists', async () => {
      const response = await request
        .post('/customers/add')
        .send('id=1&name=Zia Haque&email=abbas@gmail.com&phone=0190909090909');
      expect(response.status).toBe(302);
    });
  });

  // Test suite for testing /customers/:userId/update route
  describe('/customers/1/update', () => {
    test('should return status code 200', async () => {
      const response = await request.get('/customers/1/update');
      expect(response.status).toBe(200);
    });

    test('should contain content-type=text/html', async () => {
      const response = await request.get('/customers/1/update');
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('should display the update form', async () => {
      const response = await request.get('/customers/1/update');
      expect(response.text).toMatch(
        /<form action='\/customers\/add' method='POST'>/,
      );
    });

    test('should populate the name input field with value "Zia Haque" for id: 1', async () => {
      const response = await request.get('/customers/1/update');
      expect(response.text).toMatch(
        /name='name'(\r\n|\r|\n)\s*value='Zia Haque'/,
      );
    });
  });

  // Test suite for testing /customer/:userId/remove route
  describe('/customers/1/remove', () => {
    test('should display <p class=\'lead text-center\'>User deleted</p>', async () => {
      const response = await request.get('/customers/1/remove');
      expect(response.text).toMatch(/<p class='text-center lead'>User deleted<\/p>/);
    });
  });

  // Clear users table and close db connection
  afterAll(() => null);
});
