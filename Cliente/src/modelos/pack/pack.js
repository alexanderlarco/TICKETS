const pack = (sequelize, type) => {
    return sequelize.define("pack", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description:{
            type: type.STRING,
            allowNull: false,
        },
        quantity: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        weight: {
            type: type.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        type:{
            type: type.ENUM(),
            values: ["Paquete Pequeño","Paquete Mediano", "Documentos", "Bulto", "Otros"],
            defaultValue: "Paquete Pequeño"
        },
        price:{
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 1
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = pack;
