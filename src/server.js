// app.js or server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const organisationRoutes = require('./routes/organisation');
const authRoutes = require('./routes/auth');


// Middleware
app.use(bodyParser.json());

// Use the organisation routes
app.use('/api/organisations', organisationRoutes);

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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
