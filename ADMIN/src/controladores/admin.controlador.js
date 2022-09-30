const admin = {};
const passport = require('passport');

const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

admin.view = (req, res) => {
	res.render('auth/login');
};

admin.login = (req, res) => {
	res.render('index');
};

admin.signin = passport.authenticate('local.signin', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	failureFlash: true,
});

admin.cierreSesion = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.flash('success', 'Sección terminada');
		res.redirect('/admin');
	});
};

module.exports = admin;
