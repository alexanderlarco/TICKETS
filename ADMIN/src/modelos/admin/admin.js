const admin = (sequelize, type) => {
	return sequelize.define(
		'admins',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			CI: type.INTEGER,
			pass: type.STRING,
		},
		{
			timestamps: false,
		}
	);
};

module.exports = admin;
