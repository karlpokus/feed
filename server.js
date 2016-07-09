var http = require("http"),
    fs = require('fs'),
    cheerio = require('cheerio'),
    // lib
    pype = require('./lib/pype'),
    concat = require('./lib/concat'),
    index = require('./lib/index'),
    sort = require('./lib/sort'),
    // api
    pens = require('./api/codepen'),
    gits = require('./api/github');
    //server = http.createServer();

function errorhandler(err, req, res) {
  console.log('err', err);
}

// test
pype(null, {}, {},
  //[codepen, gists, concat, index, sort, html],
  [pens, gits, concat, index, sort],
  errorhandler,
  function(req, res){
    //res.setHeader("Content-Type", "text/html");
    //res.end(req.html);
    req.items.forEach(function(o){
      console.log(o.str);
    });
})();



/*
server.on("request", function(req, res) {

  // todo: make this a stream
  fs.readFile('./index.html', 'utf8', function(err, data) {
    if (err) throw err;

    var $ = cheerio.load(data);
    var li = "<li>Much li is here</li>"
    $('ul').append(li);

    res.setHeader("Content-Type", "text/html");
    res.end($.html());

  });

});

server.listen(3000, function() {
  console.log('Server running..');
});
*/
