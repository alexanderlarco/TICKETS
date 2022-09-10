const indexCtrl = {};
const pool = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')
const CryptoJS = require('crypto-js')

indexCtrl.mostrar = (req, res) => {
    res.render('index');
};

indexCtrl.mandar = async (req, res) => {
    
    await pool.query("CREATE OR REPLACE VIEW productoscantidad AS SELECT e.*, p.idProductos, p.productoCantidad, p.precioVenta, p.creacionProductos, p.actualizacionProductos, p.productoEntradaIdProductoEntradas, p.precioTotalVenta, u.unidadMedida, d.unidadVenta, d.cantidadVenta FROM productoentradas e JOIN productos p ON p.productoEntradaIdProductoEntradas = e.idProductoEntradas JOIN unidadmedidas u ON e.unidadMedidaIdUnidadMedidas = u.idUnidadMedidas JOIN detallecategorias d ON d.idDetalleCategorias = p.detalleCategoriaIdDetalleCategorias")
    await pool.query("CREATE OR REPLACE VIEW ProductosLista AS SELECT p.*, e.NombreProducto, d.unidadVenta, d.cantidadVenta FROM productos p JOIN productoentradas e ON e.idProductoEntradas = p.productoEntradaIdProductoEntradas JOIN detallecategorias d ON d.idDetalleCategorias = p.detalleCategoriaIdDetalleCategorias")
    await pool.query("CREATE OR REPLACE VIEW listaCompras AS SELECT d.Cantidad, d.Precio, d.listaProductoIdListaProductos, l.nombreLista, p.NombreProducto, p.precioVenta, l.clienteIdClientes FROM detallelistaproductos d JOIN productoslista p ON d.productoIdProductos = p.idProductos JOIN listaproductos l ON p.tiendaIdTiendas = l.tiendaIdTiendas")
    await pool.query("CREATE OR REPLACE VIEW detatalleEntradaProductos AS SELECT d.*, p.NombreProducto, p.precioUnidad FROM detalleregistroentradas d JOIN productoentradas p ON d.productoEntradaIdProductoEntradas = p.idProductoEntradas")
    await pool.query("CREATE OR REPLACE VIEW listaSalidas AS SELECT p.*, d.* FROM productoslista p JOIN detallelistaproductos d ON p.idProductos = d.productoIdProductos")
    await pool.query("CREATE OR REPLACE VIEW categoriaProductos AS SELECT c.categoria, p.* FROM categorias c JOIN productoscantidad p ON p.categoriaIdCategorias = c.idCategorias")
    await pool.query("CREATE OR REPLACE VIEW salidaProductos AS SELECT l.NombreProducto, d.* FROM listasalidas l JOIN detalleregistrosalidas d ON d.productoIdProductos = l.idProductos")
    await pool.query("CREATE OR REPLACE VIEW detalle_productosentrada as select u.unidadmedida, p.*, d.cantidadMedida from productoentradas p join unidadmedidas u on u.idunidadmedidas = p.unidadMedidaIdUnidadMedidas join detalleunidadmedidas d on u.idunidadmedidas = d.unidadMedidaIdUnidadMedidas")

    const { validar } = req.body
    const validacion = await orm.usuarios.findOne({ where: { usernameUsuarios: validar } })
    if (validacion) {
        const validaciones = validacion
        if (validaciones.usernameUsuarios !== null) {
            res.redirect('/Login/' + validaciones.idUsuarios);
        } else {
            res.flash('success', 'no tiene un usuario con esa cuenta porfavor registrese')
            res.redirect('/Registro')
        }
    } else {
        res.redirect('/Registro')
    }
}

module.exports = indexCtrl;