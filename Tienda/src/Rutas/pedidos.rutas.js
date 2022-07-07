const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, traer, actualizar, eliminar }=require('../Controladores/pedidos.controlador')

rutas.get('/agregar/:id',mostrar)
rutas.post('/agregar/:id',mandar)
rutas.get('/lista/:id',lista)
rutas.get('/editar/:id',traer)
rutas.post('/editar/:id',actualizar)
rutas.get('/eliminar/:id',eliminar)

module.exports = rutas;
