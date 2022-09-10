const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, actualizar, eliminar } = require('../controladores/tipoDocumentacion.controlador')
const { isLoggedIn } = require('../lib/auth')

rutas.get('/agregar/:id', isLoggedIn, mostrar)
rutas.post('/agregar/:id', isLoggedIn, mandar)
rutas.get('/lista/:id', isLoggedIn, lista)
rutas.get('/editar/:id', isLoggedIn, actualizar)
rutas.get('/eliminar/:id', isLoggedIn, eliminar)

module.exports = rutas