require.register("collections/Users", function(exports, require, module) {
var CocoCollection, User, Users,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

User = require('models/User');

CocoCollection = require('collections/CocoCollection');

module.exports = Users = (function(superClass) {
  extend(Users, superClass);

  function Users() {
    return Users.__super__.constructor.apply(this, arguments);
  }

  Users.prototype.model = User;

  Users.prototype.url = '/db/user';

  Users.prototype.fetchForClassroom = function(classroom, options) {
    var classroomID, jqxhrs, limit, size, skip;
    if (options == null) {
      options = {};
    }
    if (options.removeDeleted) {
      delete options.removeDeleted;
      this.listenTo(this, 'sync', this.removeDeletedUsers);
    }
    classroomID = classroom.id || classroom;
    limit = 10;
    skip = 0;
    size = _.size(classroom.get('members'));
    options.url = "/db/classroom/" + classroomID + "/members";
    if (options.data == null) {
      options.data = {};
    }
    options.data.memberLimit = limit;
    options.remove = false;
    jqxhrs = [];
    while (skip < size) {
      options = _.cloneDeep(options);
      options.data.memberSkip = skip;
      jqxhrs.push(this.fetch(options));
      skip += limit;
    }
    return jqxhrs;
  };

  Users.prototype.removeDeletedUsers = function() {
    this.remove(this.filter(function(user) {
      return user.get('deleted');
    }));
    return true;
  };

  Users.prototype.search = function(term) {
    if (!term) {
      return this.slice();
    }
    term = term.toLowerCase();
    return this.filter(function(user) {
      var ref;
      return user.broadName().toLowerCase().indexOf(term) > -1 || ((ref = user.get('email')) != null ? ref : '').indexOf(term) > -1;
    });
  };

  return Users;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Users.js.map