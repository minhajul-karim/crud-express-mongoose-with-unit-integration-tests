/*
 * Title: Utility functions
 * Description: A collection of functions those help to accomplish
 * various operations easier accross the application
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

/*
 * The default users objects returned from db contains our desired properties inside prototype
 * that is not displayable to handlebars by default.
 * This function maps the array of user objects and extract the required properties
 * those can be consumed by the handlebars.
 */

function getCustomersInfo(users) {
  return users.map((userObj) => {
    const { _id, name, phone, email } = userObj;
    return {
      _id,
      name,
      phone,
      email,
    };
  });
}

module.exports = { getCustomersInfo };
