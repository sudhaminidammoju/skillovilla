// models.js
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('user_address_db', 'root', 'Sudhamini@08', {
    host: 'localhost',
    dialect: 'mysql'
});


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, 
{tableName: 'Users'},
{ timestamps: false });


const Address = sequelize.define('Address', {
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
},
{tableName: 'Addresses'},
{ timestamps: false });


User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });


module.exports = { User, Address, sequelize };
