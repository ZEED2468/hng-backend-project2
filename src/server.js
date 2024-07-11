require('dotenv').config(); // Ensure this is at the top to load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config'); // Import the sequelize instance

const organisationRoutes = require('./routes/organisation');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

console.log('Starting the server...');

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Middleware
app.use(bodyParser.json());

// Use the organisation routes
app.use(organisationRoutes);
app.use(userRoutes);

// Use the auth routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
