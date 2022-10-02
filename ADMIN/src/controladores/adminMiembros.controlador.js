const adminMiembros = {};
const passport = require('passport');

const orm = require('../configuracionBaseDatos/baseDatos.orm');
require('sequelize');

adminMiembros.view = async (req, res) => {
	const miembros = await orm.miembro.findAll(); // TODO: Si existe lo actualizamos

	res.render('miembros/main', { miembros });
};

adminMiembros.post = (req, res) => {
	res.json({
		msg: 'ok',
	});
};

adminMiembros.update = async (req, res) => {
	//Esta es la visa unicamente, deberia llamarse update or add, algo asi
	const id = req.params.id;
	const body = req.body;
	let user = {};
	let cooperativeAll = await orm.cooperativa.findAll();
	let fk_cooperative; // TODO: Buscamos en la DB si existe
	try {
		const { dataValues } = await orm.miembro.findOne({ where: { id } }); // TODO: Si existe lo actualizamos

		user = dataValues;
		fk_cooperative = 1;

		console.log(user);
	} catch (error) {
		user = {};
	}

	// await orm.miembro.create({ ...user }); // TODO: Si existe lo actualizamos

	// TODO: Si no existe lo guardamos
	if (id == 'nuevo') {
		req.flash('message', 'Error, intentalo nuevamente');
		user = {};
	}

	res.render('miembros/editOrCreate', { user, fk_cooperative, cooperativeAll });
};

adminMiembros.add = async (req, res) => {
	const body = req.body;
	const id = req.params.id;

	await orm.miembro
		.update(body, { where: { id } })
		.then(() => {
			req.flash('success', 'Guardado correctamente');
			res.redirect('/miembros');
		})
		.catch(() => {
			req.flash('message', 'Error, intentalo nuevamente');
			res.redirect('/miembros');
		});
};

adminMiembros.create = async (req, res) => {
	const body = req.body;

	const { name, lastname, email, CI, fk_cooperative, pass, rol, state } = body;

	if (
		!name ||
		!lastname ||
		!email ||
		!CI ||
		!fk_cooperative ||
		!pass ||
		!rol ||
		!state
	) {
		req.flash('message', 'Llena los campos correctamente e intenta nuevamente');
		res.redirect('/miembros/nuevo');
		return;
	}

	await orm.miembro
		.create({ ...body })
		.then(() => {
			req.flash('success', 'Creado correctamente');
			res.redirect('/miembros');
		})
		.catch(() => {
			req.flash('message', 'Error, intentalo nuevamente');
			res.redirect('/miembros');
		});
};

adminMiembros.remove = async (req, res) => {
	const id = req.params.id;

	await orm.miembro
		.destroy({ where: { id } })
		.then(() => {
			req.flash('success', 'Eliminado correctamente');
			res.redirect('/miembros');
		})
		.catch(() => {
			req.flash('message', 'Error, intentalo nuevamente');
			res.redirect('/miembros');
		});
};

module.exports = adminMiembros;
