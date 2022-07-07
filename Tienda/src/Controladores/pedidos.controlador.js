const PedidosCtrl = {};

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')
 
PedidosCtrl.mostrar = async (req,res) => {
    const id = req.params.id
    const listaProveedor = await sql.query("SELECT * FROM provedores WHERE idProvedores = ?", [id])
    const listaProductos =await sql.query("SELECT * FROM productoentradas pro JOIN provedores p ON provedoreIdProvedores = idProvedores WHERE idProvedores =?", [id])
    const listapedidos = await sql.query("SELECT * FROM pedidos ORDER BY idPedidos ASC")   
    const idPedidos = await sql.query("SELECT * FROM idmaximoPedidos") 
    res.render('pedidos/pedidosAgregar',{listaProveedor,listaProductos,listapedidos,idPedidos});
}

PedidosCtrl.mandar = async (req,res) => {
    const id = req.user.idUsuarios
    const ids = req.params.id
    const { nombre, fechaPedido,cantidadPedido,provedoreIdProvedores,productoEntradaIdProductoEntradas,NumeroPedido, } = req.body;
    const newPedido = {
        nombre,
        fechaPedido,
        cantidadPedido,
        tiendaIdTiendas: id,        
        usuarioIdUsuarios: id,
        productoEntradaIdProductoEntradas:productoEntradaIdProductoEntradas,
        provedoreIdProvedores: provedoreIdProvedores,
    }
    await orm.pedidos.create(newPedido)
    req.flash('success', "Se guardo correctamente")
    res.redirect("/pedidos/lista/" + id)
}

PedidosCtrl.traer = async(req,res)=>{
    const ids = req.params.id
    const editar = await sql.query('SELECT * FROM pedidos  WHERE idPedidos = ?', [ids])
    res.render('pedidos/pedidosEditar',{editar})
}
PedidosCtrl.lista = async(req,res)=>{
    const ids = req.params.id
    const pedidoslista = await sql.query('SELECT * FROM detalle_pedidos  WHERE usuarioIdUsuarios = ?', [ids])
    const traer = await sql.query('SELECT DISTINCT nombre FROM detalle_pedidos')
    res.render('pedidos/pedidosLista',{traer, pedidoslista})
}
PedidosCtrl.actualizar = async (req,res)=>{
    const id = req.user.idUsuarios
    const ids = req.params.id
    const { nombre, fechaPedido,precioPedido,cantidadPedido, } = req.body;
    const pedidoEditar = { 
        nombre,
        fechaPedido,
        precioPedido,
        cantidadPedido
    }
    await orm.pedidos.findOne({ where: { idPedidos: ids } })
    .then(actulizar=>{
        actulizar.update(pedidoEditar)
        req.flash('success', "Se Actulizo correctamente")
        res.redirect("/pedidos/lista/1")
    })
}
PedidosCtrl.eliminar = async (req, res) => {
    const id = req.params.id;
    await orm.pedidos.destroy({ where: { idPedidos: id } })
    req.flash('success', 'Se Elimino Correctamente')
    res.redirect("/pedidos/lista/1") 

};

module.exports = PedidosCtrl;