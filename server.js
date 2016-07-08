var http = require("http"),
    fs = require('fs'),
    cheerio = require('cheerio'),
    pens = require('./api/codepen'),
    server = http.createServer();

server.on("request", function(req, res) {

  // codepen
  pens(function(err, data){
    if (err) throw err;
    console.log(data[0].title);
  });

  // todo: make this a stream
  fs.readFile('./index.html', 'utf8', function(err, data) {
    if (err) throw err;

    var $ = cheerio.load(data);
    var li = "<li>Much li is here</li>"
    $('ul').append(li);

    res.end($.html());

  });


});

server.listen(3000, function() {
  console.log('Server running..');
});
