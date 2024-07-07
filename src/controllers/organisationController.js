const { Organisation, User } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Get all organisations handler
exports.getOrganisations = async (req, res) => {
    try {
        // Fetch organisations associated with the logged-in user

        const organisations = await Organisation.findAll({
            include: [{
                model: User,
                as: 'users',
                where: { userId: req.user.userId },
                attributes: [], // No need to fetch user attributes
            }],
            attributes: ['orgId', 'name', 'description'],
        });

        res.status(200).json({  
            status: 'success',
            message: 'Organisations retrieved successfully',
            data: { organisations },
        });
    } catch (error) {
        console.error('Error fetching organisations:', error);
        res.status(400).json({ status: 'Bad request', message: 'Failed to fetch organisations', statusCode: 400 });
    }
};

// Get organisation by ID handler
exports.getOrganisationById = async (req, res) => {
    try {
        const organisation = await Organisation.findByPk(req.params.orgId, {
            attributes: ['orgId', 'name', 'description'],
        });

        if (!organisation) {
            return res.status(404).json({ status: 'Not found', message: 'Organisation not found', statusCode: 404 });
        }

        res.status(200).json({
            status: 'success',
            data: { organisation },
        });
    } catch (error) {
        console.error('Error fetching organisation:', error);
        res.status(400).json({ status: 'Bad request', message: 'Failed to fetch organisation', statusCode: 400 });
    }
};

// Create organisation handler
exports.createOrganisation = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) return res.status(422).json({
            errors: [{ field: 'name', message: 'Name is required' }],
        });

        const orgId = uuidv4();
        const organisation = await Organisation.create({
            orgId,
            name,
            description,
        });

        await req.user.addOrganisation(organisation);

        res.status(201).json({
            status: 'success',
            message: 'Organisation created successfully',
            data: {
                orgId: organisation.orgId,
                name: organisation.name,
                description: organisation.description,
            },
        });
    } catch (error) {
        res.status(400).json({ status: 'Bad request', message: 'Client error', statusCode: 400 });
    }
};

// Add user to organisation handler
exports.addUserToOrganisation = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ status: 'Not Found', message: 'User not found', statusCode: 404 });

        const organisation = await Organisation.findByPk(req.params.orgId);
        if (!organisation) return res.status(404).json({ status: 'Not Found', message: 'Organisation not found', statusCode: 404 });

        await organisation.addUser(user);

        res.status(200).json({
            status: 'success',
            message: 'User added to organisation successfully',
        });
    } catch (error) {
        res.status(400).json({ status: 'Bad request', message: 'Client error', statusCode: 400 });
    }
};
