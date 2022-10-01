const express = require('express');
const rutas = express.Router();

const { mostrar, madar } = require('../controladores/index.controlador');

rutas.get('/', mostrar);

module.exports = rutas;