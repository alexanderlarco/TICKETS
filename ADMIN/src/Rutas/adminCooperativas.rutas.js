const express = require('express');
const rutas = express.Router();

const {
	view,
	post,
	update,
	add,
	remove,
	create,
} = require('../controladores/adminMiembros.controlador');

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

rutas.get('/miembros', isLoggedIn, view);

// rutas.get('/miembros/nuevo', isLoggedIn, update);
// rutas.post('/miembros/nuevo', isLoggedIn, create);

// rutas.get('/miembros/edit/:id', isLoggedIn, update);
// rutas.post('/miembros/edit/:id', isLoggedIn, add);

// rutas.get('/miembros/eliminar/:id', isLoggedIn, remove);

// rutas.post('/miembroslogin', isLoggedIn, post);

module.exports = rutas;
