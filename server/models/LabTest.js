const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const LabTest = sequelize.define('LabTest', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    testName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mode: {
        type: DataTypes.ENUM('home', 'lab'),
        allowNull: false
    },
    testDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    timeSlot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    resultUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

LabTest.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(LabTest, { foreignKey: 'userId' });

module.exports = LabTest;
