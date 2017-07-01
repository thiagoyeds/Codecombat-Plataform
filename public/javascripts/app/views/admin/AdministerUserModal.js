require.register("templates/admin/administer-user-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"pull-right\">");
if ( view.user.isStudent())
{
buf.push("<button id=\"destudent-btn\" class=\"btn btn-burgandy\">Destudent</button>");
}
if ( view.user.isTeacher())
{
buf.push("<button id=\"deteacher-btn\" class=\"btn btn-burgandy\">Deteacher</button>");
}
buf.push("</div><h3>Administer User</h3><h4>" + (jade.escape((jade.interp = view.user.get('name') || 'Unnamed') == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = view.user.get('email')) == null ? '' : jade.interp)) + "</h4><span>" + (jade.escape(null == (jade.interp = view.user.id) ? "" : jade.interp)) + "</span>");
if ( view.user.get('cleverID'))
{
buf.push("<br/><b>Clever ID:</b>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<span>" + (jade.escape(null == (jade.interp = view.user.get('cleverID')) ? "" : jade.interp)) + "</span>");
}
buf.push("</div><div class=\"modal-body\"><h3 class=\"m-t-3\">Grant Student Licenses</h3><div id=\"prepaid-form\" class=\"form\">");
if ( view.state === 'creating-prepaid')
{
buf.push("<div class=\"progress progress-striped active\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div>");
}
else if ( view.state === 'made-prepaid')
{
buf.push("<div class=\"alert alert-success\">Licenses created!</div>");
}
else
{
buf.push("<div class=\"form-group\"><label>Number of Licenses</label><input id=\"seats-input\" type=\"number\" name=\"maxRedeemers\" class=\"form-control\"/></div><div class=\"form-group\"><label>Start Date</label><input" + (jade.attrs({ 'type':("date"), 'name':("startDate"), 'value':(moment().format('YYYY-MM-DD')), "class": [('form-control')] }, {"type":true,"name":true,"value":true})) + "/></div><div class=\"form-group\"><label>End Date</label><input" + (jade.attrs({ 'type':("date"), 'name':("endDate"), 'value':(moment().add(1, 'year').format('YYYY-MM-DD')), "class": [('form-control')] }, {"type":true,"name":true,"value":true})) + "/></div><div class=\"form-group\"><button id=\"add-seats-btn\" class=\"btn btn-primary\">Add Licenses</button></div>");
}
buf.push("</div>");
if ( view.prepaids.size())
{
buf.push("<h3 class=\"m-t-3\">Existing Prepaids</h3><table class=\"table table-condensed\"><tr><th>ID</th><th>Type</th><th>Start</th><th>End</th><th>Used</th></tr>");
// iterate view.prepaids.models
;(function(){
  var $$obj = view.prepaids.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = prepaid.id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = prepaid.get('type')) ? "" : jade.interp)) + "</td><td>");
