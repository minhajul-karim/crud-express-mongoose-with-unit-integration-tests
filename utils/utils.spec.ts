/*
 * Title: Utility tests
 * Description: Test suites for utility functions
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

/* globals describe, test, expect */

// Dependencies
const { getCustomersInfo } = require('./utils');

// Test suite for testing utils functions
describe('Test utils functions', () => {
  test('getUserInfo returns an array of user objects', () => {
    const arrayOfUserObjs = [
      {
        _id: 7,
        name: 'John Doe',
        email: 'johndoe@ex.com',
        phone: '01711091062',
      },
      {
        _id: 8,
        name: 'Steve Almas',
        email: 'stevealmas@bee.com',
        phone: '01779898372',
      },
    ];

    const usersInfo = getCustomersInfo(arrayOfUserObjs);
    expect(usersInfo.length).toBe(2);
    expect(usersInfo[0]).toMatchObject({
      _id: 7,
      name: 'John Doe',
      email: 'johndoe@ex.com',
      phone: '01711091062',
    });
  });
});
