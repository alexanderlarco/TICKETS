const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "fintech";

mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user     : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
        console.info("Base de datos creada o comprobada correctamente");
    })
})

const UsuarioModelos = require('../modelos/usuario/usuario')
const categoriaModelos = require('../modelos/categoria/Categoria')
const tiendaModelos = require('../modelos/tienda/tienda')
const listaProductosModelos = require('../modelos/producto/listaProductos')
const provedorModelos = require('../modelos/proveedores/provedor')
const productoEntradaModelos = require('../modelos/producto/productoEntrada')
const productoModelos = require('../modelos/producto/productos')
const clienteModelos = require('../modelos/cliente/cliente')
const detalleListaProductosModelos = require('../modelos/producto/detalleListaProductos')
const registroEntradasModelos = require('../modelos/entradas/registroEntradas')
const detalleCategoriasModelos = require('../modelos/categoria/detalleCategoria')
const registroSalidasModelos = require('../modelos/salidas/registroSalidas')
const unidadMedidasModelos = require('../modelos/unidadMedida/unidadMedida')
const detalleClientesModelos = require('../modelos/cliente/detalleCliente')
const detalleUnidadMedidaModelos = require('../modelos/unidadMedida/detalleUnidadMedida');
const detalleRegistroEntradasModelos = require('../modelos/entradas/detalleRegistroEntradas');
const detalleRegistroSalidasModelos = require('../modelos/salidas/detalleRegistroSalidas')
const porcentajesModelos = require('../modelos/unidadMedida/porcentajes')
const notaVentaModelo = require('../modelos/cliente/metodoPago/NotaVenta')
const FacturaModelo = require('../modelos/cliente/metodoPago/factura')
const cajaModelo = require('../modelos/caja/caja')
const detalleCajaModelo = require('../modelos/caja/detallecaja')
const diaPagoModelo = require('../modelos/tienda/pago/diapago')
const gananciaDiaModelo = require('../modelos/tienda/ganancia/gananciadia')
const gananciaSemanalModelo = require('../modelos/tienda/ganancia/gananciasemanal')
const pedidosModelos = require('../modelos/proveedores/pedido/pedidos')
const detallePedidosModelos =require('../modelos/proveedores/pedido/detallePedidos')


const sequelize = new Sequelize(
  'fintech',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

sequelize.sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas")
  })

const usuarios = UsuarioModelos(sequelize, Sequelize)
const categoria = categoriaModelos(sequelize, Sequelize)
const tienda = tiendaModelos(sequelize, Sequelize)
const listaProductos = listaProductosModelos(sequelize, Sequelize)
const provedor = provedorModelos(sequelize, Sequelize)
const entredaProductos = productoEntradaModelos(sequelize, Sequelize)
const productos = productoModelos(sequelize, Sequelize)
const cliente = clienteModelos(sequelize, Sequelize)
const detalleListaProductos = detalleListaProductosModelos(sequelize, Sequelize)
const registroEntradas = registroEntradasModelos(sequelize, Sequelize)
const registroSalidas = registroSalidasModelos(sequelize, Sequelize)
const detalleCategoria = detalleCategoriasModelos(sequelize, Sequelize)
const unidadMedidas = unidadMedidasModelos(sequelize, Sequelize)
const detalleCliente = detalleClientesModelos(sequelize, Sequelize)
const detalleUnidadMedidas =detalleUnidadMedidaModelos(sequelize, Sequelize)
const detalleRegistroEntradas = detalleRegistroEntradasModelos(sequelize, Sequelize)
const detalleRegistroSalidas = detalleRegistroSalidasModelos(sequelize,Sequelize)
const porcentajes = porcentajesModelos(sequelize,Sequelize)
const notaVenta = notaVentaModelo(sequelize, Sequelize)
const factura = FacturaModelo(sequelize, Sequelize)
const caja = cajaModelo(sequelize, Sequelize)
const detalleCaja = detalleCajaModelo(sequelize, Sequelize)
const diaPago = diaPagoModelo(sequelize, Sequelize)
const gananciaDia = gananciaDiaModelo(sequelize, Sequelize)
const gananciaSemanal = gananciaSemanalModelo(sequelize, Sequelize)

const pedidos = pedidosModelos(sequelize, Sequelize)
const detallePedidos = detallePedidosModelos(sequelize, Sequelize)



//Relaciones 

//tienda-usuario
usuarios.hasMany(tienda)
tienda.belongsTo(usuarios)

//proveedor
usuarios.hasMany(provedor)
provedor.belongsTo(usuarios)

tienda.hasMany(provedor)
provedor.belongsTo(tienda)

//productoEtrada

provedor.hasMany(entredaProductos)
entredaProductos.belongsTo(provedor)

tienda.hasMany(entredaProductos)
entredaProductos.belongsTo(tienda)

usuarios.hasMany(entredaProductos)
entredaProductos.belongsTo(usuarios)

categoria.hasMany(entredaProductos)
entredaProductos.belongsTo(categoria)

unidadMedidas.hasMany(entredaProductos)
entredaProductos.belongsTo(unidadMedidas)

