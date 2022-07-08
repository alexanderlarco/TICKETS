const indexCtrl = {};
const pool = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

indexCtrl.mostrar = (req, res) => {
    res.render('index');
};

indexCtrl.mandar = async (req, res) => {
    const categorias = await pool.query("SELECT * FROM categorias")
    if (categorias.length == 0) {
        const categoria = categorias[0]
        if (categoria === undefined) {
            await pool.query("CREATE VIEW productoscantidad AS SELECT e.*, p.idProductos, p.productoCantidad, p.precioVenta, p.creacionProductos, p.actualizacionProductos, p.productoEntradaIdProductoEntradas, p.precioTotalVenta, u.unidadMedida, d.unidadVenta, d.cantidadVenta FROM productoentradas e JOIN productos p ON p.productoEntradaIdProductoEntradas = e.idProductoEntradas JOIN unidadmedidas u ON e.unidadMedidaIdUnidadMedidas = u.idUnidadMedidas JOIN detallecategorias d ON d.idDetalleCategorias = p.detalleCategoriaIdDetalleCategorias")
            await pool.query("CREATE VIEW ProductosLista AS SELECT p.*, e.NombreProducto, d.unidadVeneta, d.cantidadVenta FROM productos p JOIN productoentradas e ON e.idProductoEntradas = p.productoEntradaIdProductoEntradas JOIN detallecategorias d ON d.idDetalleCategorias = p.detalleCategoriaIdDetalleCategorias")
            await pool.query("CREATE VIEW listaCompras AS SELECT d.Cantidad, d.Precio, d.listaProductoIdListaProductos, l.nombreLista, p.NombreProducto, p.precioVenta, l.clienteIdClientes FROM detallelistaproductos d JOIN productoslista p ON d.productoIdProductos = p.idProductos JOIN listaproductos l ON p.tiendaIdTiendas = l.tiendaIdTiendas")
            await pool.query("CREATE VIEW detatalleEntradaProductos AS SELECT d.*, p.NombreProducto FROM detalleregistroentradas d JOIN productoentradas p ON d.productoEntradaIdProductoEntradas = p.idProductoEntradas")
            await pool.query("CREATE VIEW idmaximo AS SELECT MAX(idProductoEntradas) FROM productoentradas")
            await pool.query("CREATE VIEW idmaximoPedidos AS SELECT MAX(idPedidos) FROM pedidos")
            await pool.query("CREATE VIEW listaSalidas AS SELECT p.*, d.* FROM productoslista p JOIN detallelistaproductos d ON p.idProductos = d.productoIdProductos")
            await pool.query("CREATE VIEW categoriaProductos AS SELECT c.categoria, p.* FROM categorias c JOIN productoscantidad p ON p.categoriaIdCategorias = c.idCategorias")
            await pool.query("CREATE VIEW salidaProductos AS SELECT l.NombreProducto, d.* FROM listasalidas l JOIN detalleregistrosalidas d ON d.productoIdProductos = l.idProductos")
            await pool.query("CREATE VIEW detalle_productosentrada as select uni.unidadmedida, pro.* from productoentradas as pro join unidadmedidas uni on uni.idunidadmedidas = pro.unidadMedidaIdUnidadMedidas")
            await pool.query("CREATE VIEW detalle_pedidos AS SELECT ped.idPedidos, ped.nombre,ped.fechaPedido,pro.NombreProveedor,proe.NombreProducto,ped.cantidadPedido,ped.usuarioIdUsuarios FROM pedidos ped JOIN provedores pro on pro.idProvedores = ped.provedoreIdProvedores JOIN productoentradas proe on proe.idProductoEntradas = ped.productoEntradaIdProductoEntradas;")
            await pool.query("INSERT INTO categorias(idCategorias	, categoria) VALUES (1, 'Consumible')")
            await pool.query("INSERT INTO categorias(idCategorias	, categoria) VALUES (2, 'No consumible')")
            await pool.query("INSERT INTO categorias(idCategorias	, categoria) VALUES (3, 'Bebidas')")
            console.log(" se guardo ")
        }
    } else {
        console.log("Ya existe")
    }

    const unidadMedida = await pool.query("SELECT * FROM unidadMedidas")
    if (unidadMedida.length == 0) {
        const unidad = unidadMedida[0]
        if (unidad === undefined) {
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (1, 'Quintal', 1)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (2, 'Arrobas', 1)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (3, 'Libra', 1)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (4, 'Media Libra', 1)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (5, 'Onza', 1)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (6, 'Cajas', 2)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (7, 'sobres', 2)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (8, 'rollos', 2)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (9, 'Paquetes', 2)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (10, 'Pomos', 3)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (11, 'Bottellones', 3)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (12, 'Litros', 3)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (13, 'Medio Litro', 3)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (14, 'Cuarto de Listro', 3)")
            await pool.query("INSERT INTO unidadMedidas(idUnidadMedidas, unidadMedida, categoriaIdCategorias) VALUES (15, 'Dólar', 1)")
            console.log(" se guardo ")
        }
    } else {
        console.log("Ya existe")
    }
    const porcentajes = await pool.query("SELECT * FROM porcentajes")
    if (porcentajes.length == 0) {
        const porcentaje = porcentajes[0]
        if (porcentaje === undefined) {
            for (let i = 1; i < 100; i++) {
                let cont = 0;
                let ids = 0
                cont = cont + i;
                ids = 0 + i
                const contar = cont
                const id = ids
                if (cont < 100) {
                    await pool.query("INSERT INTO porcentajes(idPorCentaje,porcentaje) VALUES (?,?)", [id, contar])
                    console.log(" se guardo ")
                }
            }
        }
    } else {
        console.log("Ya existe")
    }

    const {validar} = req.body
    const validacion = await orm.usuarios.findOne({ where: {username: validar}})
    if(validacion){
        const validaciones = validacion
        if(validaciones.username !== null){
            res.redirect('/Login/'+ validaciones.idUsuarios);
        }else{
            res.flash('success', 'no tiene un usuario con esa cuenta porfavor registrese')
            res.redirect('/Registro')
        }
    }else{
        res.redirect('/Registro')
    }
}

module.exports = indexCtrl;