const express = require('express');
const { getIndex} = require('../controladores/dashboard.controller');
const rutas = express.Router()

const {isLoggedIn} = require('../lib/auth')

rutas.use(isLoggedIn)

rutas.get('/', getIndex)/* 
rutas.get('/Editar/:id', Editar)
rutas.post('/Editar/:id', Actualizar) */


module.exports = rutas