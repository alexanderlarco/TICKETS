const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');


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

const adminModel = require('../modelos/admin/admin');
const socioModel = require('../modelos/socio/socio');
const busModel =   require('../modelos/bus/bus');
const horarioModel = require('../modelos/horario/horario');
const coopperativaModel = require('../modelos/cooperativa/cooperativas');
const miembroModel=require('../modelos/miembro/miembros');


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
const bus= busModel(sequelize,Sequelize);
const cooperativa= coopperativaModel(sequelize,Sequelize);
const horario=horarioModel(sequelize,Sequelize);
const miembro= miembroModel(sequelize,Sequelize);
const socio= socioModel(sequelize,Sequelize);




//cliente
// const cliente = clienteModelos(sequelize, Sequelize)
// const detalleCliente = detalleClientesModelos(sequelize, Sequelize)

//Relaciones

module.exports = {
	admin,
	bus,
	cooperativa,
	horario,
	miembro,
	socio,
};
