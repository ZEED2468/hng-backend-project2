const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const organisationRoutes = require('./routes/organisation');
const { User, Organisation } = require('./models');


// Middleware to handle CORS
app.use(cors({
    exposedHeaders: ['Authorization'],
}));

app.use(bodyParser.json());


// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/organisations', organisationRoutes);

module.exports = app;
