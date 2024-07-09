const sequelize = require('../config');
const User = require('./user');
const Organisation = require('./organisation');
const UserOrganisation = require('./userOrganisation');

// Define associations
User.belongsToMany(Organisation, {
    through: UserOrganisation,
    as: 'organisations',
    foreignKey: 'userId',
});

Organisation.belongsToMany(User, {
    through: UserOrganisation,
    as: 'users',
    foreignKey: 'orgId',
});

module.exports = {
    sequelize, // Export the sequelize instance
    User,
    Organisation,
    UserOrganisation,
};
