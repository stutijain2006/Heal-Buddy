const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    doctorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointmentDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    timeSlot:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    }
},
    {
        timestamps: true
    }, 
);

Appointment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Appointment, { foreignKey: 'userId' });

module.exports = Appointment;
