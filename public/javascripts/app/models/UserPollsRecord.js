require.register("models/UserPollsRecord", function(exports, require, module) {
var CocoModel, UserPollsRecord, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/user-polls-record.schema');

module.exports = UserPollsRecord = (function(superClass) {
  extend(UserPollsRecord, superClass);

  function UserPollsRecord() {
    return UserPollsRecord.__super__.constructor.apply(this, arguments);
  }

  UserPollsRecord.className = 'UserPollsRecord';

  UserPollsRecord.schema = schema;

  UserPollsRecord.prototype.urlRoot = '/db/user.polls.record';

  return UserPollsRecord;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/UserPollsRecord.js.map