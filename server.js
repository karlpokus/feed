var pype = require('./lib/pype'),
    concat = require('./lib/concat'),
    index = require('./lib/index'),
    sort = require('./lib/sort'),
    html = require('./lib/html'),
    pens = require('./api/codepen'),
    gits = require('./api/github'),
    http = require("http"),
    server = http.createServer(),
    errorhandler = function(err, req, res) {
      res.end(err);
    },
    finalHandler = function(req, res) {
      res.setHeader("Content-Type", "text/html");
      res.end(req.html);
    },
    requestHandler = pype(null, [pens, gits, concat, index, sort, html, finalHandler], errorhandler);

server.on('request', requestHandler);

server.listen(3000, function() {
  console.log('Server running..');
});
