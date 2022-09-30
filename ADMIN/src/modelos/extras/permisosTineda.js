const permisosTienda = (sequelize, type) =>{
    return sequelize.define('permisosTiendas', {
        idPermisosTienda: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombrePermisosTienda: type.STRING,
        creacionPermisosTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPermisosTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = permisosTienda