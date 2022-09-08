const ProductoEntradaCtrl = {};

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')

ProductoEntradaCtrl.renderEntrada = async (req, res) => {
    const id = req.params.id
    const listaProveedor = await sql.query("SELECT * FROM provedores WHERE idProvedores = ?", [id])
    const listaCategoria = await sql.query("SELECT * FROM categorias ORDER BY categoria ASC")
    const idProductoEntrada = await sql.query("SELECT * FROM idmaximo")
    const listaUnidad = await sql.query("SELECT * FROM unidadMedidas ORDER BY unidadMedida ASC")
    res.render("ProductosEntrada/agregar", { listaProveedor, listaCategoria, listaUnidad, idProductoEntrada })
}

ProductoEntradaCtrl.addEntrada = async (req, res) => {

    const id = req.params.id
    const IDS = req.user.idDueñoTienda

    const {NombreProducto, codigo, CantidadTotal, unidadCantidad, precioUnidad, precioTotal, FechaCadusidad, categoriaIdCategorias, unidadMedidaIdUnidadMedidas, cantidadMedida, idproducto, provedoreIdProvedores, idDetalleC} = req.body

    const NuevaEntrada = {
        codigo,
        NombreProducto,
        CantidadTotal,
        unidadCantidad,
        precioUnidad,
        precioTotal,
        FechaCadusidad,        
        provedoreIdProvedores:provedoreIdProvedores,
        tiendaIdTiendas: IDS,
        detalleSubRolTiendaIdDetalleSubRolTienda: IDS,
        categoriaIdCategorias: categoriaIdCategorias,
        unidadMedidaIdUnidadMedidas: unidadMedidaIdUnidadMedidas
    }

    const nuevaCantidadUnidad = {
        cantidadMedida,
        unidadMedidaIdUnidadMedidas: unidadMedidaIdUnidadMedidas,
        productoEntradaIdProductoEntradas: idproducto
    }

    const nuevoProductoVenta = {
        productoCantidad: cantidadMedida,
        tiendaIdTiendas: IDS,
        detalleSubRolTiendaIdDetalleSubRolTienda: IDS,
        productoEntradaIdProductoEntradas: idproducto,
    }
    const categoriaDetalle = {
        categoriaIdCategorias:categoriaIdCategorias
    }

    await orm.entredaProductos.create(NuevaEntrada);
    await orm.detalleUnidadMedidas.create(nuevaCantidadUnidad)
    await orm.productos.create(nuevoProductoVenta)
    await orm.detalleCategoria.create(categoriaDetalle) 
    req.flash('success', "Se guardo correctamente")
    res.redirect("/ProductoEntrada/lista/1")
}

ProductoEntradaCtrl.renderProductos = async (req, res) => {
    const id = req.params.id
    const DatosProducto = await sql.query("SELECT e.*, u.unidadMedida FROM detalle_productosentrada e JOIN unidadmedidas u ON  e.unidadMedidaIdUnidadMedidas = u.idUnidadMedidas  WHERE e.tiendaIdTiendas = ?", [id])
    res.render("ProductosEntrada/lista", { DatosProducto })

}

ProductoEntradaCtrl.EliminarProductos = async (req, res) => {
    const id = req.params.id;
    await orm.entredaProductos.destroy({ where: { idProductoEntradas: id } });
    await orm.productos.destroy({ where: { idProductos: id } });
    await orm.detalleCategoria.destroy({ where: { idDetalleCategorias: id } });
    req.flash('success', 'Se Elimino Correctamente');
    res.redirect('/ProductoEntrada/lista/1');

}
ProductoEntradaCtrl.renderEditarEntrada = async (req, res) => {
    const id = req.params.id;
    const Productos = await sql.query("SELECT * FROM productoEntradas WHERE idProductoEntradas =?", [id])
    res.render("ProductosEntrada/editar", { Productos })
}
ProductoEntradaCtrl.EditarEntrada = async (req, res) => {
    const IDS = req.user.idDueñoTienda
    const id = req.params.id
    const { NombreProducto, CantidadTotal, precioTotal, FechaCadusidad } = req.body
    const EntradaEditad = {
        NombreProducto,
        CantidadTotal,
        precioTotal,
        FechaCadusidad
    }

    await orm.entredaProductos.findOne({ where: { idProductoEntradas: id } })
        .then(productoEntrada => {
            productoEntrada.update(EntradaEditad)
            req.flash('success', 'Se Actualizo Correctamente');
            res.redirect('/ProductoEntrada/lista/', IDS);
        })
}
module.exports = ProductoEntradaCtrl
