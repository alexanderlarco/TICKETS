const root = (sequelize, type) => {
    return sequelize.define("root", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: type.STRING,
            allowNull: false
        },
        origin: {
            type: type.STRING,
            allowNull: false
        },
        destiny: {
            type: type.STRING,
            allowNull: false
        },
        priceComplete: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        priceSpecial: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        priceMiddle: {
            type: type.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = root;
