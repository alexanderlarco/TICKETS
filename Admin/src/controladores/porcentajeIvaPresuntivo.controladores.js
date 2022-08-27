const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

const porcentajeIvaPresuntivoCtl = {}

porcentajeIvaPresuntivoCtl.mostrar = (req, res) =>{
    res.render('facturacionElectronica/porcentajeIva/agregar');
}

porcentajeIvaPresuntivoCtl.mandar = async(req, res) =>{
    const id = req.user.idUsuarios
    const {nombrePorcentajeIvaPresuntivo, codigoPorcentajeIvaPresuntivo, tipoPorcentajeIvaPresuntivo} = req.body
    const nuevoEnvio = {
        nombrePorcentajeIvaPresuntivo,
        codigoPorcentajeIvaPresuntivo,
        tipoPorcentajeIvaPresuntivo
    }
    await orm.porcentajeIvaPresuntivo.create(nuevoEnvio)
    req.flash('success', 'Guardado con exito')
     res.redirect('/porcentajeIvaPresuntivo/lista/' +  id);
}

porcentajeIvaPresuntivoCtl.lista = async(req, res)  =>{
    const lista  = await sql.query('select * from porcentajeivapresuntivos')
    res.render('facturacionElectronica/porcentajeIva/lista', {lista})
}

porcentajeIvaPresuntivoCtl.traer = async(req, res) =>{
    const id = req.params.id
    const lista  = await sql.query('select * from porcentajeivapresuntivos where   idporcentajeIvaPresuntivo = ?', [id])
    res.render('facturacionElectronica/porcentajeIva/editar', {lista})
}

