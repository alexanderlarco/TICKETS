const tarifaIva = (sequelize, type)=>{
    return sequelize.define('tarifaIvas',  {
        idTarifaIva: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreTarifaIva: type.STRING,
        codigoTarifaIva: type.STRING,
        creacionTarifaIva: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionTarifaIva: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tarifaIva