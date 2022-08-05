const tienda = (sequelize, type)=>{
    return sequelize.define('tiendas', {
        idTiendas: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tiendaImagen: type.STRING,
        ruc: type.STRING,
        nombreNegocio: type.STRING,
        fechaCreacion: type.STRING,
        direccion: type.STRING,
        celular: type.STRING(10),
        telefono: type.STRING(10),
        creacionTiendas: type.STRING,
        actualizacionTiendas:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = tienda;