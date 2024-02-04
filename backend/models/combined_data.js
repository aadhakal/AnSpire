import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

//create User table
const combined_data = sequelize.define('combined_data', {
	id: {
		type: DataTypes.STRING(50),
		//defaultValue: DataTypes.UUIDV4, //creates new UUID value when inserting into db
		primaryKey: true,
		allowNull: false,
	},
	Name: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	Email: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	Address: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	State: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	PostalCode: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	AccountLastPayment: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	DevicePaymentPlan: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	CreditCardNumber: {
    type: DataTypes.STRING(30), // Assuming credit card numbers as strings for accuracy
    allowNull: true,
  },
  CreditCardType: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
}, 	{
	timestamps: false,
	tableName: 'combined_data',
});

export default combined_data;