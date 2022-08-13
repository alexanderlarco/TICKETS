const dueñoTienda = (sequelize, type) => {
    return sequelize.define('dueñoTiendas', {
        idDueñoTienda: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagenDueñoTienda: type.STRING,
        NombresDueñoTienda: type.STRING,
        ApellidosDueñoTienda: type.STRING,
        usernameDueñoTienda: type.STRING(99),
        passwordDueñoTienda: type.STRING,
        emailDueñoTienda: type.STRING,
        edadDueñoTienda: type.STRING,
        celularDueñoTienda: type.STRING,
        creacionDueñoTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDueñoTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = dueñoTienda