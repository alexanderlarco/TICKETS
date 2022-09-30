const tipoIdentificacion = (sequelize, type)=>{
    return sequelize.define('tipoIdentificaciones',{
        idTipoIdentificacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreTipoIdentificacion: type.STRING,
        codigoTipoItentificacion: type.STRING,
        estadoTipoIdentificacion: type.STRING,
        creacionTipoIdentificacion: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionTipoIdentificacion: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tipoIdentificacion