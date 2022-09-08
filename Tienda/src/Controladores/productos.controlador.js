const ProductosCtrl = {};

const orm = require("../configuracionBaseDatos/baseDatos.orm");
const sql = require("../configuracionBaseDatos/baseDatos.sql");

ProductosCtrl.renderProductos = async (req, res) => {
	const id = req.params.id; 
	const productos = await sql.query(
		"SELECT * FROM productoscantidad WHERE tiendaIdTiendas = ?",
		[id]
	);
	res.render("productos/productosVenta", { productos });
};

ProductosCtrl.renderEdit = async (req, res) => {
	const id = req.params.id;
	const Productos = await sql.query(
		"SELECT * FROM detalle_productosentrada WHERE idProductoEntradas = ?",
		[id]
	);
	res.render("productos/editar", { Productos });
};

ProductosCtrl.edit = async (req, res) => {
    const id = req.params.id;
    const IDS = req.user.idDueñoTienda
    const { precioVenta, cantidadVenta } = req.body;
    const newProducto = {
        precioVenta,
        detalleCategoriaIdDetalleCategorias: id
    }
    const nuevoDetalle = {
        cantidadVenta
    }
    await orm.detalleCategoria.findOne({ where: { idDetalleCategorias: id } })
        .then(detalle => {
            detalle.update(nuevoDetalle)
        })
    await orm.productos.findOne({ where: { idProductos: id } })
        .then(provedor => {
            provedor.update(newProducto)
            req.flash('success', 'Se Actualizo Correctamente');
            res.redirect('/productos/lista/' + IDS);
        })
}

module.exports = ProductosCtrl;
