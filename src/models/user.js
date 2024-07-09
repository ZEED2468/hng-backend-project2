const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class User extends Model {}

User.init({
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    }, 
 }, {
        sequelize,
        modelName: 'User',
    });



module.exports = User;


