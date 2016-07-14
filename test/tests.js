var test = require('tape'),
    init = require('../lib/init'),
    index = require('../lib/index'),
    sort = require('../lib/sort'),
    html = require('../lib/html'),
    cb = function(t) {
      t.pass('calls next');
    },
    cheerio = require('cheerio');

// TODOs
// [ ] declare req once on top and let each fn alter it and test for that specific thing
// [X] make t.pass as cb generic on top?

test('init', function(t){
  var req = {};
  init(req, {}, cb.bind(null, t));
  t.equal(req.items.length, 0, 'creates empty array');
  t.end();
});

test('index', function(t){
  var req = {
    items: [
      {ts:'2016-07-05'}
    ]
  };
  index(req, {}, cb.bind(null, t));
  t.equal(typeof req.items[0].index, 'number', 'calculates an .index on each item');
  t.end();
});

test('sort', function(t){
  var req = {
    items: [
      {index: 5},
      {index: 8}
    ]
  };
  sort(req, {}, cb.bind(null, t));
  t.equal(req.items[0].index, 8, 'sorts items by .index');
  t.end();
});

test('html', function(t){
  var req = {
    items: [
      {str: '1'},
      {str: '2'},
      {str: '3'}
    ]
  };
  html(req, {}, function(){
    t.pass('calls next');
    t.equal(typeof req.html, 'string', 'creates html');
    var $ = cheerio.load(req.html),
        li = $('ul li').length;
    t.equal(li, req.items.length, 'each item is a li in ul');
    t.end();
  });
});
