const admin = {};

const orm = require('../configuracionBaseDatos/baseDatos.orm');
const sql = require('../configuracionBaseDatos/baseDatos.sql');

view.mostrar = (req, res) => {
	res.render('facturacionElectronica/formasPago/agregar');
};

view.mandar = async (req, res) => {
	const id = req.user.idUsuarios;

	const { nombreFormaPago, codigoFormaPagos } = req.body;

	const nuevoEnvio = {
		nombreFormaPago,
		codigoFormaPagos,
		detalleRolUsuarioIdDetalleRolUsuario: id,
	};

	await orm.formaPago.create(nuevoEnvio);

	req.flash('success', 'Se Guardo con exito');
	res.redirect('/formaPago/lista/' + id);
};

view.lista = async (req, res) => {
	const { email, contraseña } = req.body;
	//Guardar este usario en la DB usario
	const lista = await sql.query('select * from formaPagos');

	res.render('facturacionElectronica/formasPago/lista', { lista });
};

view.eliminar = async (req, res) => {
	const id = req.params.id;
	await orm.formaPago.destroy({ where: { idFormaPagos: id } }).then(() => {
		req.flash('success', 'se elimino con exito');
		res.redirect('/formaPago/lista/' + ids);
	});
};

view.tarer = async (req, res) => {
	const id = req.params.id;
	const lista = await sql.query(
		'select * from formaPagos where idFormaPagos = ?',
		[id]
	);
	res.render('facturacionElectronica/formasPago/editar', { lista });
};

view.editar = async (req, res) => {
	const id = req.params.id;
	const ids = req.user.idUsuarios;
	const { nombreFormaPago, codigoFormaPagos } = req.body;
	const nuevoEnvio = {
		nombreFormaPago,
		codigoFormaPagos,
		detalleRolUsuarioIdDetalleRolUsuario: ids,
	};
	await orm.formaPago
		.findOne({ where: { idFormaPagos: id } })
		.then((actualizar) => {
			actualizar.update(nuevoEnvio);
			req.flash('success', 'se actualizo con exito');
			res.redirect('/formaPago/lista/' + ids);
		});
};

view.eliminar = async (req, res) => {
	const ids = req.params.id;
	const id = req.user.idUsuarios;
	await orm.formaPago.destroy({ where: { idFormaPagos: ids } }).then(() => {
		req.flash('success', 'Actuaizado con exito');
		res.redirect('/formaPago/lista/' + id);
	});
};

module.exports = view;
