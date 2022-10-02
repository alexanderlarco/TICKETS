const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const orm = require("../configuracionBaseDatos/baseDatos.orm");
const helpers = require("./helpers");

passport.use(
  "signIn",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const clientDB = await orm.client
        .findOne({ where: { email: username } })
        .then((res) => {
          return !res ? null: res.dataValues;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });

      if (!clientDB) {
        return done(
          null,
          false,
          req.flash("message", "Usuario o contraseña incorrecta")
        );
      }

      const validPassword = await helpers.matchPassword(
        password,
        clientDB.password
      );
      if (validPassword) {
        done(
          null,
          clientDB,
          req.flash("success", "Bienvenido " + "" + clientDB.userName)
        );
      } else {
        done(null, false, req.flash("message", "Contraseña incorrecta"));
      }
    }
  )
);

passport.use(
  "signUp",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const clientDB = await orm.client
        .findOne({
          where: {
            email: username,
          },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return null;
        });

      if (clientDB) {
        req.flash("error", "El usuario ya existe");
        return done(null, false);
      }
      let userName = 'user_' + Math.floor(Math.random() * 100000) + 1;
      let newcliente = {
        userName: userName,
        email: username,
        password: await helpers.encryptPassword(password),
      };
      const result = await orm.client
        .create(newcliente)
        .then((res) => {
          return res.dataValues;
        })
        .catch((err) => {
          return null;
        });
      if (!result) {
        req.flash("message", "Error en el registro");
        return done(null, null);
      }
      return done(null, result);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
