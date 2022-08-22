const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, traer, editar, eliminar } = require('../controladores/impuesto.controlador')
const { isLoggedIn } = require('../lib/auth')

rutas.get('/agregar/:id', isLoggedIn, mostrar)
rutas.post('/agregar/:id', isLoggedIn, mandar)
rutas.get('/lista/:id', isLoggedIn, lista)
rutas.get('/editar/:id', isLoggedIn, traer)
rutas.get('/eliminar/:id', isLoggedIn, eliminar)
rutas.post('/editar/:id', isLoggedIn, editar)

module.exports = rutas