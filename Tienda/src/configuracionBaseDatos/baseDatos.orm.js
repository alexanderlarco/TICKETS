const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbName = process.env.DB_SCHEMAS || "fintech";

mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
}).then(connection => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
    console.info("Base de datos creada o comprobada correctamente");
  })
})

const UsuarioModelos = require('../modelos/usuario/usuario')
const detalleRolUsuarioModelo = require('../modelos/usuario/detalleRolUsuario')
const rolUsuarioModelo = require('../modelos/usuario/rolUsuario')
const subRolUsuarioModelo = require('../modelos/usuario/subRolUsuario')

//permisos
const permisosUsuariosModelos = require('../modelos/extras/permisosUsuarios')
const permososTiendaModelos = require('../modelos/extras/permisosTineda')

//tienda
const categoriaModelos = require('../modelos/categoria/Categoria')
const tiendaModelos = require('../modelos/tienda/tienda')
const detalleSubRolTiendaModelo = require('../modelos/tienda/detalleSubRolTienda')
const dueñoTinedaModelo = require('../modelos/tienda/dueñoTienda')
const empleadoTiendaModelo = require('../modelos/tienda/empleadoTienda')
const subRolTiendaModelo = require('../modelos/tienda/subRolTienda')
const listaProductosModelos = require('../modelos/producto/listaProductos')
const provedorModelos = require('../modelos/proveedores/provedor')
const productoEntradaModelos = require('../modelos/producto/productoEntrada')
const productoModelos = require('../modelos/producto/productos')
const detalleListaProductosModelos = require('../modelos/producto/detalleListaProductos')
const registroEntradasModelos = require('../modelos/entradas/registroEntradas')
const detalleCategoriasModelos = require('../modelos/categoria/detalleCategoria')
const registroSalidasModelos = require('../modelos/salidas/registroSalidas')
const unidadMedidasModelos = require('../modelos/unidadMedida/unidadMedida')
const detalleUnidadMedidaModelos = require('../modelos/unidadMedida/detalleUnidadMedida');
const detalleRegistroEntradasModelos = require('../modelos/entradas/detalleRegistroEntradas');
const detalleRegistroSalidasModelos = require('../modelos/salidas/detalleRegistroSalidas')
const porcentajesModelos = require('../modelos/unidadMedida/porcentajes')
const cajaModelo = require('../modelos/caja/caja')
const detalleCajaModelo = require('../modelos/caja/detallecaja')
const diaPagoModelo = require('../modelos/tienda/pago/diapago')
const gananciaDiaModelo = require('../modelos/tienda/ganancia/gananciadia')
const gananciaSemanalModelo = require('../modelos/tienda/ganancia/gananciasemanal')
const pedidosModelos = require('../modelos/proveedores/pedido/pedidos')
const detallePedidosModelos = require('../modelos/proveedores/pedido/detallePedidos')

//facturas
const facturaModelos = require('../modelos/facturaElectronica/factura')
const formaPagoModelos = require('../modelos/facturaElectronica/formaPago')
const impuestoModelo = require('../modelos/facturaElectronica/impuesto')
const impuestoRentaModelo = require('../modelos/facturaElectronica/impuestoRenta')
const informacionTributariaModelo = require('../modelos/facturaElectronica/informacionTributaria')
const pagoModelo = require('../modelos/facturaElectronica/pago')
const porcentajeIvaPresupuestoModelo = require('../modelos/facturaElectronica/porcentajeIvaPresuntivo')
const retencionModelo = require('../modelos/facturaElectronica/retencion')
const tarifaIvaModelo = require('../modelos/facturaElectronica/tarifaIva')
const tipoAmbienteModelo = require('../modelos/facturaElectronica/tipoAmbiente')
const tipoDocumentoModelo = require('../modelos/facturaElectronica/tipoDocumento')
const tipoIdentificacionModelo = require('../modelos/facturaElectronica/tipoIdentificacion')
const totalImpuestoModelo = require('../modelos/facturaElectronica/totalImpuesto')

//cliente
const clienteModelos = require('../modelos/cliente/cliente')
const detalleClientesModelos = require('../modelos/cliente/detalleCliente')

//coneccion
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

//usuario
const usuarios = UsuarioModelos(sequelize, Sequelize)
const detalleRolUsuario = detalleRolUsuarioModelo(sequelize, Sequelize)
const rolUsuario = rolUsuarioModelo(sequelize, Sequelize)
const subRolUsuario = subRolUsuarioModelo(sequelize, Sequelize)
const permisosUsuarios = permisosUsuariosModelos(sequelize, Sequelize)

