const impuesto = (sequelize, type) => {
    return sequelize.define('impuestos', {
        idImpuesto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreImpuesto: type.STRING,
        codigoImpuesto: type.STRING,
        tipoImpuesto: type.STRING,
        creacionImpuesto: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionImpuesto: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = impuesto