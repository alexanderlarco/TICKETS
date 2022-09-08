const perfilCtrl = {};

const path = require("path");

const orm = require("../configuracionBaseDatos/baseDatos.orm");
const sql = require("../configuracionBaseDatos/baseDatos.sql");

perfilCtrl.mostrar = async (req, res) => {
	const id = req.user.idUsuarios;
	const tienda = await sql.query(
		"Select * from tiendas where detalleSubRolTiendaIdDetalleSubRolTienda = ?",
		[id]
	);
	const max = await sql.query("select max(idTiendas) from tiendas");
	res.render("tienda/tiendaAgregar", { tienda, max });
};

perfilCtrl.enviar = async (req, res) => {
	const id = req.user.idUsuarios;
	const {
		nombreNegocio,
		celular,
		telefono,
		ruc,
		direccion,
		idTiendas,
		fechaCreacion,
	} = req.body;
	const newTienda = {
		idTiendas: idTiendas,
		nombreNegocio,
		celular,
		telefono,
		ruc,
		direccion,
		fechaCreacion,
		detalleSubRolTiendaIdDetalleSubRolTienda: id,
	};
	await orm.tienda.create(newTienda);

	const imagenTienda = req.files.tiendaImagen;
	const validacion = path.extname(imagenTienda.name);
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
		__dirname + "/../public/img/Tienda/imagenTienda/" + imagenTienda.name;

	imagenTienda.mv(ubicacion, function (err) {
		if (err) {
			return res.status(500).send(err);
		}
		sql.query("UPDATE tiendas SET tiendaImagen = ? WHERE idTiendas = ?", [
			imagenTienda.name,
			idTiendas,
		]);
		console.log("Imagen de tienda ingresada");
	});

	req.flash("success", "Se guaardo con exito");
	res.redirect("/tienda/lista/" + id);
};

perfilCtrl.lista = async (req, res) => {
	const id = req.params.id;
	const ids = req.user.idUsuarios;
	const usuarios = sql.query("SELECT * FROM usuarios where idUsuarios = ?", [
		ids,
	]);
	const tiendas = await sql.query(
		"SELECT * FROM tiendas WHERE detalleSubRolTiendaIdDetalleSubRolTienda = ?",
		[id]
	);
	res.render("tienda/tiendaLista", { tiendas, usuarios });
};

perfilCtrl.traer = async (req, res) => {
	const id = req.params.id;
	const tienda = await sql.query(
		"SELECT * FROM tiendas WHERE idTiendas = ?",
		[id]
	);
	res.render("tienda/tiendaEditar", { tienda: tienda });
};

perfilCtrl.editar = async (req, res) => {
	const ids = req.params.id;
	const id = req.user.idUsuarios;
	const { nombreNegocio, celular, direccion, telefono, fechaCreacion } =
		req.body;
	const newTienda = {
		nombreNegocio,
		celular,
		direccion,
		telefono,
		fechaCreacion,
	};

	await orm.tienda.findOne({ where: { idTiendas: ids } }).then((tiendas) => {
		tiendas.update(newTienda);
		req.flash("success", "Se guardo correctamente");
		res.redirect("/tienda/lista/1");
	});
};

module.exports = perfilCtrl;
