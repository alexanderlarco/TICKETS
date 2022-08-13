const tipoIdentificacionCtl = {};

tipoIdentificacionCtl.mostrar = (req, res, next) => {
  res.render('tipoIdentificacion/lista');
}
module.exports = tipoIdentificacionCtl;