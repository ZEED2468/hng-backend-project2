
const { User, Organisation } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');



// User registration handler
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        const errors = [];

        if (!firstName) {
            errors.push({ field: 'firstName', message: 'First name is required' });
        }
        if (!lastName) {
            errors.push({ field: 'lastName', message: 'Last name is required' });
        }
        if (!email) {
            errors.push({ field: 'email', message: 'Email is required' });
        }
        if (!password) {
            errors.push({ field: 'password', message: 'Password is required' });
        }

        if (errors.length > 0) {
            return res.status(422).json({ errors });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "Bad request",
                message: "Email already in use",
                statusCode: 400
            });
        }

        const user = await User.create({
            userId,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
        });

        const orgId = uuidv4();
        const organisation = await Organisation.create({
            orgId,
            name: `${firstName}'s Organisation`,
        });

        await user.addOrganisation(organisation);

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: {
                accessToken: token,
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            },
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                status: 'Bad request',
                message: 'Email already in use',
                statusCode: 400
            });
        }
        console.error('Error during registration:', error); // Log the error details
        res.status(500).json({ status: 'Internal Server Error', message: 'Registration unsuccessful', statusCode: 500 });
    }
};


// User login handler
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: 'Bad request', message: 'Authentication failed', statusCode: 401 });
        }

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                accessToken: token,
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                },
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ status: 'Bad request', message: 'Authentication failed', statusCode: 400 });
    }
};

// Protected route to get user profile
exports.profile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            include: {
                model: Organisation,
                as: 'organisations',
                attributes: ['orgId', 'name', 'description'],
            },
        });

        if (!user) {
            return res.status(404).json({ status: 'Not found', message: 'User not found', statusCode: 404 });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    organisations: user.organisations,
                },
            },
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(400).json({ status: 'Bad request', message: 'Failed to fetch profile', statusCode: 400 });
    }
};




// // Protected endpoint for user profile
// router.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         // Access the user ID from the authenticated token
//         const userId = req.user.userId;

//         // Fetch user data from the database
//         const user = await User.findByPk(userId, {
//             attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'],
//         });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json({ user });
//     } catch (error) {
//         console.error('Error fetching profile:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
