dashboard = {};

const orm = require("../configuracionBaseDatos/baseDatos.orm");
dashboard.getIndex = async (req, res) => {
  const client = req.user;
  res.render("dashboard/dashboard", { client });
};

module.exports = dashboard;
