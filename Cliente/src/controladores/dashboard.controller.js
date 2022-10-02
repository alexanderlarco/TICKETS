dashboard = {};

const orm = require("../configuracionBaseDatos/baseDatos.orm");

dashboard.getIndex = async (req, res) => {
  const client = await orm.client
    .findOne({
      where: {
        id: req.user.id,
      },
    })
    .then((res) => {
      return res.dataValues;
    });
  res.render("dashboard/dashboard", { client });
};

module.exports = dashboard;
