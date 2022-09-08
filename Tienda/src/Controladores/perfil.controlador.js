const perfilCtl = {};

const helpers = require("../lib/helpers");
const orm = require("../configuracionBaseDatos/baseDatos.orm");
const sql = require("../configuracionBaseDatos/baseDatos.sql");
var CryptoJS = require("crypto-js");

perfilCtl.mostrar = async (req, res) => {
	const id = req.user.idDueñoTienda;
	const usuarios = await sql.query(
		"select * from dueñotiendas where idDueñoTienda = ?",
		[id]
	);
	res.render("perfil/perfil", { usuarios });
};

perfilCtl.mandar = async (req, res) => {
	const id = req.user.idDueñoTienda;
	const {
		Nombres,
		Apellidos,
		username,
		password,
		email,
		edad,
		celular,
		si,
		no,
	} = req.body;
	const nuevoEnvio = {
		Nombres,
		Apellidos,
		username,
		email,
		edad,
		celular,
	};
	const contraseña = {
		password,
	};
	contraseña.password = await helpers.encryptPassword(password);
	await sql.query("update usuarios set ? where idDueñoTienda= ?", [
		nuevoEnvio,
		id,
	]);
	if (no == "no") {
		console.log("no se quiso la actulizacion de la imagen");
	}
	if (si == "si") {
		const imagenUsuario = req.files.imagenUsuario;
		const validacion = path.extname(imagenUsuario.name);

		const extencion = [
			".PNG",
			".JPG",
			".JPEG",
			".GIF",
			".TIF",
			".png",
			".jpg",
			".jpeg",
			".gif",
			".tif",
		];

		if (!extencion.includes(validacion)) {
			req.flash("success", "Imagen no compatible.");
		}

		if (!req.files) {
			req.flash("success", "Imagen no insertada.");
		}

		const ubicacion =
			__dirname + "/../public/img/usuario/" + imagenUsuario.name;

		imagenUsuario.mv(ubicacion, function (err) {
			if (err) {
				return res.status(500).send(err);
			}
			sql.query(
				"UPDATE usuarios SET imagenUsuario = ? WHERE idDueñoTienda = ?",
				[imagenUsuario.name, idDueñoTienda]
			);
			console.log("Imagen de usuario ingresada");
		});
	}
};

module.exports = perfilCtl;
