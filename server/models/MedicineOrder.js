const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const MedicineOrder= sequelize.define('MedicineOrder', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    prescriptionUrl: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    medicines: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deliveryAddress:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    }
});

MedicineOrder.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(MedicineOrder, { foreignKey: 'userId' });

module.exports= MedicineOrder;