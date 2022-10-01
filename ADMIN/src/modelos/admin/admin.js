const admin = (sequelize, type) => {
	return sequelize.define(
		'admin',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: type.STRING,
			last_name: type.STRING,
			email: type.STRING,
			pass: type.STRING,
			terminal: type.STRING,
			url_img: type.STRING,
			CI: type.INTEGER,
		},
		{
			timestamps: true,
		}
	);
};

module.exports = admin;
