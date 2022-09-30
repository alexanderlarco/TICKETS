const admin = {};
const passport = require('passport');

const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

admin.view = (req, res) => {
	res.render('auth/login');
};

admin.signin = passport.authenticate('local.signin', {
	successRedirect: '/admin',
	failureRedirect: '/admin/login',
	failureFlash: true,
});

module.exports = admin;
