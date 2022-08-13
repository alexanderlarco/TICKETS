const tipoDocumento = (sequelize, type) =>{
    return sequelize.define('tipoDocumentos',{
        idTipoDocumento:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreTipoDocumento: type.STRING,
        codigoTipoDocumento: type.STRING,
        estadoTipoDocumento: type.STRING,
        creacionTipoDocumento: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionTipoDocumento: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tipoDocumento