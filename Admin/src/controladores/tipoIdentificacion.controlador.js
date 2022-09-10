const tipoIdentificacionCtl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

tipoIdentificacionCtl.mostrar = (req, res) =>{
    res.render('facturacionElectronica/tipoIdentificacion/agregar');
}

tipoIdentificacionCtl.mandar = async(req, res) =>{
    const id = req.user.idUsuarios
    const {nombreTipoIdentificacion, codigoTipoItentificacion, estadoTipoIdentificacion} = req.body
    const nuevoEnvio = {
        nombreTipoIdentificacion,
        codigoTipoItentificacion,
        estadoTipoIdentificacion,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.tipoDocumento.create(nuevoEnvio)
    req.flash('success', 'se guardo con exito')
    res.redirect('/tipoIdentificacion/lista/'+ id);
}

tipoIdentificacionCtl.lista = async(req, res)=>{
    const lista = await sql.query('select * from tipoidentificaciones')
    res.render('facturacionElectronica/tipoIdentificacion/editar', lista)
}

tipoIdentificacionCtl.traer= async(req, res)=>{
    const id = req.params.id
    const lista = await sql.query('select * from tipoidentificaciones where idTipoIdentificacion = ?', [id])
    res.render('facturacionElectronica/tipoIdentificacion/editar', lista) 
}

tipoIdentificacionCtl.actualizar = async(req, res) =>{
    const id = req.user.idUsuarios
    const ids = req.params.id
    const {nombreTipoIdentificacion, codigoTipoItentificacion, estadoTipoIdentificacion} = req.body
    const nuevoEnvio = {
        nombreTipoIdentificacion,
        codigoTipoItentificacion,
        estadoTipoIdentificacion,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.tipoIdentificacion.findOne({ where: { idTipoIdentificacion: ids}})
    .then(actualizar =>{
        actualizar.update(nuevoEnvio)
        req.flash('success', 'se guardo con exito')
        res.redirect('/tipoIdentificacion/lista/'+ id);
    })
}

tipoIdentificacionCtl.eliminar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    await orm.tipoIdentificacion.destroy({ where: { idTipoIdentificacion: id } })
    req.flash('success', 'Eliminado Con Exito')
    res.redirect('/tipoIdentificacion/lista/' + ids);
}

module.exports = tipoIdentificacionCtl