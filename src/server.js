// app.js or server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const organisationRoutes = require('./routes/organisation');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sequelize = require('./config'); // Import the sequelize instance


console.log('Starting the server...');

app.get('/', (req, res) => {
  res.send('Hello World');
})
// Middleware
app.use(bodyParser.json());

// Use the organisation routes
app.use(organisationRoutes);
app.use(userRoutes);

// Use the auth routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });


  module.exports = (req, res) => {
    try {
      const name = req.query.name || 'World';
      res.status(200).json({ message: `Hello, ${name}!` });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