if ( prepaid.get('startDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('startDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>");
if ( prepaid.get('endDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('endDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>" + (jade.escape((jade.interp = (prepaid.get('redeemers') || []).length) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = prepaid.get('maxRedeemers') || 0) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = prepaid.id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = prepaid.get('type')) ? "" : jade.interp)) + "</td><td>");
if ( prepaid.get('startDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('startDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>");
if ( prepaid.get('endDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('endDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>" + (jade.escape((jade.interp = (prepaid.get('redeemers') || []).length) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = prepaid.get('maxRedeemers') || 0) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("<h3>Stripe Benefit</h3><div class=\"form\"><div class=\"form-group\"><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':(""), 'checked':(view.none) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>None</label></div><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':("free"), 'checked':(view.free) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Free</label></div><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':("free-until"), 'checked':(view.freeUntil) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Free Until<input" + (jade.attrs({ 'type':("date"), 'name':("stripe-free-until"), 'value':(view.freeUntilDate), 'id':('free-until-date'), "class": [('form-control'),('spl')] }, {"type":true,"name":true,"value":true})) + "/></label></div><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':("coupon"), 'checked':(view.coupon) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Coupon</label><select id=\"coupon-select\" class=\"form-control\">");
// iterate view.coupons.models
;(function(){
  var $$obj = view.coupons.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var coupon = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(coupon.id), 'selected':(coupon.id===view.currentCouponID) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = coupon.formatString()) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var coupon = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(coupon.id), 'selected':(coupon.id===view.currentCouponID) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = coupon.formatString()) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><button id=\"save-changes\" class=\"btn btn-primary\">Save Changes</button></div>");
if ( view.classrooms.size())
{
buf.push("<h3 class=\"m-t-3\">Update Classrooms</h3><table id=\"classroom-table\" class=\"table\"><tr><th>Name</th><th>Lang</th><th># Levels / Courses</th><th></th></tr>");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)));
if ( classroom.get('archived'))
{
buf.push("<i class=\"spl text-muted\">(archived)</i>");
}
buf.push("</td><td>" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = classroom.getLevels().size()) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = classroom.get('courses').length) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('update-classroom-btn')] }, {"data-classroom-id":true})) + ">Update All Levels</button><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('add-new-courses-btn')] }, {"data-classroom-id":true})) + ">Add New Courses</button></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)));
if ( classroom.get('archived'))
{
buf.push("<i class=\"spl text-muted\">(archived)</i>");
}
buf.push("</td><td>" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = classroom.getLevels().size()) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = classroom.get('courses').length) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('update-classroom-btn')] }, {"data-classroom-id":true})) + ">Update All Levels</button><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('add-new-courses-btn')] }, {"data-classroom-id":true})) + ">Add New Courses</button></td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div>");;return buf.join("");
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

