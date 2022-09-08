const index = {};

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

index.mostrar = (req, res) => {
    res.render('index');
};

index.madar = async(req,res) => {
     const { usernameCliente } = req.body
     const verificacion = await orm.cliente.findOne({ where: { usernameCliente: usernameCliente }})
     if(verificacion){
         const clientes = verificacion
         if(clientes.usernameCliente === null || clientes.usernameCliente === null){
              res.redirect('/actualizacion/Datos/' + clientes.idClientes);
         }else{
              res.redirect('/Login');
         }
     }else{
          res.redirect('/Registro');
     }
}

module.exports = index;