const usuarios = (sequelize, type) => {
    return sequelize.define('usuarios', {
        idUsuarios: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagenUsuario: type.STRING,
        Nombres: type.STRING,
        Apellidos: type.STRING,
        username: type.STRING(99),
        password: type.STRING,
        email: type.STRING,
        edad: type.STRING,
        celular: type.STRING,
        creacionUsuarios: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionUsuarios: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = usuarios