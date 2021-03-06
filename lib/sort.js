module.exports = function(req, res, next) {
  if (req.items && req.items.length > 0) {
    req.items.sort(function(a, b){ // desc
      return b.index - a.index;
    });
  }
  return next();
}
