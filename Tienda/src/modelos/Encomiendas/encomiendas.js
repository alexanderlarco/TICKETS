const encomiendas = (sequelize, type) => {
    return sequelize.define("encomiendas", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        guideNumber:{
            type: type.STRING,
            allowNull: false,
        },
        fechasalida: {
            type: type.DATE,
            allowNull: false
        },
        fechallegada: {
            type: type.DATE,
            allowNull: true
        },
        origen:{
            type: type.STRING,
            allowNull: false,
        },
        destino:{
            type: type.STRING,
            allowNull: false,
        },
        subTotal: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        total: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        estado: {
            type: type.ENUM(),
            values: ["Ingresada", "Despachada", "En Camino", "Desembarque", "Perdida", "Olvidada", "Anulada" ],
            defaultValue: "Ingresada"
        },
        estado: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = encomiendas;