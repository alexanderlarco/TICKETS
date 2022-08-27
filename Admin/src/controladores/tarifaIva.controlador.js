const tarifaIvaCtl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

tarifaIvaCtl.mostrar = (req, res) => {
    res.render('facturacionElectronica/tarifaIva/agregar');
}

tarifaIvaCtl.mandar = async (req, res) => {
    const id = req.user.idUsuarios
    const { nombreTarifaIva, codigoTarifaIva } = req.body
    const nuevoEnvio = {
        nombreTarifaIva,
        codigoTarifaIva
    }
    await orm.tarifaIva.create(nuevoEnvio)
    req.flash('success', 'Guardado con exito')
    res.redirect('/tarifaIva/lista/' + id);
}

tarifaIvaCtl.lista = async (req, res) => {
    const lista = await sql.query('select * from tarifaIvas')
    res.render('facturacionElectronica/tarifaIva/lista', { lista })
}

tarifaIvaCtl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from tarifaIvas where idTarifaIva = ?', [ids])
    res.render('facturacionElectronica/tarifaIva/editar', { lista })
}

tarifaIvaCtl.actualizar = async (req, res) => {
    const id = req.user.idUsuarios
    const ids = req.params.id
    const { nombreTarifaIva, codigoTarifaIva } = req.body
    const nuevoEnvio = {
        nombreTarifaIva,
        codigoTarifaIva
    }
    await orm.tarifaIva.findOne({ where: { idTarifaIva: ids } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
            req.flash('success', 'Actuaizado con exito')
            res.redirect('/tarifaIva/lista/' + id);
        })
}

tarifaIvaCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    await orm.tarifaIva.destroy({ where: { idTarifaIva: ids } })
        .then(() => {
            req.flash('success', 'Actuaizado con exito')
            res.redirect('/tarifaIva/lista/' + id);
        })
}

module.exports = tarifaIvaCtl