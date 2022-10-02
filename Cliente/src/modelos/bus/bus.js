const bus = (sequelize, type) => {
    return sequelize.define("bus", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        plate: {
            type: type.STRING(7),
            allowNull: false,
        },
        unitNumber: {
            type: type.STRING(10),
            allowNull: false,
        },
        capacity: {
            type: type.INTEGER,
            defaultValue: 1,
            allowNull:false
        },
        floor: {
            type: type.INTEGER,
            defaultValue: 1,
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = bus;
