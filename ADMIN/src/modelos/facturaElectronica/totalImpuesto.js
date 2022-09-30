const totalImpuesto = (sequelize, type) => {
    return sequelize.define('totalImpuesto',{
        idTotalImpuesto:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descuentoTotalImpuesto: type.STRING,
        baseImponibleTotalImpuesto: type.STRING,
        valorTotalImpuesto: type.STRING,
        creacionTotalImpuesto: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionTotalImpuesto: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = totalImpuesto