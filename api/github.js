var path = require("path"),
    data = require(path.join(__dirname, '..', 'temp/github.json'));

module.exports = function(req, res, next) {
  var dateString, repoLink, commits, commentLink, commentURL, comment;

  var mapped = data.map(function(o){
    dateString = `[${o.created_at.substr(0, 10)}]`;
    o.ts = o.created_at; // normalize ts
    repoLink = `<a href="${o.repo.url}" target="_blank">${o.repo.name}</a>`;

    // [XXXX-XX-XX] <verb> to <repo>

    // pushed <message> to <repo.name>
    if (o.type === 'PushEvent') {
      commits = (o.payload.size > 1)? 'commits': 'commit';
      o.str = `${dateString} pushed ${o.payload.size} ${commits} to ${repoLink}`;
    }
    // created <ref_type> on <repo.name>
    if (o.type === 'CreateEvent') {
      o.str = `${dateString} created ${o.payload.ref_type} on ${repoLink}`;
    }
    // <action> <release.name> on <repo.name>
    if (o.type === 'ReleaseEvent') {
      o.str = `${dateString} ${o.payload.action} ${o.payload.release.name} to ${repoLink}`;
    }
    // <comment.body> to <repo.name>
    if (o.type === 'CommitCommentEvent') {
      commentURL = o.payload.comment.html_url;
      comment = o.payload.comment.body.substr(0, 50);
      commentLink = `<a href="${commentURL}" target="_blank">${comment}</a>`;
      o.str = `${dateString} ${commentLink}..`;
    }
    // <action> watching <repo.name>
    if (o.type === 'WatchEvent') {
      o.str = `${dateString} ${o.payload.action} watching ${repoLink}`;
    }
    // <action> <issue.title> on <repo.name>
    if (o.type === 'IssuesEvent') {
      o.str = `${dateString} ${o.payload.action} ${o.payload.issue.title} on ${repoLink}`;
    }
    return o;
  });

  req.items = req.items.concat(mapped);
  return next();
};
