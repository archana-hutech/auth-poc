
require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: 'postgres',
  },
  // You can also add configurations for other environments like 'test' and 'production'
};