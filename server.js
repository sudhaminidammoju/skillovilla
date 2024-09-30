// server.js
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const sequelize = new Sequelize('user_address_db', 'root', 'Sudhamini@08', {
    host: 'localhost',
    dialect: 'mysql'
});


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });


const Address = sequelize.define('Address', {
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });


User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });


sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database', err));


app.post('/register', async (req, res) => {
    console.log('Received request:', req.body);
    try {
        const { name, address } = req.body;
        console.log('Received data:', { name, address });
        
        let user = await User.findOne({where: {name}});
        if (!user) {
        user = await User.create({ name });
    }

        
        const newAddress = await Address.create({ address, userId: user.id });

        res.status(201).json({ message: 'User and address saved successfully', user, address: newAddress });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error saving data' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
