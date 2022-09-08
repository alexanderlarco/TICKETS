const tipoDocumentoCtl = {}

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

tipoDocumentoCtl.mostrar = (req, res) =>{
    res.render('facturacionElectronica/tipoDocumentacion/agregar');
}

tipoDocumentoCtl.Mandar = async(req, res) =>{
    const id = req.user.idUsuarios
    const {nombreTipoDocumento, codigoTipoDocumento, estadoTipoDocumento} = req.body
    const nuevoEnvio = {
        nombreTipoDocumento,
        codigoTipoDocumento,
        estadoTipoDocumento,
        detalleRolUsuarioIdDetalleRolUsuario: id
    }
    await orm.tipoDocumento.create(nuevoEnvio)
    req.flash('success', 'se guardo con exito')
    res.redirect('/tipoDocumento/lista/'+ id);
}

tipoDocumentoCtl.lista = async(req, res)=>{
    const lista = await sql.query('select * from tipoDocumentos')
    res.render('facturacionElectronica/tipoDocumentacion/editar', lista)
}

tipoDocumentoCtl.traer= async(req, res)=>{
    const id = req.params.id
    const lista = await sql.query('select * from tipoDocumentos where idTipoDocumento = ?', [id])
    res.render('facturacionElectronica/tipoDocumentacion/editar', lista) 
}

