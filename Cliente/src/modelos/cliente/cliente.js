const client = (sequelize, type) => {
  return sequelize.define("client", {
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
    },
    name: type.STRING,
    lastName: type.STRING,
    userName: { type: type.STRING, unique: true },
    email: {
      type: type.STRING,
      unique: true,
    },
    password: type.STRING,
    phone: type.STRING(10),
    status: { type: type.BOOLEAN, defaultValue: true },
  });
};

module.exports = client;
