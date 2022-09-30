const registro = {};

const passport = require('passport');

registro.Login = passport.authenticate('local.signin', {
	successRedirect: '/formaPago/agregar/',
	failureRedirect: '/',
	failureFlash: true,
});

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
