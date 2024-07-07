const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config');

class Organisation extends Model {}

Organisation.init({
    orgId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Organisation',
});


module.exports = Organisation;
