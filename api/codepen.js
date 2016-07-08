var http = require('http'),
    cheerio = require('cheerio'),
    url = 'http://codepen.io/KarlPokus/public/feed/';

module.exports = function(cb) {
  http.get(url, function(res){

    var data = "";
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){

      var pens = [],
          $ = cheerio.load(data);

      $('item').each(function(){
        pens.push({
          title: $(this).find('title').text(),
          url: $(this).find('link').text(),
          ts: $(this).find('dc\\:date').text()
        });
      });

      cb(null, pens);
    });

  }).on('error', function(err){
    cb(err);
  });
}
