const { DataTypes } = require('sequelize');
const sequelize= require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true
    },
    referralCode:{
        type: DataTypes.STRING,
        allowNull: true
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports= User;