const subRolTienda = (sequelize, type) =>{
    return sequelize.define('subRolTiendas', {
        idSubRolTienda:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreSubRolTienda: type.STRING,
        estadoSubRolTienda: type.STRING,
        creacionSubRolTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionSubRolTienda: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = subRolTienda