import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

const Service = sequelize.define('User', {
	ServiceID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	ServiceType: {
		type: DataTypes.STRING(30),
		allowNull: false,
	}
}, {
	timestamps: false,
	tableName: 'Service',
});

Service.removeAttribute('id'); //remove the default column that Sequelize creates

export default Service;