const pedidos = (Sequelize, type) => {
    return Sequelize.define('pedidos', {
        idPedidos: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        nombre: type.STRING,
        fechaPedido: type.STRING,
        cantidadPedido: type.INTEGER,      
        creacionPedidos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPedidos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}
module.exports = pedidos