//tienda
const permisosTineda = permososTiendaModelos(sequelize, Sequelize)
const categoria = categoriaModelos(sequelize, Sequelize)
const tienda = tiendaModelos(sequelize, Sequelize)
const detalleSubRolTienda = detalleSubRolTiendaModelo(sequelize, Sequelize)
const dueñoTienda = dueñoTinedaModelo(sequelize, Sequelize)
const empleadoTienda = empleadoTiendaModelo(sequelize, Sequelize)
const subRolTienda = subRolTiendaModelo(sequelize, Sequelize)
const listaProductos = listaProductosModelos(sequelize, Sequelize)
const provedor = provedorModelos(sequelize, Sequelize)
const entredaProductos = productoEntradaModelos(sequelize, Sequelize)
const productos = productoModelos(sequelize, Sequelize)
const detalleListaProductos = detalleListaProductosModelos(sequelize, Sequelize)
const registroEntradas = registroEntradasModelos(sequelize, Sequelize)
const registroSalidas = registroSalidasModelos(sequelize, Sequelize)
const detalleCategoria = detalleCategoriasModelos(sequelize, Sequelize)
const unidadMedidas = unidadMedidasModelos(sequelize, Sequelize)
const detalleUnidadMedidas = detalleUnidadMedidaModelos(sequelize, Sequelize)
const detalleRegistroEntradas = detalleRegistroEntradasModelos(sequelize, Sequelize)
const detalleRegistroSalidas = detalleRegistroSalidasModelos(sequelize, Sequelize)
const porcentajes = porcentajesModelos(sequelize, Sequelize)
const caja = cajaModelo(sequelize, Sequelize)
const detalleCaja = detalleCajaModelo(sequelize, Sequelize)
const diaPago = diaPagoModelo(sequelize, Sequelize)
const gananciaDia = gananciaDiaModelo(sequelize, Sequelize)
const gananciaSemanal = gananciaSemanalModelo(sequelize, Sequelize)
const pedidos = pedidosModelos(sequelize, Sequelize)
const detallePedidos = detallePedidosModelos(sequelize, Sequelize)

//factura
const factura = facturaModelos(sequelize, Sequelize)
const formaPago = formaPagoModelos(sequelize, Sequelize)
const impuesto = impuestoModelo(sequelize, Sequelize)
const impuestoRenta = impuestoRentaModelo(sequelize, Sequelize)
const informacionTributaria = informacionTributariaModelo(sequelize, Sequelize)
const pago = pagoModelo(sequelize, Sequelize)
const porcentajeIvaPresuntivo = porcentajeIvaPresupuestoModelo(sequelize, Sequelize)
const retencion = retencionModelo(sequelize, Sequelize)
const tarifaIva = tarifaIvaModelo(sequelize, Sequelize)
const tipoAmbiente = tipoAmbienteModelo(sequelize, Sequelize)
const tipoIdentificacion = tipoIdentificacionModelo(sequelize, Sequelize)
const tipoDocumento = tipoDocumentoModelo(sequelize, Sequelize)
const totalImpuesto = totalImpuestoModelo(sequelize, Sequelize)

//cliente
const cliente = clienteModelos(sequelize, Sequelize)
const detalleCliente = detalleClientesModelos(sequelize, Sequelize)

//Relaciones 
//usuaruio
usuarios.hasMany(detalleRolUsuario)
detalleRolUsuario.belongsTo(usuarios)

rolUsuario.hasMany(detalleRolUsuario)
detalleRolUsuario.belongsTo(rolUsuario)

subRolUsuario.hasMany(detalleRolUsuario)
detalleRolUsuario.belongsTo(subRolUsuario)

permisosUsuarios.hasMany(detalleRolUsuario)
detalleRolUsuario.belongsTo(permisosUsuarios)

detalleRolUsuario.hasMany(categoria)
categoria.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(unidadMedidas)
unidadMedidas.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(formaPago)
formaPago.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(impuesto)
impuesto.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(impuestoRenta)
impuestoRenta.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(informacionTributaria)
informacionTributaria.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(pago)
pago.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(porcentajeIvaPresuntivo)
porcentajeIvaPresuntivo.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(retencion)
retencion.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(tarifaIva)
tarifaIva.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(tipoAmbiente)
tipoAmbiente.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(tipoDocumento)
tipoDocumento.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(tipoIdentificacion)
tipoIdentificacion.belongsTo(detalleRolUsuario)

detalleRolUsuario.hasMany(totalImpuesto)
totalImpuesto.belongsTo(detalleRolUsuario)

//tienda-usuario
dueñoTienda.hasMany(detalleSubRolTienda)
detalleSubRolTienda.belongsTo(dueñoTienda)

empleadoTienda.hasMany(detalleSubRolTienda)
detalleSubRolTienda.belongsTo(empleadoTienda)

subRolTienda.hasMany(detalleSubRolTienda)
detalleSubRolTienda.belongsTo(subRolTienda)

permisosTineda.hasMany(detalleSubRolTienda)
detalleSubRolTienda.belongsTo(permisosTineda)

