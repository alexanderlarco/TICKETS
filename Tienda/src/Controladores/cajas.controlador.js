const CajasCtrl = {};

const orm = require("../configuracionBaseDatos/baseDatos.orm");
const sql = require("../configuracionBaseDatos/baseDatos.sql");

CajasCtrl.mostrar = async (req, res) => {
	const id = req.params.id;
	const listaCaja = await sql.query(
		"SELECT * FROM cajas ORDER BY idCaja ASC"
	);
	const idCaja = await sql.query("SELECT * FROM cajas");
	res.render("cajas/cajaAgregar", { listaCaja, idCaja });
};

CajasCtrl.guardar = async (req, res) => {
	const id = req.user.idDueñoTienda;
	const ids = req.params.id;
	const { idCaja, valorTotalCaja, fechaCaja } = req.body;
	const cajaEditar = {
		idCaja,
		valorTotalCaja,
		fechaCaja,
		detalleSubRolTiendaIdDetalleSubRolTienda: id,
	};
	await orm.caja.create(cajaEditar);
	req.flash("success", "Se guardo correctamente");
	res.redirect("/cajas/lista/" + id);
};

CajasCtrl.traer = async (req, res) => {
	const ids = req.params.id;
	const editar = await sql.query("SELECT * FROM cajas");
	res.render("cajas/cajaEditar", { editar });
};
CajasCtrl.lista = async (req, res) => {
	const ids = req.params.id;
	const cajalista = await sql.query("SELECT * FROM cajas");
	res.render("cajas/cajaLista", { cajalista });
};
CajasCtrl.actualizar = async (req, res) => {
	const id = req.user.idDueñoTienda;
	const ids = req.params.id;
	const { valorTotalCaja, fechaCaja } = req.body;
	const cajaEditar = {
		valorTotalCaja,
		fechaCaja,
	};
	await orm.caja.findOne({ where: { idCaja: ids } }).then((actulizar) => {
		actulizar.update(cajaEditar);
		req.flash("success", "Se Actulizo correctamente");
		res.redirect("/cajas/lista/1");
	});
};
CajasCtrl.eliminar = async (req, res) => {
	const id = req.params.id;
	await orm.cajas.destroy({ where: { idCaja: id } });
	req.flash("success", "Se Elimino Correctamente");
	res.redirect("/cajas/lista/1");
};

module.exports = CajasCtrl;
