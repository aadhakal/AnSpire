import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

const Login = sequelize.define('Login', {
  username: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  permission: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
}, {
	timestamps: false,
	tableName: 'Login',
});

Login.removeAttribute('id'); //remove the default column that Sequelize creates

export default Login;