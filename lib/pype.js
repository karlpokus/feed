module.exports = function(self, req, res, arr, errorHandler, cb) {
  var i = 0,
      run = function() {
        arr[i].call(self, req, res, next);
      },
      next = function(err) {
        if (err && errorHandler) {
          return errorHandler.call(self, err, req, res);
        }
        i++
        if (i < arr.length) {
          return run();
        } else if (cb) {
          return cb.call(self, req, res);
        }
      }

  return function() {
    run();
  }
};
