const express = require('express');

const rutas = express.Router()

const { isLoggedIn } = require('../lib/auth');

const {mostrar, mandar} = require('../Controladores/perfil.controlador')

rutas.get('/lista/:id', isLoggedIn, mostrar)
rutas.post('/lista/:id', isLoggedIn, mandar)


module.exports = rutas