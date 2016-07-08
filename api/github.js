var path = require("path"),
    data = require(path.join(__dirname, '..', 'temp/github.json'));

module.exports = function(cb) {
  
  // dateString
  data.map(function(o){
    o.dateString = "[" + o.created_at.substr(0, 10) + "]"
    return o;
  }).map(function(o){
    // [XXXX-XX-XX] pushed <message> to <repo.name>
    if (o.type === 'PushEvent') {
      o.str = o.dateString + ' pushed ' + o.payload.size + ' commits to ' + o.repo.name;
    }
    // [XXXX-XX-XX] created <ref_type> on <repo.name>
    if (o.type === 'CreateEvent') {
      o.str = o.dateString + ' created ' + o.payload.ref_type + ' on ' + o.repo.name;
    }
    // [XXXX-XX-XX] <action> <release.name> on <repo.name>
    if (o.type === 'ReleaseEvent') {
      o.str = o.dateString + ' ' + o.payload.action + ' ' + o.payload.release.name + ' to ' + o.repo.name;
    }
    return o;
  });
  
  cb(null, data);
};