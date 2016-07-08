var http = require("http"),
    fs = require('fs'),
    cheerio = require('cheerio'),
    pens = require('./api/codepen'),
    gits = require('./api/github');
    //server = http.createServer();

// TESTs
pens(function(err, data){
  if (err) throw err;
  
  data.forEach(function(o){
    console.log(o.str);
  });
});

gits(function(err, data){
  if (err) throw err;
  
  data.forEach(function(o){
    if (o.str) {
      console.log(o.str);
    }    
  });
});

// order

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
