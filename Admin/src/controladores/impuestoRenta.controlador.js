const impuestoRentaCtl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

impuestoRentaCtl.mostrar = (req, res) => {
    res.render('facturacionElectronica/impuestoRenta/agregar');
}

impuestoRentaCtl.mandar = async (req, res) => {
    const id = req.user.idUsuarios
    const { nombreImpuestoRenta, codigoImpuestoRenta } = req.body
    const nuevoImpuesto = {
        nombreImpuestoRenta, 
        codigoImpuestoRenta,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.impuestoRenta.create(nuevoImpuesto)
    req.flash('success', 'Exito al Guardar')
    res.redirect('/impuestoRenta/lista/' + id);
}

impuestoRentaCtl.lista = async (req, res) => {
    const lista = await sql.query('select * from impuestoRentas')
    res.render('facturacionElectronica/impuesto/lista', { lista })
}

impuestoRentaCtl.eliminar = async(req, res)=>{
    const id = req.params.id
    await orm.impuestoRenta.destroy({where: {idImpuestoRenta: id}})
    .then(() => {
        req.flash('success', 'Exito al Eliminar')
        res.redirect('/impuestoRenta/lista/' + id);
    })
}

impuestoRentaCtl.traer = async (req, res) => {
    const id = req.params.id
    const lista = await sql.query('select * from impuestoRentas where idImpuestoRenta = ?', [id])
    res.render('facturacionElectronica/impuestoRenta/editar', { lista })
}

impuestoRentaCtl.editar = async (req, res) => {
    const id = req.user.idUsuarios
    const ids = req.params.id
    const { nombreImpuestoRenta, codigoImpuestoRenta } = req.body
    const nuevoImpuestoRenta = {
        nombreImpuestoRenta,
        codigoImpuestoRenta,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.impuesto.findOne({ where: { idImpuestoRenta: ids } })
        .then(actualizar => {
            actualizar.update(nuevoImpuestoRenta)
            req.flash('success', 'Exito al Guardar')
            res.redirect('/impuestoRenta/lista/' + id);
        })
}

impuestoRentaCtl.eliminar = async (req, res) => {
    const ids = req.params.id
    const id = req.user.idUsuarios
    await orm.impuestoRenta.destroy({ where: { idImpuestoRenta: ids } })
        .then(() => {
            req.flash('success', 'Actuaizado con exito')
            res.redirect('/impuestoRenta/lista/' + id);
        })
}

module.exports = impuestoRentaCtl