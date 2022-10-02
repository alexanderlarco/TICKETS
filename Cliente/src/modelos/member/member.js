const member = (sequelize, type) => {
    return sequelize.define("member", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        typeDni: {
            type: type.ENUM(),
            values: ["Cedula", "Pasaporte", "RUC"],
            defaultValue: "Cedula",
        },
        dni: {
            type: type.STRING,
            unique: true,
            allowNull:false
        },
        name: type.STRING,
        lastName: type.STRING,
        address: { type: type.STRING, allowNull:false },
        email: {
            type: type.STRING,
            unique: true,
        },
        phone: type.STRING(10),
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = member;
