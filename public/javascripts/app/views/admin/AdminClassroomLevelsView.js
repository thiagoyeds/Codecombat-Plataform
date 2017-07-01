require.register("views/admin/AdminClassroomLevelsView", function(exports, require, module) {
var AdminClassroomLevelsView, Campaign, CocoCollection, Course, RootView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

CocoCollection = require('collections/CocoCollection');

Campaign = require('models/Campaign');

Course = require('models/Course');

module.exports = AdminClassroomLevelsView = (function(superClass) {
  extend(AdminClassroomLevelsView, superClass);

  function AdminClassroomLevelsView() {
    return AdminClassroomLevelsView.__super__.constructor.apply(this, arguments);
  }

  AdminClassroomLevelsView.prototype.id = 'admin-classroom-levels-view';

  AdminClassroomLevelsView.prototype.template = require('templates/admin/admin-classroom-levels');

  AdminClassroomLevelsView.prototype.initialize = function() {
    if (!me.isAdmin()) {
      return AdminClassroomLevelsView.__super__.initialize.call(this);
    }
    this.campaigns = new CocoCollection([], {
      url: "/db/campaign",
      model: Campaign
    });
    this.supermodel.loadCollection(this.campaigns, 'campaigns');
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.supermodel.loadCollection(this.courses, 'courses');
    return AdminClassroomLevelsView.__super__.initialize.call(this);
  };

  return AdminClassroomLevelsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/AdminClassroomLevelsView.js.map