var fs = require('fs'),
    path = require("path"),
    cheerio = require('cheerio'),
    feedName = function() {
      var names = ['shenanigans', 'whatNots', ':D', 'feed', 'all-the-apis'],
          index = Math.floor(Math.random() * names.length);
      return names[index];
    };

module.exports = function(req, res, next) {
  fs.readFile(path.join(__dirname, '..', 'index.html'), 'utf8', function(err, data) {
    if (err) return next(err);

    var $ = cheerio.load(data),
        li;

    // items
    if (req.items && req.items.length > 0) {
      req.items.forEach(function(o){
        // only include those with prop str
        if (o.str) {
          li = '<li>' + o.str + '</li>';
          $('ul').append(li);
        }
      });
    }

    // feedName
    $('#feedName').text(feedName());

    req.html = $.html();
    return next();
  });
}
