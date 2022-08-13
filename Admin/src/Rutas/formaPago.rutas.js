const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, eliminar, tarer, editar } = require('../controladores/formaPaog.controlador')

const { isLoggedIn } = require('../lib/auth')

rutas.get('/agregar/:id', isLoggedIn, mostrar)
rutas.post('/agregar/:id', isLoggedIn, mandar)
rutas.get('/lista/:id', isLoggedIn, lista)
rutas.get('/eliminar/:id', isLoggedIn, eliminar)
rutas.get('/editar/:id', isLoggedIn, tarer)
rutas.post('/editar/:id', isLoggedIn, editar)

module.exports = rutas