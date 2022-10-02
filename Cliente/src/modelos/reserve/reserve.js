const reserve = (sequelize, type) => {
    return sequelize.define("reserve", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateStart: {
            type: type.DATE,
            allowNull: false
        },
        numChild: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        numAdult: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        subTotal: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: type.ENUM(),
            values: ["Ingresada", "Confirmada", "Anulada" ],
            defaultValue: "Ingresada"
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = reserve;
