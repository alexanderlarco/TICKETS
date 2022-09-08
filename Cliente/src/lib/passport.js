const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await await orm.cliente.findOne({ where: { usernameCliente: username } });
      if (rows) {
        const user = rows
        const validPassword = await helpers.matchPassword(
          password,
          user.passwordCliente
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + "" + user.usernameCliente));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El usuario no existe")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { Nombres } = req.body;
      let newcliente = {
        NombresCliente: Nombres,
        usernameCliente: username,
        passwordCliente: password
      }
      newcliente.passwordCliente = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await orm.cliente.create(newcliente);
      newcliente.id = result.insertId;
      return done(null, newcliente);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});