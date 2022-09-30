const detalleSubRolTienda = (sequelize, type) =>{
    return sequelize.define('detalleSubRolTiendas', {
        idDetalleSubRolTienda: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        creacionDetalleSubRolTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDetalleSubRolTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = detalleSubRolTienda