var path = require("path"),
    data = require(path.join(__dirname, '..', 'temp/github.json'));

module.exports = function(req, res, next) {

  req.gits = data.map(function(o){
    // dateString
    o.dateString = "[" + o.created_at.substr(0, 10) + "]";
    // [XXXX-XX-XX] <verb> to <repo>
    // pushed <message> to <repo.name>
    if (o.type === 'PushEvent') {
      o.str = o.dateString + ' pushed ' + o.payload.size + ' commits to ' + o.repo.name;
    }
    // created <ref_type> on <repo.name>
    if (o.type === 'CreateEvent') {
      o.str = o.dateString + ' created ' + o.payload.ref_type + ' on ' + o.repo.name;
    }
    // <action> <release.name> on <repo.name>
    if (o.type === 'ReleaseEvent') {
      o.str = o.dateString + ' ' + o.payload.action + ' ' + o.payload.release.name + ' to ' + o.repo.name;
    }
    // <comment.body> to <repo.name>
    if (o.type === 'CommitCommentEvent') {
      o.str = o.dateString + ' ' + o.payload.comment.body.substr(0, 25) + '..';
    }
    // <action> watching <repo.name>
    if (o.type === 'WatchEvent') {
      o.str = o.dateString + ' ' + o.payload.action + ' watching ' + o.repo.name;
    }
    // <action> <issue.title> on <repo.name>
    if (o.type === 'IssuesEvent') {
      o.str = o.dateString + ' ' + o.payload.action + ' ' + o.payload.issue.title + ' on ' + o.repo.name;
    }
    return o;
  });

  return next();
};
