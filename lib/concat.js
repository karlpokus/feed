module.exports = function(req, res, next) {
  // this needs a better solution
  if (req.pens && req.gits) {
    req.items = req.pens.concat(req.gits);
  }  
  return next();
}
