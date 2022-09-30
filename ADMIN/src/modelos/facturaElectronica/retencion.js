const Retencion = (sequelize, type)=>{
    return sequelize.define('retenciones',{
        idRetencion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        valorRetencion: type.STRING,
        creacionRetencion: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionRetencion: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = Retencion