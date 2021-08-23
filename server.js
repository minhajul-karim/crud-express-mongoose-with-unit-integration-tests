/*
 * Title: Application server
 * Description: Configure and run the application server
 * Author: Minhajul Karim
 * Date: 23 Aug 2021
 */

const env = require('dotenv');
const app = require('./app');

env.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running at - http://localhost:${PORT}`);
});
