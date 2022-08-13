const facturaElectronica = (sequelize, type) => {
    return sequelize.define('facturaElectronicas', {
        idFacturaElectronica: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fechaEmicion: type.STRING,
        contabilidad: type.BOOLEAM,
        guiaRemision: type.STRING,
        totalSinImpuesto: type.STRING,
        propina: type.STRING,
        moneda: type.STRING,
        creacionFacturaElectronica: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionFacturaElectronica: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = facturaElectronica