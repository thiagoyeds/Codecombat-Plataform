require.register("templates/courses/activate-licenses-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state,paid = locals_.paid;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"text-center\"><h1 data-i18n=\"teacher.apply_licenses\"></h1><h2 data-i18n=\"courses.grants_lifetime_access\"></h2></div></div><div class=\"modal-body\">");
var numToEnroll = state.get('visibleSelectedUsers').length
var unusedEnrollments = view.prepaids.totalMaxRedeemers() - view.prepaids.totalRedeemers()
var tooManySelected = numToEnroll > unusedEnrollments
var noneSelected = numToEnroll == 0
if ( view.classrooms.length > 1)
{
buf.push("<div class=\"row\"><div class=\"col-sm-10 col-sm-offset-1\"><div class=\"text-center m-b-3\"><div class=\"small color-navy\"><span data-i18n=\"teacher.show_students_from\"></span><span class=\"spr\">:</span></div><select class=\"classroom-select\">");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((view.classroom ? classroom.id === view.classroom.id : false)), 'value':(classroom.id) }, {"selected":true,"value":true})) + ">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((view.classroom ? classroom.id === view.classroom.id : false)), 'value':(classroom.id) }, {"selected":true,"value":true})) + ">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option" + (jade.attrs({ 'selected':((!view.classroom)), 'value':(''), 'data-i18n':('teacher.all_students') }, {"selected":true,"value":true,"data-i18n":true})) + "></option></select></div></div></div>");
}
buf.push("<form class=\"form m-t-3\"><span data-i18n=\"teacher.apply_licenses_to_the_following_students\"></span><span>:</span><div class=\"well form-group\">");
var enrolledUsers = view.users.filter(function(user){ return user.isEnrolled() })
var unenrolledUsers = view.users.filter(function(user){ return !user.isEnrolled() })
// iterate unenrolledUsers
;(function(){
  var $$obj = unenrolledUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(false), 'checked':(selected), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(false), 'checked':(selected), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

if ( enrolledUsers.length > 0)
{
buf.push("<div class=\"small-details m-t-3\"><span data-i18n=\"teacher.students_have_licenses\"></span></div>");
}
// iterate enrolledUsers
;(function(){
  var $$obj = enrolledUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(true), 'checked':(true), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(true), 'checked':(true), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
if ( state.get('error'))
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = state.get('error')) ? "" : jade.interp)) + "</div>");
}
buf.push("<div id=\"submit-form-area\" class=\"text-center\"><p" + (jade.attrs({ "class": [('small-details'),('not-enough-enrollments'),((tooManySelected ? 'visible' : ''))] }, {"class":true})) + "><span data-i18n=\"teacher.not_enough_enrollments\"></span></p><p class=\"small-details\"><span data-i18n=\"courses.enrollment_credits_available\" class=\"spr\"></span><span id=\"total-available\">" + (jade.escape(null == (jade.interp = view.prepaids.totalAvailable()) ? "" : jade.interp)) + "</span></p><p><button" + (jade.attrs({ 'id':('activate-licenses-btn'), 'type':("submit"), "class": [('btn'),('btn-lg'),('btn-primary'),((tooManySelected || noneSelected ? 'disabled' : ''))] }, {"class":true,"type":true})) + "><span data-i18n=\"teacher.apply_licenses\"></span> (<span id=\"total-selected-span\">" + (jade.escape(null == (jade.interp = numToEnroll) ? "" : jade.interp)) + "</span>)</button></p><p><a id=\"get-more-licenses-btn\" href=\"/teachers/licenses\" data-i18n=\"courses.get_enrollments\" class=\"btn btn-lg btn-primary-alt\"></a></p></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/courses/ActivateLicensesModal", function(exports, require, module) {
var ActivateLicensesModal, Classroom, Classrooms, CocoCollection, ModalView, Prepaids, State, User, Users, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

State = require('models/State');

template = require('templates/courses/activate-licenses-modal');

CocoCollection = require('collections/CocoCollection');

Prepaids = require('collections/Prepaids');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

User = require('models/User');

Users = require('collections/Users');

module.exports = ActivateLicensesModal = (function(superClass) {
  extend(ActivateLicensesModal, superClass);

  function ActivateLicensesModal() {
    return ActivateLicensesModal.__super__.constructor.apply(this, arguments);
  }

  ActivateLicensesModal.prototype.id = 'activate-licenses-modal';

  ActivateLicensesModal.prototype.template = template;

  ActivateLicensesModal.prototype.events = {
    'change input[type="checkbox"][name="user"]': 'updateSelectedStudents',
    'change select.classroom-select': 'replaceStudentList',
    'submit form': 'onSubmitForm',
    'click #get-more-licenses-btn': 'onClickGetMoreLicensesButton'
  };

  ActivateLicensesModal.prototype.getInitialState = function(options) {
    var selectedUserModels, selectedUsers;
    selectedUsers = options.selectedUsers || options.users;
    selectedUserModels = _.filter(selectedUsers.models, function(user) {
      return !user.isEnrolled();
    });
    return {
      selectedUsers: new Users(selectedUserModels),
      visibleSelectedUsers: new Users(selectedUserModels),
      error: null
    };
  };

  ActivateLicensesModal.prototype.initialize = function(options) {
    this.state = new State(this.getInitialState(options));
    this.classroom = options.classroom;
    this.users = options.users.clone();
    this.users.comparator = function(user) {
      return user.broadName().toLowerCase();
    };
    this.prepaids = new Prepaids();
    this.prepaids.comparator = 'endDate';
    this.supermodel.trackRequest(this.prepaids.fetchByCreator(me.id));
    this.classrooms = new Classrooms();
    this.supermodel.trackRequest(this.classrooms.fetchMine({
      data: {
        archived: false
      },
      success: (function(_this) {
        return function() {
          return _this.classrooms.each(function(classroom) {
            var jqxhrs;
            classroom.users = new Users();
            jqxhrs = classroom.users.fetchForClassroom(classroom, {
              removeDeleted: true
            });
            return _this.supermodel.trackRequests(jqxhrs);
          });
        };
      })(this)
    }));
    this.listenTo(this.state, 'change', this.render);
    this.listenTo(this.state.get('selectedUsers'), 'change add remove reset', function() {
      this.state.set({
        visibleSelectedUsers: new Users(this.state.get('selectedUsers').filter((function(_this) {
          return function(u) {
            return _this.users.get(u);
          };
        })(this)))
      });
      return this.render();
    });
    this.listenTo(this.users, 'change add remove reset', function() {
      this.state.set({
        visibleSelectedUsers: new Users(this.state.get('selectedUsers').filter((function(_this) {
          return function(u) {
            return _this.users.get(u);
          };
        })(this)))
      });
      return this.render();
    });
    return this.listenTo(this.prepaids, 'sync add remove', function() {
      return this.state.set({
        unusedEnrollments: this.prepaids.totalMaxRedeemers() - this.prepaids.totalRedeemers()
      });
    });
  };

  ActivateLicensesModal.prototype.onLoaded = function() {
    this.prepaids.reset(this.prepaids.filter(function(prepaid) {
      return prepaid.status() === 'available';
    }));
    return ActivateLicensesModal.__super__.onLoaded.call(this);
  };

  ActivateLicensesModal.prototype.afterRender = function() {
    return ActivateLicensesModal.__super__.afterRender.call(this);
  };

  ActivateLicensesModal.prototype.updateSelectedStudents = function(e) {
    var user, userID;
    userID = $(e.currentTarget).data('user-id');
    user = this.users.get(userID);
    if (this.state.get('selectedUsers').contains(user)) {
      return this.state.get('selectedUsers').remove(user);
    } else {
      return this.state.get('selectedUsers').add(user);
    }
  };

  ActivateLicensesModal.prototype.replaceStudentList = function(e) {
    var selectedClassroomID, users;
    selectedClassroomID = $(e.currentTarget).val();
    this.classroom = this.classrooms.get(selectedClassroomID);
    if (!this.classroom) {
      users = _.uniq(_.flatten(this.classrooms.map(function(classroom) {
        return classroom.users.models;
      })));
      this.users.reset(users);
      this.users.sort();
    } else {
      this.users.reset(this.classrooms.get(selectedClassroomID).users.models);
    }
    this.render();
    return null;
  };

  ActivateLicensesModal.prototype.onSubmitForm = function(e) {
    var usersToRedeem;
    e.preventDefault();
    this.state.set({
      error: null
    });
    usersToRedeem = this.state.get('visibleSelectedUsers');
    return this.redeemUsers(usersToRedeem);
  };

  ActivateLicensesModal.prototype.redeemUsers = function(usersToRedeem) {
    var prepaid, user;
    if (!usersToRedeem.size()) {
      this.finishRedeemUsers();
      this.hide();
      return;
    }
    user = usersToRedeem.first();
    prepaid = this.prepaids.find(function(prepaid) {
      return prepaid.status() === 'available';
    });
    return prepaid.redeem(user, {
      success: (function(_this) {
        return function(prepaid) {
          var ref;
          user.set('coursePrepaid', prepaid.pick('_id', 'startDate', 'endDate', 'type', 'includedCourseIDs'));
          usersToRedeem.remove(user);
          if ((ref = application.tracker) != null) {
            ref.trackEvent('Enroll modal finished enroll student', {
              category: 'Courses',
              userID: user.id
            });
          }
          return _this.redeemUsers(usersToRedeem);
        };
      })(this),
      error: (function(_this) {
        return function(prepaid, jqxhr) {
          return _this.state.set({
            error: jqxhr.responseJSON.message
          });
        };
      })(this)
    });
  };

  ActivateLicensesModal.prototype.finishRedeemUsers = function() {
    return this.trigger('redeem-users', this.state.get('selectedUsers'));
  };

  ActivateLicensesModal.prototype.onClickGetMoreLicensesButton = function() {
    return typeof this.hide === "function" ? this.hide() : void 0;
  };

  return ActivateLicensesModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/ActivateLicensesModal.js.map