const express = require('express');
const rutas = express.Router();

const{mostrar, actualizar,renderHorario}=require('../controladores/actualizarHorario.controladores')


rutas.get('/actualizacion/:id',mostrar)
rutas.post('/actualizacion/:id',actualizar)
rutas.get('/editar/:id',renderHorario)


module.exports=rutas
