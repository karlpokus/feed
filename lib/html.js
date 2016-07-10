var fs = require('fs'),
    path = require("path"),
    cheerio = require('cheerio');

module.exports = function(req, res, next) {
  fs.readFile(path.join(__dirname, '..', 'index.html'), 'utf8', function(err, data) {
    if (err) return next(err);

    var $ = cheerio.load(data),
        li;

    if (req.items) {
      req.items.forEach(function(o){
        li = '<li>' + o.str + '</li>';
        $('ul').append(li);
      });
    }

    req.html = $.html();
    return next();
  });
}
