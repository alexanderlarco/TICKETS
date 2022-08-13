const pago = (sequelize, type) =>{
    return sequelize.define('pagos',{
        idPago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: type.STRING,
        plazo: type.STRING,
        tiempo: type.STRING,
        creacionPago: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPago: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = pago