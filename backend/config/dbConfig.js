const HOST = "server name";
const USER = "userName";
const PASSWORD = "Password";
const DB = "DB name";
const dialect = "mssql";
const pool = {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000
};

export default {
	HOST,
	USER,
	PASSWORD,
	DB,
	dialect,
	pool
};