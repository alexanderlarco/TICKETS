const express = require('express');
const { mostrar, Editar, Actualizar } = require('../controladores/perfil.controlador');
const rutas = express.Router()

const {isLoggedIn} = require('../lib/auth')

rutas.use(isLoggedIn)

rutas.get('/Cliente/:id', mostrar)
rutas.get('/Editar/:id', Editar)
rutas.post('/Editar/:id', Actualizar)


module.exports = rutas