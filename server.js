var pype = require('./lib/pype'),
    concat = require('./lib/concat'),
    index = require('./lib/index'),
    sort = require('./lib/sort'),
    html = require('./lib/html'),
    pens = require('./api/codepen'),
    gits = require('./api/github'),
    sos = require('./api/so'),
    http = require("http"),
    server = http.createServer(),
    errorhandler = function(err, req, res) {
      res.end(err);
    },
    finalHandler = function(req, res) {
      res.setHeader("Content-Type", "text/html");
      res.end(req.html);
    },
    stack = [pens, gits, sos, concat, index, sort, html, finalHandler];

server.on('request', function(req, res){
  var requestHandler = pype(null, stack, errorhandler);
  requestHandler(req, res);
});

server.listen(3000, function() {
  console.log('Server running..');
});
