const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./user');
const Organisation = require('./organisation');

class UserOrganisation extends Model {}

UserOrganisation.init({
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'userId',
        },
    },
    orgId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Organisation,
            key: 'orgId',
        },
    },
}, {
    sequelize,
    modelName: 'UserOrganisation',
});

module.exports = UserOrganisation;
