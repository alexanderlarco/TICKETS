const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); 
const mysqlstore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const fileUpload = require("express-fileupload");

const { database } = require('./keys'); 

const app = express();
require('./lib/passport');

/// archivos compartidos
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'vistas'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpres: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
/// archivos compartidos


//midlewars
app.use(fileUpload());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(session({
    secret: 'FINTECH',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//midlewars

//varible globales 
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});
//varible globales 

//public
app.use(express.static(path.join(__dirname, 'public')));
//public 

//routers
app.use(require('./Rutas/index.rutas'))
app.use(require('./Rutas/Registro.rutas'))
app.use(require('./Rutas/usuario.rutas'))
app.use('/tienda', require('./Rutas/tienda.rutas'))
app.use('/clientes', require('./Rutas/Clientes.rutas'))
app.use('/ProductoEntrada', require('./Rutas/ProductosEntrada.rutas'))
app.use('/proveedor', require('./Rutas/proveedor.rutas'))
app.use('/productos', require('./Rutas/Productos.rutas'))
app.use('/entradaSalida', require('./Rutas/entradaSalida.rutas'))
app.use('/detalleProducto', require('./Rutas/detalleProducto.rutas'))
app.use('/pedidos',require('./Rutas/pedidos.rutas'))
app.use('/cajas', require('./Rutas/caja.rutas'))
app.use('/perfil', require('./Rutas/perfil.rutas'))

module.exports = app;