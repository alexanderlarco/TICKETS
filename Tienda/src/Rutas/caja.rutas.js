const express = require('express');
const rutas = express.Router()

const { mostrar, guardar, lista, traer, actualizar, eliminar }=require('../Controladores/cajas.controlador')

rutas.get('/agregar/:id',mostrar)
rutas.post('/agregar/',guardar)
rutas.get('/lista/:id',lista)
rutas.get('/editar/:id',traer)
rutas.post('/editar/:id',actualizar)
rutas.get('/eliminar/:id',eliminar)

module.exports = rutas;