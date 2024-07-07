const { User, Organisation } = require('../models');

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
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
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                organisations: user.organisations,
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(400).json({ status: 'Bad request', message: 'Failed to fetch user', statusCode: 400 });
    }
};
