/*
 * Title: Test search
 * Description: Test suites for the search functionality
 * Author: Minhajul Karim
 * Date: 15 Aug 2021
 */

/* global describe, beforeAll, afterAll, test, expect */

// Dependencies
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Test search feature', () => {
  beforeAll(() => null);

  describe('/customers/search/q?=___', () => {
    test('q?=minhajul should return status code 200', async () => {
      const response = await request.get('/customers/search?q=minhajul');
      expect(response.status).toBe(200);
    });

    test('q?=minhajul should return response that contains content-type=text/html', async () => {
      const response = await request.get('/customers/search?q=minhajul');
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('q?=MINHAJUL should display user info as a table data inside a table', async () => {
      const response = await request.get('/customers/search?q=MINHAJUL');
      expect(response.text).toMatch(/<td>Minhajul Karim<\/td>/);
    });

    test('q?=mkr should display user info as a table data inside a table', async () => {
      const response = await request.get('/customers/search?q=mkr');
      expect(response.text).toMatch(/<td>Minhajul Karim<\/td>/);
    });

    test('q?=01779898372 should display user info as a table data inside a table', async () => {
      const response = await request.get('/customers/search?q=01779898372');
      expect(response.text).toMatch(/<td>Minhajul Karim<\/td>/);
    });
  });

  afterAll(() => null);
});
