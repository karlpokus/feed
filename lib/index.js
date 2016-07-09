module.exports = function(req, res, next) {

  if (req.items) {
    req.items.map(function(o){
      var tsKey;
      if (o.created_at) {tsKey = 'created_at'}
      if (o.ts) {tsKey = 'ts'}

      var d = new Date(o[tsKey]);
      o.index = d.getTime();
      return o;
    });
  }
  return next();

}
