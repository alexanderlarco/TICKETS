const index = {};

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

index.mostrar = (req, res) => {
    res.render('index');
};


module.exports = index;