const impuestoRenta = (sequelize, type) =>{
    return sequelize.define('impuestoRentas', {
        idImpuestoRenta:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreImpuestoRenta: type.STRING,
        codigoImpuestoRenta: type.STRING,
        creacionImpuestoRenta: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionImpuestoRenta: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = impuestoRenta