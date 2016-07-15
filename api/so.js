var path = require("path"),
    data = require(path.join(__dirname, '..', 'temp/so.json'));

module.exports = function(req, res, next) {

  var mapped = data.items.map(function(o){
    // dateString
    var ms = o.creation_date *1000,
        d = new Date(ms),
        dateString = `[${d.toJSON().substr(0, 10)}][stackoverflow] `;
    // title
    if (o.title) {
      var title = (o.title.length > 75)? `${o.title.substr(0, 75)}..`: o.title,
          titleLink = `<a href="${o.link}" target="_blank">${title}</a>`;
    }
    // body
    if (o.detail) {
      var detail = (o.detail.length > 75)? `${o.detail.substr(0, 75)}..`: o.detail,
          detailLink = `<a href="${o.link}" target="_blank">${detail}</a>`;
    }
    o.ts = ms; // normalize ts

    // [XXXX-XX-XX] <timeline_type> <detail> <link>

    if (o.timeline_type === "commented") {
      o.str = `${dateString} ${detailLink}`;
    }
    if (o.timeline_type === "accepted") {
      o.str = `${dateString} ${o.timeline_type} an ${o.post_type} on ${titleLink}`;
    }
    if (o.timeline_type === "asked") {
      o.str = `${dateString} ${o.timeline_type} ${titleLink}`;
    }
    if (o.timeline_type === "answered") {
      o.str = `${dateString} ${o.timeline_type} ${titleLink}`;
    }
    if (o.timeline_type === "badge") {
      o.str = `${dateString} earned badge ${o.detail}`;
    }
    return o;
  });

  req.items = req.items.concat(mapped);
  return next();
};
