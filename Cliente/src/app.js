const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const xml = require('xml')

const { database } = require('./keys');

const app = express(); 
require('./lib/passport');

const handlebars = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'vistas', 'layouts'),
  partialsDir: path.join(__dirname, 'vistas', 'partials'),
  extname: '.hbs',
  helpres: require('./lib/handlebars')
})

/// archivos compartidos
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'vistas'));
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('view engine', '.hbs');
/// archivos compartidos


//midlewars
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
app.use(xmlparser());
//midlewars

//varible globales 
app.use((req, res, next) => {
  app.locals.menssage = req.flash('menssage');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});
//varible globales 

//public
app.use(express.static(path.join(__dirname, 'public')));
//public

//xml
  
//xml

//routers
app.use(require('./rutas/index.rutas'))
app.use(require('./rutas/registro.rutas'))
app.use(require('./rutas/usuario.rutas'))
app.use('/actualizacion', require('./rutas/actulizarDatos.rutas'));
app.use('/tienda', require('./rutas/Tienda.rutas'));
app.use('/producto', require('./rutas/productos.rutas'));
app.use('/productos', require('./rutas/Categoria.rutas'));
app.use('/Compra', require('./rutas/lista.rutas'));
app.use('/Compras', require('./rutas/compras.rutas'));
app.use('/formaPago', require('./rutas/formasPago.rutas'));
app.use('/perfil', require('./rutas/perfil'))

module.exports = app; 