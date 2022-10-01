const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");

const dbName = process.env.DB_SCHEMAS || "tickets";
const dbHost = "localhost";
const dbPort = 3306;
const dbUser = "root";
const dbPass = "ricky0812";

const db = mysql
  .createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPass,
  })
  .then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
      console.info("Base de datos creada o comprobada correctamente");
    });
  });

const UsuarioModelos = require("../modelos/usuario/usuario");
const rolUsuarioModelo = require("../modelos/usuario/rolUsuario");
const subRolUsuarioModelo = require("../modelos/usuario/subRolUsuario");

//permisos
const permisosUsuariosModelos = require("../modelos/extras/permisosUsuarios");

//tienda
const categoriaModelos = require("../modelos/categoria/Categoria");
const tiendaModelos = require("../modelos/tienda/tienda");
const listaProductosModelos = require("../modelos/producto/listaProductos");
const provedorModelos = require("../modelos/proveedores/provedor");
const productoEntradaModelos = require("../modelos/producto/productoEntrada");
const productoModelos = require("../modelos/producto/productos");
const detalleListaProductosModelos = require("../modelos/producto/detalleListaProductos");
const registroEntradasModelos = require("../modelos/entradas/registroEntradas");
const detalleCategoriasModelos = require("../modelos/categoria/detalleCategoria");
const registroSalidasModelos = require("../modelos/salidas/registroSalidas");
const unidadMedidasModelos = require("../modelos/unidadMedida/unidadMedida");
const detalleUnidadMedidaModelos = require("../modelos/unidadMedida/detalleUnidadMedida");
const detalleRegistroEntradasModelos = require("../modelos/entradas/detalleRegistroEntradas");
const detalleRegistroSalidasModelos = require("../modelos/salidas/detalleRegistroSalidas");
const cajaModelo = require("../modelos/caja/caja");
const detalleCajaModelo = require("../modelos/caja/detallecaja");
const diaPagoModelo = require("../modelos/tienda/pago/diapago");
const gananciaDiaModelo = require("../modelos/tienda/ganancia/gananciadia");
const gananciaSemanalModelo = require("../modelos/tienda/ganancia/gananciasemanal");
const pedidosModelos = require("../modelos/proveedores/pedido/pedidos");
const detallePedidosModelos = require("../modelos/proveedores/pedido/detallePedidos");

//facturas
const facturaModelos = require("../modelos/facturaElectronica/factura");
const formaPagoModelos = require("../modelos/facturaElectronica/formaPago");
const impuestoModelo = require("../modelos/facturaElectronica/impuesto");
const impuestoRentaModelo = require("../modelos/facturaElectronica/impuestoRenta");
const informacionTributariaModelo = require("../modelos/facturaElectronica/informacionTributaria");
const pagoModelo = require("../modelos/facturaElectronica/pago");
const porcentajeIvaPresupuestoModelo = require("../modelos/facturaElectronica/porcentajeIvaPresuntivo");
const retencionModelo = require("../modelos/facturaElectronica/retencion");
const tarifaIvaModelo = require("../modelos/facturaElectronica/tarifaIva");
const tipoAmbienteModelo = require("../modelos/facturaElectronica/tipoAmbiente");
const tipoDocumentoModelo = require("../modelos/facturaElectronica/tipoDocumento");
const tipoIdentificacionModelo = require("../modelos/facturaElectronica/tipoIdentificacion");
const totalImpuestoModelo = require("../modelos/facturaElectronica/totalImpuesto");

//coneccion
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado");
  })
  .catch((err) => {
    console.log("No se conecto");
  });

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});

//cliente
const clientModel = require("../modelos/cliente/cliente");
//cliente
const client = clientModel(sequelize, Sequelize);

module.exports = {
  client,
};
