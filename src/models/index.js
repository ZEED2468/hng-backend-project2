// index.js
const User = require('./user');
const Organisation = require('./organisation');

User.belongsToMany(Organisation, { through: 'UserOrganisation', as: 'organisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisation', as: 'organisations' });

module.exports = {
    User,
    Organisation,
};
