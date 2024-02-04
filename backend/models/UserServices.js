import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

import combined_data from './combined_data.js';
import Service from './Service.js';

const UserServices = sequelize.define('UserServices', {
  // Composite primary key
  UserID: {
    type: DataTypes.STRING(50),
    primaryKey: true,
	allowNull: false
  },
  ServiceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
},  {
	timestamps: false,
	tableName: 'UserServices',
});
//create foreign key constraints
UserServices.belongsTo(combined_data, {
  foreignKey: 'UserID',
  targetKey: 'id',
});

UserServices.belongsTo(Service, {
  foreignKey: 'ServiceID',
  targetKey: 'ServiceID',
});

UserServices.removeAttribute('id'); //remove the default column that Sequelize creates

export default UserServices;