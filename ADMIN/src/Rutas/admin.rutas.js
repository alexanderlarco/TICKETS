const express = require('express');
const rutas = express.Router();

const {
	view,
	signin,
	cierreSesion,
	login,
} = require('../controladores/admin.controlador');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

rutas.get('/', isLoggedIn, login);
rutas.get('/login', isNotLoggedIn, view);
rutas.post('/login', signin);
rutas.get('/logout', cierreSesion);

module.exports = rutas;
