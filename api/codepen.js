var fs = require('fs'),
    path = require("path"),
    //http = require('http'),
    //url = 'http://codepen.io/KarlPokus/public/feed/',
    cheerio = require('cheerio');

module.exports = function(req, res, next) {

  // temp read from file
  fs.readFile(path.join(__dirname, '..', 'temp/codepen.html'), 'utf8', function(err, data) {
    if (err) return next(err);

    var pens = [],
        $ = cheerio.load(data);

    $('item').each(function(){
        pens.push({
          title: $(this).find('title').text(),
          url: $(this).find('guid').text(),
          ts: $(this).find('dc\\:date').text()
        });
      });

    // [XXXX-XX-XX] edited <title> OR <url>
    var mapped = pens.map(function(o){
      var dateString = `[${o.ts.substr(0, 10)}]`,
          verb = ' edited ',
          subject = `<a href="${o.url}" target="_blank">${o.title}</a>`;
      o.str = dateString + verb + subject;
      return o;
    });

    req.items = req.items.concat(mapped);
    return next();
  });

  /*
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
  */

}
