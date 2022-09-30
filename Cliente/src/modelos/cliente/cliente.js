const client = (sequelize, type) => {
    return sequelize.define('client', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typeDni: {
            type: type.ENUM(),
            values: ["Cedula", "Pasaporte", "RUC"],
          },
        dni: type.STRING,
        name: type.STRING,
        lastName: type.STRING,
        userName: type.STRING,
        email: type.STRING,
        password: type.STRING,
        phone: type.STRING(10),
        status: type.BOOLEAN(true)
    })
}

module.exports = client