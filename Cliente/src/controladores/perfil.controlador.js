const perfil = {}
const sql = require("../configuracionBaseDatos/baseDatos.sql")
const orm = require("../configuracionBaseDatos/baseDatos.orm")

perfil.mostrar = async(req, res)=>{
    console.log('req');
    const client = req.user
    res.render('perfil/perfil', {client});
}

perfil.Editar = async(req, res)=>{
    const ids = req.user.idClientes
    const cliente = await sql.query("SELECT * FROM clientes where idClientes = ?", [ids])
    res.render('perfil/editar', {cliente});
}

perfil.Actualizar = async(req, res)=>{
    const ids = req.user.idClientes
    const {Nombres, Direccion, username, telefono, Celular} = req.body
    const actulizacion={
        Nombres, 
        Direccion, 
        username, 
        telefono, 
        Celular  
    }
    await orm.cliente.findOne({ where: { idClientes: ids } })
    .then(clienteActualizacion => {
        clienteActualizacion.update(actulizacion)
        req.flash('success', 'Se añadio Correctamente');
        res.redirect('/perfil/Cliente/' + ids);
    })
}

module.exports = perfil