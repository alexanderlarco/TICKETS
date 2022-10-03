const timeBus = (sequelize, type) => {
    return sequelize.define("timeBus", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hourStart: {
            type: type.TIME,
            allowNull: false,
        },
        hourFinalize: {
            type: type.TIME,
            allowNull: false,
        },
        dateStart: {
            type: type.DATEONLY,
            allowNull: false
        },
        dateFinalize: {
            type: type.DATEONLY,
            allowNull: false,
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = timeBus;
