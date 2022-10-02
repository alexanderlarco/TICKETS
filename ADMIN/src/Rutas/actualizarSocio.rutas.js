const express = require('express');
const rutas = express.Router();

const{mostrar, actualizar,renderSocio}=require('../controladores/actualizarSocio.controlador')

rutas.get('/Actualizacion/:id',mostrar)
rutas.post('/Actualizacion/:id',actualizar)
rutas.get('/editar/:id',renderSocio)


module.exports=rutas
