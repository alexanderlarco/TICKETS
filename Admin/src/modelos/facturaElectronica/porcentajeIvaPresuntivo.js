const porcentajeIvaPresuntivo = (sequelize, type)=>{
    return sequelize.define('porcentajeIvaPresuntivos', {
    idporcentajeIvaPresuntivo: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombrePorcentajeIvaPresuntivo: type.STRING,
    codigoPorcentajeIvaPresuntivo: type.STRING,
    tipoPorcentajeIvaPresuntivo: type.STRING,
    creacionPorcentajeIvaPresuntivo: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPorcentajeIvaPresuntivo: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}