;require.register("views/admin/AdministerUserModal", function(exports, require, module) {
var AdministerUserModal, Classrooms, ModalView, Prepaid, Prepaids, StripeCoupons, User, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/admin/administer-user-modal');

User = require('models/User');

Prepaid = require('models/Prepaid');

StripeCoupons = require('collections/StripeCoupons');

forms = require('core/forms');

Prepaids = require('collections/Prepaids');

Classrooms = require('collections/Classrooms');

module.exports = AdministerUserModal = (function(superClass) {
  extend(AdministerUserModal, superClass);

  function AdministerUserModal() {
    return AdministerUserModal.__super__.constructor.apply(this, arguments);
  }

  AdministerUserModal.prototype.id = 'administer-user-modal';

  AdministerUserModal.prototype.template = template;

  AdministerUserModal.prototype.events = {
    'click #save-changes': 'onClickSaveChanges',
    'click #add-seats-btn': 'onClickAddSeatsButton',
    'click #destudent-btn': 'onClickDestudentButton',
    'click #deteacher-btn': 'onClickDeteacherButton',
    'click .update-classroom-btn': 'onClickUpdateClassroomButton',
    'click .add-new-courses-btn': 'onClickAddNewCoursesButton'
  };

  AdministerUserModal.prototype.initialize = function(options, userHandle) {
    this.userHandle = userHandle;
    this.user = new User({
      _id: this.userHandle
    });
    this.supermodel.trackRequest(this.user.fetch({
      cache: false
    }));
    this.coupons = new StripeCoupons();
    this.supermodel.trackRequest(this.coupons.fetch({
      cache: false
    }));
    this.prepaids = new Prepaids();
    this.supermodel.trackRequest(this.prepaids.fetchByCreator(this.userHandle));
    this.classrooms = new Classrooms();
    return this.supermodel.trackRequest(this.classrooms.fetchByOwner(this.userHandle));
  };

  AdministerUserModal.prototype.onLoaded = function() {
    var stripe;
    stripe = this.user.get('stripe') || {};
    this.free = stripe.free === true;
    this.freeUntil = _.isString(stripe.free);
    this.freeUntilDate = this.freeUntil ? stripe.free : new Date().toISOString().slice(0, 10);
    this.currentCouponID = stripe.couponID;
    this.none = !(this.free || this.freeUntil || this.coupon);
    return AdministerUserModal.__super__.onLoaded.call(this);
  };

  AdministerUserModal.prototype.onClickSaveChanges = function() {
    var couponVal, dateVal, options, selection, stripe;
    stripe = _.clone(this.user.get('stripe') || {});
    delete stripe.free;
    delete stripe.couponID;
    selection = this.$el.find('input[name="stripe-benefit"]:checked').val();
    dateVal = this.$el.find('#free-until-date').val();
    couponVal = this.$el.find('#coupon-select').val();
    switch (selection) {
      case 'free':
        stripe.free = true;
        break;
      case 'free-until':
        stripe.free = dateVal;
        break;
      case 'coupon':
        stripe.couponID = couponVal;
    }
    this.user.set('stripe', stripe);
    options = {};
    options.success = (function(_this) {
      return function() {
        return _this.hide();
      };
    })(this);
    return this.user.patch(options);
  };

  AdministerUserModal.prototype.onClickAddSeatsButton = function() {
    var attrs, prepaid;
    attrs = forms.formToObject(this.$('#prepaid-form'));
    attrs.maxRedeemers = parseInt(attrs.maxRedeemers);
    if (!_.all(_.values(attrs))) {
      return;
    }
    if (!(attrs.maxRedeemers > 0)) {
      return;
    }
    if (!(attrs.endDate && attrs.startDate && attrs.endDate > attrs.startDate)) {
      return;
    }
    attrs.startDate = new Date(attrs.startDate).toISOString();
    attrs.endDate = new Date(attrs.endDate).toISOString();
    _.extend(attrs, {
      type: 'course',
      creator: this.user.id,
      properties: {
        adminAdded: me.id
      }
    });
    prepaid = new Prepaid(attrs);
    prepaid.save();
    this.state = 'creating-prepaid';
    this.renderSelectors('#prepaid-form');
    return this.listenTo(prepaid, 'sync', function() {
      this.state = 'made-prepaid';
      return this.renderSelectors('#prepaid-form');
    });
  };

  AdministerUserModal.prototype.onClickDestudentButton = function(e) {
    var button;
    button = $(e.currentTarget);
    button.attr('disabled', true).text('...');
    return Promise.resolve(this.user.destudent()).then((function(_this) {
      return function() {
        return button.remove();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref;
        button.attr('disabled', false).text('Destudent');
        noty({
          text: e.message || ((ref = e.responseJSON) != null ? ref.message : void 0) || e.responseText || 'Unknown Error',
          type: 'error'
        });
        if (e.stack) {
          throw e;
        }
      };
    })(this));
  };

  AdministerUserModal.prototype.onClickDeteacherButton = function(e) {
    var button;
    button = $(e.currentTarget);
    button.attr('disabled', true).text('...');
    return Promise.resolve(this.user.deteacher()).then((function(_this) {
      return function() {
        return button.remove();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref;
        button.attr('disabled', false).text('Destudent');
        noty({
          text: e.message || ((ref = e.responseJSON) != null ? ref.message : void 0) || e.responseText || 'Unknown Error',
          type: 'error'
        });
        if (e.stack) {
          throw e;
        }
      };
    })(this));
  };

  AdministerUserModal.prototype.onClickUpdateClassroomButton = function(e) {
    var classroom;
    classroom = this.classrooms.get($(e.currentTarget).data('classroom-id'));
    if (confirm("Really update " + (classroom.get('name')) + "?")) {
      return Promise.resolve(classroom.updateCourses()).then((function(_this) {
        return function() {
          noty({
            text: 'Updated classroom courses.'
          });
          return _this.renderSelectors('#classroom-table');
        };
      })(this))["catch"](function() {
        return noty({
          text: 'Failed to update classroom courses.',
          type: 'error'
        });
      });
    }
  };

  AdministerUserModal.prototype.onClickAddNewCoursesButton = function(e) {
    var classroom;
    classroom = this.classrooms.get($(e.currentTarget).data('classroom-id'));
    if (confirm("Really update " + (classroom.get('name')) + "?")) {
      return Promise.resolve(classroom.updateCourses({
        data: {
          addNewCoursesOnly: true
        }
      })).then((function(_this) {
        return function() {
          noty({
            text: 'Updated classroom courses.'
          });
          return _this.renderSelectors('#classroom-table');
        };
      })(this))["catch"](function() {
        return noty({
          text: 'Failed to update classroom courses.',
          type: 'error'
        });
      });
    }
  };

  return AdministerUserModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/AdministerUserModal.js.map