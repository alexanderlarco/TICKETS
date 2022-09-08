const registro = {};

const passport = require('passport');

const sql = require('../configuracionBaseDatos/baseDatos.sql')
const orm = require('../configuracionBaseDatos/baseDatos.orm')

registro.mostrarRegistro = async (req, res) => {
    const usuario = await sql.query('select max(idDueñoTienda) from dueñoTiendas')
    res.render('Usuario/Registro',{usuario});
};

registro.Registro = passport.authenticate('local.signup', {
    successRedirect: '/CerrarSecion',
    failureRedirect: '/Registro',
    failureFlash: true
});

registro.mostrarLogin = async (req, res, next) => {
    const ids = req.params.id
    const Usuario = await sql.query('select idDueñoTienda, usernameDueñoTienda from dueñoTiendas where idDueñoTienda = ?', [ids])
    res.render('Usuario/Login', { Usuario });
};

registro.Login = passport.authenticate('local.signin', {
        successRedirect: '/tienda/agregar/',
        failureRedirect: '/',
        failureFlash: true
})

registro.cierreSesion = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Sección terminada');
        res.redirect('/');
    });
};

module.exports = registro;