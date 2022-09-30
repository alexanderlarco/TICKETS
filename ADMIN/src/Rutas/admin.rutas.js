const express = require('express');
const rutas = express.Router();

const {
	view,
	signin,
	lista,
	eliminar,
	tarer,
	editar,
} = require('../controladores/admin.controlador');

// const { isLoggedIn } = require('../lib/auth');

rutas.get('/login', view);
rutas.post('/login', signin);

module.exports = rutas;
