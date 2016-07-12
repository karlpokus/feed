var path = require("path"),
    data = require(path.join(__dirname, '..', 'temp/so.json'));

module.exports = function(req, res, next) {

  var mapped = data.items.map(function(o){
    var ms = o.creation_date *1000,
        d = new Date(ms),
        dateString = `[${d.toJSON().substr(0, 10)}]`;
    if (o.title) {
      var titleLinkLong = `<a href="${o.link}" target="_blank">${o.title.substr(0, 50)}..</a>`,
          titleLinkShort = `<a href="${o.link}" target="_blank">${o.title.substr(0, 25)}..</a>`;
    }
    if (o.detail) {
      var detailLink = `<a href="${o.link}" target="_blank">${o.detail.substr(0, 50)}..</a>`;
    }
    o.ts = ms; // normalize ts

    // [XXXX-XX-XX] <timeline_type> <detail> <link>

    if (o.timeline_type === "commented") {
      o.str = `${dateString} ${detailLink}`;
    }
    if (o.timeline_type === "accepted") {
      o.str = `${dateString} ${o.timeline_type} an ${o.post_type} on ${titleLinkShort}`;
    }
    if (o.timeline_type === "asked") {
      o.str = `${dateString} ${o.timeline_type} ${titleLinkLong}`;
    }
    if (o.timeline_type === "answered") {
      o.str = `${dateString} ${o.timeline_type} ${titleLinkLong}`;
    }
    if (o.timeline_type === "badge") {
      o.str = `${dateString} earned badge ${o.detail}`;
    }
    return o;
  });

  req.items = req.items.concat(mapped);
  return next();
};
