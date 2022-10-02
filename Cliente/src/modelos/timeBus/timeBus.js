const timeBus = (sequelize, type) => {
    return sequelize.define("timeBus", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hourStart: {
            type: type.DATE,
            allowNull: false,
        },
        hourFinalize: {
            type: type.DATE,
            allowNull: false,
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = timeBus;
