const ticket = (sequelize, type) => {
    return sequelize.define("ticket", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        exitPlataform: {
            type: type.STRING,
            allowNull: false
        },
        subTotal: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        discount: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        total: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: type.ENUM(),
            values: ["Ingresado", "Completado", "Anulado","Eliminado","Caducado" ],
            defaultValue: "Ingresado"
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = ticket;
