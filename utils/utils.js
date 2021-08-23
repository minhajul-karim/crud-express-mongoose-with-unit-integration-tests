/*
 * Title: Utility functions
 * Description: A collection of functions those help to accomplish
 * various operations easier accross the application
 * Author: Minhajul Karim
 * Date: 9 Aug 2021
 */

/*
 * The default users objects returned from db is not displayable to view engine.
 * This function maps the array of user objects and extract the required properties
 * those can be consumed by the view engine.
 */

function getUsersInfo(users) {
  return users.map((userObj) => {
    const { id, name, phone, email } = userObj;
    return {
      id,
      name,
      phone,
      email,
    };
  });
}

module.exports = { getUsersInfo };
