const express = require('express');
const rutas = express.Router();

const{mostrar, actualizar,renderBus}=require('../controladores/actualizarBus.contralador')

rutas.get('/Actualizacion/:id',mostrar)
rutas.post('/Actualizacion/:id',actualizar)
rutas.get('/editar/:id',renderBus)


module.exports=rutas

