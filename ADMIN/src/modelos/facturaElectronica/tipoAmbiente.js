const tipoAmbiente = (sequelize, type) =>{
    return sequelize.define('tipoAmbientes', {
        idTipoAmbiente:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreTipoAmbiente: type.STRING,
        estadoTipoAmbiente: type.STRING,
        creacionTipoAmbiente: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionTipoAmbiente: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tipoAmbiente