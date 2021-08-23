/*
 * Title: Utility tests
 * Description: Test suites for utility functions
 * Author: Minhajul Karim
 * Date: 9 Aug 2021
 */

// Dependencies
const { getUsersInfo } = require('./utils');

// Test suite for testing utils functions
describe('Test utils functions', () => {
  test('getUserInfo returns an array of user objects', () => {
    const arrayOfUserObjs = [
      {
        id: 7,
        name: 'John Doe',
        email: 'johndoe@ex.com',
        phone: '01711091062',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 8,
        name: 'Steve Almas',
        email: 'stevealmas@bee.com',
        phone: '01779898372',
        createdAt: '',
        updatedAt: '',
      },
    ];

    const usersInfo = getUsersInfo(arrayOfUserObjs);
    expect(usersInfo.length).toBe(2);
    expect(usersInfo[0]).toMatchObject({
      id: 7,
      name: 'John Doe',
      email: 'johndoe@ex.com',
      phone: '01711091062',
    });
  });
});
