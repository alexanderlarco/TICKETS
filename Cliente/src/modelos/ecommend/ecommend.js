const ecommend = (sequelize, type) => {
    return sequelize.define("ecommend", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        guideNumber:{
            type: type.STRING,
            allowNull: false,
        },
        dateEntry: {
            type: type.DATE,
            allowNull: false
        },
        dateRetire: {
            type: type.DATE,
            allowNull: true
        },
        origin:{
            type: type.STRING,
            allowNull: false,
        },
        destiny:{
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
        status: {
            type: type.ENUM(),
            values: ["Ingresada", "Despachada", "En Camino", "Desembarque", "Perdida", "Olvidada", "Anulada" ],
            defaultValue: "Ingresada"
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = ecommend;
