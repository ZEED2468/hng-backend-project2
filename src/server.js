// app.js or server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const organisationRoutes = require('./routes/organisation');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sequelize = require('./config'); // Import the sequelize instance



// Middleware
app.use(bodyParser.json());

// Use the organisation routes
app.use(organisationRoutes);
app.use(userRoutes);

// Use the auth routes
app.use('/auth', authRoutes);

// Other routes and middleware...

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;

sequelize.sync() // Sync without force
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error creating database & tables:', error);
  });