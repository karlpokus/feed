module.exports = function(req, res, next) {
  req.items = [];
  return next();
}
