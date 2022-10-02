const express = require('express');
const { getClient, update } = require('../controladores/perfil.controlador');
const rutas = express.Router()

const {isLoggedIn} = require('../lib/auth')

rutas.use(isLoggedIn)

rutas.get('/', getClient)
rutas.post('/update/:id', update)


module.exports = rutas