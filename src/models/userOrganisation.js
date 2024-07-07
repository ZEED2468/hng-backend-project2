const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
const Organisation = require('./organisation'); // Adjust path as per your file structure
const User = require('./user'); // Adjust path as per your file structure

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
