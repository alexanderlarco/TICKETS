const driver = (sequelize, type) => {
    return sequelize.define("driver", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        license: {
            type: type.STRING(10),
            allowNull: false,
        },
        name: {
            type: type.STRING,
            unique: true,
            allowNull:false
        },
        lastName: {
            type: type.STRING,
            unique: true,
            allowNull:false
        },
        typeLicense: {
            type: type.ENUM(),
            values: ["A", "C", "D" ],
            defaultValue: "D"
        },
        state: { type: type.BOOLEAN, defaultValue: true },
    });
};

module.exports = driver;
