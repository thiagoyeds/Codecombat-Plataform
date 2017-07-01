require.register("models/CourseInstance", function(exports, require, module) {
var CocoModel, CourseInstance, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoModel = require('./CocoModel');

schema = require('schemas/models/course_instance.schema');

module.exports = CourseInstance = (function(superClass) {
  extend(CourseInstance, superClass);

  function CourseInstance() {
    return CourseInstance.__super__.constructor.apply(this, arguments);
  }

  CourseInstance.className = 'CourseInstance';

  CourseInstance.schema = schema;

  CourseInstance.prototype.urlRoot = '/db/course_instance';

  CourseInstance.prototype.addMember = function(userID, opts) {
    var jqxhr, options;
    options = {
      method: 'POST',
      url: _.result(this, 'url') + '/members',
      data: {
        userID: userID
      }
    };
    _.extend(options, opts);
    jqxhr = this.fetch(options);
    if (userID === me.id) {
      if (!me.get('courseInstances')) {
        me.set('courseInstances', []);
      }
      me.get('courseInstances').push(this.id);
    }
    return jqxhr;
  };

  CourseInstance.prototype.addMembers = function(userIDs, opts) {
    var jqxhr, options, ref;
    options = {
      method: 'POST',
      url: _.result(this, 'url') + '/members',
      data: {
        userIDs: userIDs
      },
      success: (function(_this) {
        return function() {
          return _this.trigger('add-members', {
            userIDs: userIDs
          });
        };
      })(this)
    };
    _.extend(options, opts);
    jqxhr = this.fetch(options);
    if (ref = me.id, indexOf.call(userIDs, ref) >= 0) {
      if (!me.get('courseInstances')) {
        me.set('courseInstances', []);
      }
      me.get('courseInstances').push(this.id);
    }
    return jqxhr;
  };

  CourseInstance.prototype.removeMember = function(userID, opts) {
    var jqxhr, options;
    options = {
      url: _.result(this, 'url') + '/members',
      type: 'DELETE',
      data: {
        userID: userID
      }
    };
    _.extend(options, opts);
    jqxhr = this.fetch(options);
    if (userID === me.id) {
      me.set('courseInstances', _.without(me.get('courseInstances'), this.id));
    }
    return jqxhr;
  };

  CourseInstance.prototype.firstLevelURL = function() {
    return "/play/level/dungeons-of-kithgard?course=" + (this.get('courseID')) + "&course-instance=" + this.id;
  };

  CourseInstance.prototype.hasMember = function(userID, opts) {
    userID = userID.id || userID;
    return indexOf.call(this.get('members') || [], userID) >= 0;
  };

  return CourseInstance;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/CourseInstance.js.map