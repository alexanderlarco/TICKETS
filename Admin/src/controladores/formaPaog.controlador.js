const formaPagoCtl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

formaPagoCtl.mostrar = (req, res) => {
    res.render('facturacionElectronica/formasPago/agregar');
}

formaPagoCtl.mandar = async (req, res) => {
    const id = req.user.idUsuarios
    const { nombreFormaPago, codigoFormaPagos } = req.body
    const nuevoEnvio = {
        nombreFormaPago,
        codigoFormaPagos,
        usuarioIdUsuarios: id
    }
    await orm.formaPago.create(nuevoEnvio)
    req.flash('success', 'Se Guardo con exito')
    res.redirect('/formaPago/lista/' + id);
}

formaPagoCtl.lista = async (req, res) => {
    const lista = await sql.query('select * from formaPagos')
    res.render('facturacionElectronica/formasPago/lista', { lista })
}

formaPagoCtl.eliminar = async (req, res) => {
    const id = req.params.id
    await orm.formaPago.destroy({ where: { idFormaPagos: id } })
        .then(() => {
            req.flash('success', 'se elimino con exito')
            res.redirect('/formaPago/lista/' + ids);
        })
}

formaPagoCtl.tarer = async (req, res) => {
    const id = req.params.id
    const lista = await sql.query('select * from formaPagos where idFormaPagos = ?', [id])
    res.render('facturacionElectronica/formasPago/editar', { lista })
}

formaPagoCtl.editar = async (req, res) => {
    const id = req.params.id
    const ids = req.user.idUsuarios
    const { nombreFormaPago, codigoFormaPagos } = req.body
    const nuevoEnvio = {
        nombreFormaPago,
        codigoFormaPagos
    }
    await orm.formaPago.findOne({ where: { idFormaPagos: id } })
        .then(actualizar => {
            actualizar.update(nuevoEnvio)
            req.flash('success', 'se actualizo con exito')
            res.redirect('/formaPago/lista/' + ids);
        })
}

module.exports = formaPagoCtl