module.exports = function(req, res, next) {
  // this needs a better solution
  if (req.pens && req.gits && req.so) {
    req.items = req.pens.concat(req.gits, req.so);
  }
  return next();
}
