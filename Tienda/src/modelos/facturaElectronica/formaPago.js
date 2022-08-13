const formaPago = (sequelize, type) => {
    return sequelize.define('formaPagos', {
        idFormaPagos: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreFormaPago: type.STRING,
        codigoFormaPagos: type.STRING,
        fechaInicio: type.STRING,
        fechaFin: type.STRING,
        creacionFormaPago: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionFormaPagos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = formaPago