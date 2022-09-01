const tipoAmbiente = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

tipoAmbiente.mostrar = (req, res) => {
    res.render('facturacionElectronica/tipoAmbiente/agregar');
}

tipoAmbiente.mandar = async (req, res) => {
    const id = req.user.idUsuarios
    const { nombreTipoAmbiente, estadoTipoAmbiente } = req.body
    const nuevoEnvio = {
        nombreTipoAmbiente,
        estadoTipoAmbiente,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.tipoAmbiente.create(nuevoEnvio)
    req.flash('success', 'Guardado Con Exito')
    res.redirect('/tipoAmbiente/lista/' + id);
}

tipoAmbiente.lista = async (req, res) => {
    const lista = await sql.query('select * from tipoAmbientes')
    res.render('facturacionElectronica/tipoAmbiente/lista', { lista })
}

tipoAmbiente.editar = async (req, res) => {
    const id = req.params.id
    const lista = await sql.query('select * from tipoAmbientes where idTipoAmbiente = ?', [id])
    res.render('facturacionElectronica/tipoAmbiente/editar', { lista })
}

tipoAmbiente.actualizar = async (req, res) => {
    const ids = req.params.id
    const id = req.user.idUsuarios
    const { nombreTipoAmbiente, estadoTipoAmbiente } = req.body
    const nuevoEnvio = {
        nombreTipoAmbiente,
        estadoTipoAmbiente,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.tipoAmbiente.findOne({ where: { idTipoAmbiente: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
            req.flash('success', 'Actualizado Con Exito')
            res.redirect('/tipoAmbiente/lista/' + id);
        })
}

tipoAmbiente.eliminar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    await orm.tipoAmbiente.destroy({ where: { idTipoAmbiente: id } })
    req.flash('success', 'Eliminado Con Exito')
    res.redirect('/tipoAmbiente/lista/' + ids);
}

module.exports = tipoAmbiente