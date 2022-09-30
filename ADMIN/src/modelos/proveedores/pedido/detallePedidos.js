const detallePedidos = (sequelize,type) =>{
    return sequelize.define('detallePedidos', {
        idDetallePedidos: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:type.STRING,
        creacionDetallePedidos:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDetallePedidos:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = detallePedidos