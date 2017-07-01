require.register("models/Prepaid", function(exports, require, module) {
var CocoModel, Prepaid, STARTER_LICENSE_COURSE_IDS, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoModel = require('./CocoModel');

schema = require('schemas/models/prepaid.schema');

STARTER_LICENSE_COURSE_IDS = require('core/constants').STARTER_LICENSE_COURSE_IDS;

module.exports = Prepaid = (function(superClass) {
  extend(Prepaid, superClass);

  function Prepaid() {
    return Prepaid.__super__.constructor.apply(this, arguments);
  }

  Prepaid.className = "Prepaid";

  Prepaid.prototype.urlRoot = '/db/prepaid';

  Prepaid.prototype.openSpots = function() {
    var ref;
    if (this.get('redeemers') != null) {
      return this.get('maxRedeemers') - ((ref = this.get('redeemers')) != null ? ref.length : void 0);
    }
    return this.get('maxRedeemers');
  };

  Prepaid.prototype.userHasRedeemed = function(userID) {
    var i, len, redeemer, ref;
    ref = this.get('redeemers');
    for (i = 0, len = ref.length; i < len; i++) {
      redeemer = ref[i];
      if (redeemer.userID === userID) {
        return redeemer.date;
      }
    }
    return null;
  };

  Prepaid.prototype.initialize = function() {
    this.listenTo(this, 'add', function() {
      var maxRedeemers;
      maxRedeemers = this.get('maxRedeemers');
      if (_.isString(maxRedeemers)) {
        return this.set('maxRedeemers', parseInt(maxRedeemers));
      }
    });
    return Prepaid.__super__.initialize.apply(this, arguments);
  };

  Prepaid.prototype.status = function() {
    var endDate, startDate;
    endDate = this.get('endDate');
    if (endDate && new Date(endDate) < new Date()) {
      return 'expired';
    }
    startDate = this.get('startDate');
    if (startDate && new Date(startDate) > new Date()) {
      return 'pending';
    }
    if (this.openSpots() <= 0) {
      return 'empty';
    }
    return 'available';
  };

  Prepaid.prototype.redeem = function(user, options) {
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/redeemers';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    options.data.userID = user.id || user;
    return this.fetch(options);
  };

  Prepaid.prototype.includesCourse = function(course) {
    var courseID;
    courseID = (typeof course.get === "function" ? course.get('name') : void 0) || course;
    if (this.get('type') === 'starter_license') {
      return indexOf.call(this.get('includedCourseIDs'), courseID) >= 0;
    } else {
      return true;
    }
  };

  return Prepaid;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Prepaid.js.map