const empleadoTienda = (sequelize, type) => {
    return sequelize.define('empleadoTiendas', {
        idEmpleadoTienda: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagenEmpleadoTienda: type.STRING,
        NombresEmpleadoTienda: type.STRING,
        ApellidosEmpleadoTienda: type.STRING,
        CedulaEmpleadoTienda: type.STRING,
        usernameEmpleadoTienda: type.STRING(99),
        passwordEmpleadoTienda: type.STRING,
        emailEmpleadoTienda: type.STRING,
        edadEmpleadoTienda: type.STRING,
        celularEmpleadoTienda: type.STRING,
        creacionEmpleadoTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionEmpleadoTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = empleadoTienda