//productos
tienda.hasMany(productos)
productos.belongsTo(tienda)

usuarios.hasMany(productos)
productos.belongsTo(usuarios)

entredaProductos.hasMany(productos)
productos.belongsTo(entredaProductos)

//unidadMedida
categoria.hasMany(unidadMedidas)
unidadMedidas.belongsTo(categoria)

//detalle categoria
categoria.hasMany(detalleCategoria)
detalleCategoria.belongsTo(categoria)

detalleCategoria.hasMany(productos)
productos.belongsTo(detalleCategoria)

//DETALLE CLIENTE
cliente.hasMany(detalleCliente)
detalleCliente.belongsTo(cliente)

usuarios.hasMany(detalleCliente)
detalleCliente.belongsTo(usuarios)

//Detalle unidad Medida
unidadMedidas.hasMany(detalleUnidadMedidas)
detalleUnidadMedidas.belongsTo(unidadMedidas)

entredaProductos.hasMany(detalleUnidadMedidas)
detalleUnidadMedidas.belongsTo(entredaProductos)

//lista prodcutos
tienda.hasMany(listaProductos)
listaProductos.belongsTo(tienda)

cliente.hasMany(listaProductos)
listaProductos.belongsTo(cliente)

//detalleLista
listaProductos.hasMany(detalleListaProductos)
detalleListaProductos.belongsTo(listaProductos)

productos.hasMany(detalleListaProductos)
detalleListaProductos.belongsTo(productos)

//registro Entradas
tienda.hasMany(registroEntradas)
registroEntradas.belongsTo(tienda)

provedor.hasMany(registroEntradas)
registroEntradas.belongsTo(provedor)

usuarios.hasMany(registroEntradas)
registroEntradas.belongsTo(usuarios)

//Detalle Registro Entradas

entredaProductos.hasMany(detalleRegistroEntradas)
detalleRegistroEntradas.belongsTo(entredaProductos)

registroEntradas.hasMany(detalleRegistroEntradas)
detalleRegistroEntradas.belongsTo(registroEntradas)

//registro Salidas
tienda.hasMany(registroSalidas)
registroSalidas.belongsTo(tienda)

cliente.hasMany(registroSalidas)
registroSalidas.belongsTo(cliente)

usuarios.hasMany(registroSalidas)
registroSalidas.belongsTo(usuarios)

//detalle Registro
productos.hasMany(detalleRegistroSalidas)
detalleRegistroSalidas.belongsTo(productos)

registroSalidas.hasMany(detalleRegistroSalidas)
detalleRegistroSalidas.belongsTo(registroSalidas)

//nota Venta
tienda.hasMany(notaVenta)
notaVenta.belongsTo(tienda)

cliente.hasMany(notaVenta)
notaVenta.belongsTo(cliente)

productos.hasMany(notaVenta)
notaVenta.belongsTo(productos)

detalleListaProductos.hasMany(notaVenta)
notaVenta.belongsTo(detalleListaProductos)

//factura

tienda.hasMany(factura)
factura.belongsTo(tienda)

cliente.hasMany(factura)
factura.belongsTo(cliente)

productos.hasMany(factura)
factura.belongsTo(productos)

detalleListaProductos.hasMany(factura)
factura.belongsTo(detalleListaProductos)

caja.hasMany(detalleCaja)
detalleCaja.belongsTo(caja)

usuarios.hasMany(caja)
caja.belongsTo(usuarios)

usuarios.hasMany(gananciaSemanal)
gananciaSemanal.belongsTo(usuarios)

diaPago.hasMany(gananciaSemanal)
gananciaSemanal.belongsTo(diaPago)

gananciaDia.hasMany(gananciaSemanal)
gananciaSemanal.belongsTo(gananciaDia)

//pedidos
tienda.hasMany(pedidos)
pedidos.belongsTo(tienda)

usuarios.hasMany(pedidos)
pedidos.belongsTo(usuarios)

entredaProductos.hasMany(pedidos)
pedidos.belongsTo(entredaProductos)

provedor.hasMany(pedidos)
pedidos.belongsTo(provedor)

pedidos.hasMany(detallePedidos)
detallePedidos.belongsTo(pedidos)

//cajas
tienda.hasMany(caja)
caja.belongsTo(tienda)

usuarios.hasMany(caja)
caja.belongsTo(usuarios)

caja.hasMany(detalleCaja)
detalleCaja.belongsTo(caja)

module.exports = {
  usuarios,
  categoria,
  tienda,
  detalleListaProductos,
  provedor,
  entredaProductos,
  productos,
  cliente,
  listaProductos,
  registroEntradas,
  detalleCategoria,
  unidadMedidas,
  detalleCliente,
  detalleUnidadMedidas,
  detalleRegistroEntradas,
  detalleRegistroSalidas,
  registroSalidas,
  porcentajes,
  notaVenta,
  factura,
  caja,
  detalleCaja,
  diaPago,
  gananciaDia,
  gananciaSemanal,
  pedidos,
  detallePedidos

}