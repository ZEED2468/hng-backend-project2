const { Sequelize } = require('sequelize');
require('pg');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  logging: false, // Disable logging SQL queries to the console
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
    acquire: 30000, // Maximum time, in milliseconds, that pool will try to get the connection before throwing error
  },
  timezone: '+05:30', // Example: Set the timezone to UTC+05:30
  // Other options as needed
});

module.exports = sequelize;
