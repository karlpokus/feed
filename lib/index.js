module.exports = function(req, res, next) {
  if (req.items && req.items.length > 0) {
    var d;
    req.items.map(function(o){
      d = new Date(o.ts);
      o.index = d.getTime();
      return o;
    });
  }
  return next();
}