detalleSubRolTienda.hasMany(tienda)
tienda.belongsTo(detalleSubRolTienda)

//proveedor
detalleSubRolTienda.hasMany(provedor)
provedor.belongsTo(detalleSubRolTienda)

tienda.hasMany(provedor)
provedor.belongsTo(tienda)

//productoEtrada
provedor.hasMany(entredaProductos)
entredaProductos.belongsTo(provedor)

tienda.hasMany(entredaProductos)
entredaProductos.belongsTo(tienda)

detalleSubRolTienda.hasMany(entredaProductos)
entredaProductos.belongsTo(detalleSubRolTienda)

categoria.hasMany(entredaProductos)
entredaProductos.belongsTo(categoria)

unidadMedidas.hasMany(entredaProductos)
entredaProductos.belongsTo(unidadMedidas)

//productos
tienda.hasMany(productos)
productos.belongsTo(tienda)

detalleSubRolTienda.hasMany(productos)
productos.belongsTo(detalleSubRolTienda)

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

detalleSubRolTienda.hasMany(detalleCliente)
detalleCliente.belongsTo(detalleSubRolTienda)

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

detalleSubRolTienda.hasMany(registroEntradas)
registroEntradas.belongsTo(detalleSubRolTienda)

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

detalleSubRolTienda.hasMany(registroSalidas)
registroSalidas.belongsTo(detalleSubRolTienda)

//detalle Registro
productos.hasMany(detalleRegistroSalidas)
detalleRegistroSalidas.belongsTo(productos)

registroSalidas.hasMany(detalleRegistroSalidas)
detalleRegistroSalidas.belongsTo(registroSalidas)

//nota Venta
/*tienda.hasMany(notaVenta)
notaVenta.belongsTo(tienda)

cliente.hasMany(notaVenta)
notaVenta.belongsTo(cliente)

productos.hasMany(notaVenta)
notaVenta.belongsTo(productos)

detalleListaProductos.hasMany(notaVenta)
notaVenta.belongsTo(detalleListaProductos)
*/

//factura
tipoAmbiente.hasMany(factura)
factura.belongsTo(tipoAmbiente)

tipoDocumento.hasMany(factura)
factura.belongsTo(tipoDocumento)

informacionTributaria.hasMany(factura)
factura.belongsTo(informacionTributaria)

tipoIdentificacion.hasMany(factura)
factura.belongsTo(tipoIdentificacion)

pago.hasMany(factura)
factura.belongsTo(pago)

porcentajeIvaPresuntivo.hasMany(factura)
factura.belongsTo(porcentajeIvaPresuntivo)

totalImpuesto.hasMany(factura)
factura.belongsTo(totalImpuesto)

//pago
formaPago.hasMany(pago)
pago.belongsTo(formaPago)

//totalImpuesto
impuesto.hasMany(totalImpuesto)
totalImpuesto.belongsTo(impuesto)

tarifaIva.hasMany(totalImpuesto)
totalImpuesto.belongsTo(tarifaIva)

//retencion
tarifaIva.hasMany(retencion)
retencion.belongsTo(tarifaIva)

impuestoRenta.hasMany(retencion)
retencion.belongsTo(impuestoRenta)

//tienda
tienda.hasMany(factura)
factura.belongsTo(tienda)

cliente.hasMany(factura)
factura.belongsTo(cliente)

listaProductos.hasMany(factura)
factura.belongsTo(listaProductos)

detalleSubRolTienda.hasMany(gananciaSemanal)
gananciaSemanal.belongsTo(detalleSubRolTienda)

diaPago.hasMany(gananciaSemanal)
gananciaSemanal.belongsTo(diaPago)

gananciaDia.hasMany(gananciaSemanal)
gananciaSemanal.belongsTo(gananciaDia)

//pedidos
tienda.hasMany(pedidos)
pedidos.belongsTo(tienda)

detalleSubRolTienda.hasMany(pedidos)
pedidos.belongsTo(detalleSubRolTienda)

entredaProductos.hasMany(pedidos)
pedidos.belongsTo(entredaProductos)

provedor.hasMany(pedidos)
pedidos.belongsTo(provedor)

pedidos.hasMany(detallePedidos)
detallePedidos.belongsTo(pedidos)

//cajas
tienda.hasMany(caja)
caja.belongsTo(tienda)

caja.hasMany(detalleCaja)
detalleCaja.belongsTo(caja)

detalleSubRolTienda.hasMany(caja)
caja.belongsTo(detalleSubRolTienda)

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
  detallePedidos,
  factura,
  formaPago,
  impuesto,
  impuestoRenta,
  informacionTributaria,
  pago,
  porcentajeIvaPresuntivo,
  retencion,
  tarifaIva,
  tipoAmbiente,
  tipoDocumento,
  tipoIdentificacion,
  totalImpuesto
}