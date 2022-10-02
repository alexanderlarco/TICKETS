const authCtrl = {};

const passport = require('passport');

authCtrl.renderSignUp = (req, res) => {
    res.render('login/registro');
};

authCtrl.signUp = passport.authenticate('signUp', {
    successRedirect: '/perfil',
    failureRedirect: '/register',
    failureFlash: true
});

authCtrl.renderSignIn = (req, res, next) => {
    res.render('login/login');
};

authCtrl.signIn = passport.authenticate('signIn', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
});

authCtrl.logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Sección terminada');
        res.redirect('/');
    });
};

module.exports = authCtrl;