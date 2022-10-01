const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const adminModel = require('../modelos/admin/admin');
const cooperativaModel = require('../modelos/cooperativa/cooperativas');
const miembroModel = require('../modelos/miembro/miembros');

const dbName = process.env.DB_SCHEMAS || 'tickets';

mysql
	.createConnection({
		host: process.env.DB_HOST || '127.0.0.1',
		port: process.env.DB_PORT || '3306',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
	})
	.then((connection) => {
		connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
			console.info('Base de datos creada o comprobada correctamente');
		});
	});

//Conexion
const sequelize = new Sequelize('tickets', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		require: 30000,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Conectado');
	})
	.catch((err) => {
		console.log('No se conecto');
	});

sequelize.sync({ force: false }).then(() => {
	console.log('Tablas sincronizadas');
});

//ADMIN
const admin = adminModel(sequelize, Sequelize);
const cooperativa = cooperativaModel(sequelize, Sequelize);
const miembro = miembroModel(sequelize, Sequelize);

module.exports = {
	admin,
	cooperativa,
	miembro,
};
