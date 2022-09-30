module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/admin/login');
		}
	},

	isNotLoggedIn(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		return res.redirect('/admin');
	},
};
