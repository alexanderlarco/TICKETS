const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path')
var CryptoJS = require("crypto-js");

const orm = require('../configuracionBaseDatos/baseDatos.orm')
const sql = require('../configuracionBaseDatos/baseDatos.sql')
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
      const rows = await orm.usuarios.findOne({ where: { usernameUsuarios: username } });
      if (rows) {
        const user = rows;
        const contraseña = await CryptoJS.AES.decrypt(user.passwordUsuarios, 'secret');
        const validPassword = contraseña.toString(CryptoJS.enc.Utf8);
        if (validPassword == password) {
          done(null, user, req.flash("message", "Bienvenido" + " " + user.usernameUsuarios));
        } else {
          done(null, false, req.flash("message", "Datos incorrecta"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "El nombre de usuario no existe.")
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
      const usuarios = await orm.usuarios.findOne({ where: { usernameUsuarios: username } });
      if (usuarios === null) {
        const { idUsuarios, NombresUsuarios, ApellidosUsuarios, CedulaUsuario, emailUsuarios } = req.body
        let nuevoUsuario = {
          idUsuarios: idUsuarios,
          NombresUsuarios,
          ApellidosUsuarios,
          CedulaUsuario,
          emailUsuarios,
          usernameUsuarios: username,
          passwordUsuarios: password
        };
        nuevoUsuario.NombresUsuarios = await helpers.encryptPassword(NombresUsuarios);
        nuevoUsuario.ApellidosUsuarios = await helpers.encryptPassword(ApellidosUsuarios);
        nuevoUsuario.CedulaUsuario = await helpers.encryptPassword(CedulaUsuario);
        nuevoUsuario.emailUsuarios = await helpers.encryptPassword(emailUsuarios);
        nuevoUsuario.passwordUsuarios = await helpers.encryptPassword(password);
        const resultado = await orm.usuarios.create(nuevoUsuario);

        if (idUsuarios === '1') {
          await sql.query('INSERT INTO RolUsuarios(idRolUsuario, nombreRolUsuario, estadoRolUsuario) VALUE ("1", "ADMIN", "activo")')
          await sql.query('INSERT INTO permisosusuairos(idPermisosUsuairos, nombrePermisosUsuairos, usuarioIdUsuarios) Values ("1","controlTotal", ?)', [idUsuarios])
          await sql.query('INSERT INTO detallerolusuarios(idDetalleRolUsuario, usuarioIdUsuarios, rolUsuarioIdRolUsuario, permisosUsuairoIdPermisosUsuairos) VALUE("1",?,"1","1")', [idUsuarios])
        }

        nuevoUsuario.id = resultado.insertId;

        const imagenUsuario = req.files.imagenUsuario
        const validacion = path.extname(imagenUsuario.name)

        const extencion = [".PNG", ".JPG", ".JPEG", ".GIF", ".TIF", ".png", ".jpg", ".jpeg", ".gif", ".tif"];

        if (!extencion.includes(validacion)) {
          req.flash("success", "Imagen no compatible.")
        }

        if (!req.files) {
          req.flash("success", "Imagen no insertada.")
        }

        const ubicacion = __dirname + "/../public/img/usuario/" + imagenUsuario.name;

        imagenUsuario.mv(ubicacion, function (err) {
          if (err) {
            return req.flash("message", err)
          }
          sql.query("UPDATE usuarios SET imagenUsuario = ? WHERE idUsuarios = ?", [imagenUsuario.name, idUsuarios])
          console.log("Imagen de usuario ingresada")
        })
        return done(null, nuevoUsuario);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
}); 