const cliente = (sequelize, type) => {
    return sequelize.define('clientes', {
        idClientes: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombresCliente: type.STRING,
        DireccionCliente: type.STRING,
        emailCliente: type.STRING,
        cedulaCliente: type.STRING,
        usernameCliente: type.STRING(99),
        passwordCliente: type.STRING,
        telefonoCliente: type.STRING(7),
        CelularCliente: type.STRING(10),
        creacionClientes: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionClientes: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = cliente