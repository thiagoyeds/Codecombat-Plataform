require.register("views/admin/SchoolLicensesView", function(exports, require, module) {
var CocoCollection, Prepaid, RootView, SchoolLicensesView, TrialRequests,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

CocoCollection = require('collections/CocoCollection');

Prepaid = require('models/Prepaid');

TrialRequests = require('collections/TrialRequests');

module.exports = SchoolLicensesView = (function(superClass) {
  extend(SchoolLicensesView, superClass);

  function SchoolLicensesView() {
    return SchoolLicensesView.__super__.constructor.apply(this, arguments);
  }

  SchoolLicensesView.prototype.id = 'admin-school-licenses-view';

  SchoolLicensesView.prototype.template = require('templates/admin/school-licenses');

  SchoolLicensesView.prototype.initialize = function() {
    if (!me.isAdmin()) {
      return SchoolLicensesView.__super__.initialize.call(this);
    }
    this.startDateRange = new Date();
    this.endDateRange = new Date();
    this.endDateRange.setUTCFullYear(this.endDateRange.getUTCFullYear() + 2);
    this.supermodel.addRequestResource({
      url: '/db/prepaid/-/active-schools',
      method: 'GET',
      success: (function(_this) {
        return function(arg) {
          var prepaidActivityMap, schoolPrepaidsMap;
          prepaidActivityMap = arg.prepaidActivityMap, schoolPrepaidsMap = arg.schoolPrepaidsMap;
          return _this.updateSchools(prepaidActivityMap, schoolPrepaidsMap);
        };
      })(this)
    }, 0).load();
    return SchoolLicensesView.__super__.initialize.call(this);
  };

  SchoolLicensesView.prototype.updateSchools = function(prepaidActivityMap, schoolPrepaidsMap) {
    var activity, collapsedPrepaid, collapsedPrepaids, endDate, foundIdenticalDates, i, j, k, len, len1, len2, max, prepaid, prepaids, rangeMilliseconds, ref, ref1, ref2, ref3, ref4, school, schoolMax, schoolUsed, startDate, time2017, time2018, timeEnd, timeStart, used;
    timeStart = this.startDateRange.getTime();
    time2017 = new Date('2017').getTime();
    time2018 = new Date('2018').getTime();
    timeEnd = this.endDateRange.getTime();
    rangeMilliseconds = timeEnd - timeStart;
    this.rangeKeys = [
      {
        name: 'Today',
        color: 'blue',
        startScale: 0,
        width: Math.round((time2017 - timeStart) / rangeMilliseconds * 100)
      }, {
        name: '2017',
        color: 'red',
        startScale: Math.round((time2017 - timeStart) / rangeMilliseconds * 100),
        width: Math.round((time2018 - time2017) / rangeMilliseconds * 100)
      }, {
        name: '2018',
        color: 'yellow',
        startScale: Math.round((time2018 - timeStart) / rangeMilliseconds * 100),
        width: Math.round((timeEnd - time2018) / rangeMilliseconds * 100)
      }
    ];
    this.schools = [];
    for (school in schoolPrepaidsMap) {
      prepaids = schoolPrepaidsMap[school];
      activity = 0;
      schoolMax = 0;
      schoolUsed = 0;
      collapsedPrepaids = [];
      for (i = 0, len = prepaids.length; i < len; i++) {
        prepaid = prepaids[i];
        activity += (ref = prepaidActivityMap[prepaid._id]) != null ? ref : 0;
        startDate = prepaid.startDate;
        endDate = prepaid.endDate;
        max = parseInt(prepaid.maxRedeemers);
        used = parseInt((ref1 = (ref2 = prepaid.redeemers) != null ? ref2.length : void 0) != null ? ref1 : 0);
        schoolMax += max;
        schoolUsed += used;
        foundIdenticalDates = false;
        for (j = 0, len1 = collapsedPrepaids.length; j < len1; j++) {
          collapsedPrepaid = collapsedPrepaids[j];
          if (collapsedPrepaid.startDate.substring(0, 10) === startDate.substring(0, 10) && collapsedPrepaid.endDate.substring(0, 10) === endDate.substring(0, 10)) {
            collapsedPrepaid.max += parseInt(prepaid.maxRedeemers);
            collapsedPrepaid.used += parseInt((ref3 = (ref4 = prepaid.redeemers) != null ? ref4.length : void 0) != null ? ref3 : 0);
            foundIdenticalDates = true;
            break;
          }
        }
        if (!foundIdenticalDates) {
          collapsedPrepaids.push({
            startDate: startDate,
            endDate: endDate,
            max: max,
            used: used
          });
        }
      }
      for (k = 0, len2 = collapsedPrepaids.length; k < len2; k++) {
        collapsedPrepaid = collapsedPrepaids[k];
        collapsedPrepaid.startScale = (new Date(collapsedPrepaid.startDate).getTime() - this.startDateRange.getTime()) / rangeMilliseconds * 100;
        if (collapsedPrepaid.startScale < 0) {
          collapsedPrepaid.startScale = 0;
          collapsedPrepaid.rangeScale = (new Date(collapsedPrepaid.endDate).getTime() - this.startDateRange.getTime()) / rangeMilliseconds * 100;
        } else {
          collapsedPrepaid.rangeScale = (new Date(collapsedPrepaid.endDate).getTime() - new Date(collapsedPrepaid.startDate).getTime()) / rangeMilliseconds * 100;
        }
        if (collapsedPrepaid.rangeScale + collapsedPrepaid.startScale > 100) {
          collapsedPrepaid.rangeScale = 100 - collapsedPrepaid.startScale;
        }
      }
      this.schools.push({
        name: school,
        activity: activity,
        max: schoolMax,
        used: schoolUsed,
        prepaids: collapsedPrepaids,
        startDate: collapsedPrepaids[0].startDate,
        endDate: collapsedPrepaids[0].endDate
      });
    }
    this.schools.sort(function(a, b) {
      return b.activity - a.activity || new Date(a.endDate).getTime() - new Date(b.endDate).getTime() || b.max - a.max || b.used - a.used || b.prepaids.length - a.prepaids.length || b.name.localeCompare(a.name);
    });
    return this.render();
  };

  return SchoolLicensesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/SchoolLicensesView.js.map