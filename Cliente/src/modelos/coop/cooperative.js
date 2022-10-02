const cooperative = (sequelize, type) => {
    return sequelize.define("cooperative", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ruc:{
            type: type.STRING(13),
            allowNull: false,
        },
        name:{
            type: type.STRING,
            allowNull: false,
        },
        address: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false,
        },
        phone: {
            type: type.STRING,
            allowNull: false,
        },
        logo: {
            type: type.STRING,
            allowNull: false,
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = cooperative;
