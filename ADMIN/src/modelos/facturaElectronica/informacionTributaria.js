const informacionTributaria = (sequelize, type) =>{
    return sequelize.define('informacionTributarias', {
        idInformacionTributaria:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipoEmision: type.STRING,
        razonSocial: type.STRING,
        nombreComercial: type.STRING,
        claveAccseso: type.STRING,
        establecimiento: type.STRING,
        establecimientoEmision: type.STRING,
        secuencial: type.STRING,
        direccionMatriz: type.STRING,
        creacionInformacionTributaria: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionInformacionTributaria: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = informacionTributaria