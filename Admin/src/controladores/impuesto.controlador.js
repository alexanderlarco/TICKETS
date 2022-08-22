const impuestoCtl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

impuestoCtl.mostrar = (req, res) => {
    res.render('facturacionElectronica/impuesto/agregar');
}

impuestoCtl.mandar = async (req, res) => {
    const id = req.user.idUsuarios
    const { nombreImpuesto, codigoImpuesto } = req.body
    const nuevoImpuesto = {
        nombreImpuesto,
        codigoImpuesto,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.impuesto.create(nuevoImpuesto)
    req.flash('success', 'Exito al Guardar')
    res.redirect('/impuesto/lista/' + id);
}

impuestoCtl.lista = async (req, res) => {
    const lista = await sql.query('select * from impuestos')
    res.render('facturacionElectronica/impuesto/lista', { lista })
}

impuestoCtl.eliminar = async(req, res)=>{
    const id = req.params.id
    await orm.impuesto.destroy({where: {idImpuesto: id}})
    .then(() => {
        req.flash('success', 'Exito al Eliminar')
        res.redirect('/impuesto/lista/' + id);
    })
}

impuestoCtl.traer = async (req, res) => {
    const id = req.params.id
    const lista = await sql.query('select * from impuestos where idImpuesto = ?', [id])
    res.render('facturacionElectronica/impuesto/editar', { lista })
}

impuestoCtl.editar = async (req, res) => {
    const id = req.user.idUsuarios
    const ids = req.params.id
    const { nombreImpuesto, codigoImpuesto } = req.body
    const nuevoImpuesto = {
        nombreImpuesto,
        codigoImpuesto,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.impuesto.findOne({ where: { idImpuesto: id } })
        .then(actualizar => {
            actualizar.update(nuevoImpuesto)
            req.flash('success', 'Exito al Guardar')
            res.redirect('/impuesto/lista/' + id);
        })
}

module.exports = impuestoCtl