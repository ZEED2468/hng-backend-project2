// app.js or server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const organisationRoutes = require('./routes/organisation');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sequelize = require('./config'); // Import the sequelize instance

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