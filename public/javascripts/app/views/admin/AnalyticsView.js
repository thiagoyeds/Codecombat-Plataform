require.register("views/admin/AnalyticsView", function(exports, require, module) {
var AnalyticsView, CocoCollection, Course, CourseInstance, Payment, RootView, d3Utils, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

CourseInstance = require('models/CourseInstance');

require('vendor/d3');

d3Utils = require('core/d3_utils');

Payment = require('models/Payment');

RootView = require('views/core/RootView');

template = require('templates/admin/analytics');

utils = require('core/utils');

module.exports = AnalyticsView = (function(superClass) {
  extend(AnalyticsView, superClass);

  function AnalyticsView() {
    return AnalyticsView.__super__.constructor.apply(this, arguments);
  }

  AnalyticsView.prototype.id = 'admin-analytics-view';

  AnalyticsView.prototype.template = template;

  AnalyticsView.prototype.furthestCourseDayRangeRecent = 60;

  AnalyticsView.prototype.furthestCourseDayRange = 365;

  AnalyticsView.prototype.lineColors = ['red', 'blue', 'green', 'purple', 'goldenrod', 'brown', 'darkcyan'];

  AnalyticsView.prototype.minSchoolCount = 20;

  AnalyticsView.prototype.initialize = function() {
    this.activeClasses = [];
    this.activeClassGroups = {};
    this.activeUsers = [];
    this.yearMonthMrrMap = {};
    this.monthMrrMap = {};
    this.revenue = [];
    this.revenueGroups = {};
    this.dayEnrollmentsMap = {};
    this.enrollmentDays = [];
    return this.loadData();
  };

  AnalyticsView.prototype.afterRender = function() {
    AnalyticsView.__super__.afterRender.call(this);
    return this.createLineCharts();
  };

  AnalyticsView.prototype.loadData = function() {
    this.supermodel.addRequestResource({
      url: '/db/analytics_perday/-/active_classes',
      method: 'POST',
      success: (function(_this) {
        return function(data) {
          var activeClass, dashedDay, day, dayGroupMap, group, groupMap, j, k, len, len1, name, ref, ref1, ref2, val;
          groupMap = {};
          dayGroupMap = {};
          for (j = 0, len = data.length; j < len; j++) {
            activeClass = data[j];
            if (dayGroupMap[name = activeClass.day] == null) {
              dayGroupMap[name] = {};
            }
            dayGroupMap[activeClass.day]['Total'] = 0;
            ref = activeClass.classes;
            for (group in ref) {
              val = ref[group];
              groupMap[group] = true;
              dayGroupMap[activeClass.day][group] = val;
              dayGroupMap[activeClass.day]['Total'] += val;
            }
          }
          _this.activeClassGroups = Object.keys(groupMap);
          _this.activeClassGroups.push('Total');
          _this.activeClasses = [];
          for (day in dayGroupMap) {
            dashedDay = (day.substring(0, 4)) + "-" + (day.substring(4, 6)) + "-" + (day.substring(6, 8));
            data = {
              day: dashedDay,
              groups: []
            };
            ref1 = _this.activeClassGroups;
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              group = ref1[k];
              data.groups.push((ref2 = dayGroupMap[day][group]) != null ? ref2 : 0);
            }
            _this.activeClasses.push(data);
          }
          _this.activeClasses.sort(function(a, b) {
            return b.day.localeCompare(a.day);
          });
          _this.updateAllKPIChartData();
          _this.updateActiveClassesChartData();
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    }, 0).load();
    this.supermodel.addRequestResource({
      url: '/db/analytics_perday/-/active_users',
      method: 'POST',
      success: (function(_this) {
        return function(data) {
          var campaignDauTotal, campaignDauTotals, classroomDauTotal, classroomDauTotals, count, day, entry, event, eventMap, j, len, ref, ref1;
          _this.activeUsers = data.map(function(a) {
            a.day = (a.day.substring(0, 4)) + "-" + (a.day.substring(4, 6)) + "-" + (a.day.substring(6, 8));
            return a;
          });
          campaignDauTotals = [];
          classroomDauTotals = [];
          eventMap = {};
          ref = _this.activeUsers;
          for (j = 0, len = ref.length; j < len; j++) {
            entry = ref[j];
            day = entry.day;
            campaignDauTotal = 0;
            classroomDauTotal = 0;
            ref1 = entry.events;
            for (event in ref1) {
              count = ref1[event];
              if (event.indexOf('DAU campaign') >= 0) {
                campaignDauTotal += count;
              } else if (event.indexOf('DAU classroom') >= 0) {
                classroomDauTotal += count;
              }
              eventMap[event] = true;
            }
            entry.events['DAU campaign total'] = campaignDauTotal;
            eventMap['DAU campaign total'] = true;
            campaignDauTotals.unshift(campaignDauTotal);
            while (campaignDauTotals.length > 30) {
              campaignDauTotals.pop();
            }
            if (campaignDauTotals.length === 30) {
              entry.events['DAU campaign 30-day average'] = Math.round(_.reduce(campaignDauTotals, function(a, b) {
                return a + b;
              }) / 30);
              eventMap['DAU campaign 30-day average'] = true;
            }
            entry.events['DAU classroom total'] = classroomDauTotal;
            eventMap['DAU classroom total'] = true;
            classroomDauTotals.unshift(classroomDauTotal);
            while (classroomDauTotals.length > 30) {
              classroomDauTotals.pop();
            }
            if (classroomDauTotals.length === 30) {
              entry.events['DAU classroom 30-day average'] = Math.round(_.reduce(classroomDauTotals, function(a, b) {
                return a + b;
              }) / 30);
              eventMap['DAU classroom 30-day average'] = true;
            }
          }
          _this.activeUsers.sort(function(a, b) {
            return b.day.localeCompare(a.day);
          });
          _this.activeUserEventNames = Object.keys(eventMap);
          _this.activeUserEventNames.sort(function(a, b) {
            if (a.indexOf('campaign') === b.indexOf('campaign') || a.indexOf('classroom') === b.indexOf('classroom')) {
              return a.localeCompare(b);
            } else if (a.indexOf('campaign') > b.indexOf('campaign')) {
              return 1;
            } else {
              return -1;
            }
          });
          _this.updateAllKPIChartData();
          _this.updateActiveUsersChartData();
          _this.updateCampaignVsClassroomActiveUsersChartData();
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    }, 0).load();
    this.supermodel.addRequestResource({
      url: '/db/analytics_perday/-/recurring_revenue',
      method: 'POST',
      success: (function(_this) {
        return function(data) {
          var base, dailyGroup, dailyGroupIndexMap, dailyRevenue, dailyTotal, dashedDay, day, dayGroupCountMap, group, groupMap, i, j, k, l, len, len1, len2, len3, len4, m, month, monthlyDailyGroupMap, monthlyGroup, monthlyValues, n, name, o, ref, ref1, ref2, ref3, ref4, ref5, ref6, revenue, val;
          groupMap = {};
          dayGroupCountMap = {};
          for (j = 0, len = data.length; j < len; j++) {
            dailyRevenue = data[j];
            if (dayGroupCountMap[name = dailyRevenue.day] == null) {
              dayGroupCountMap[name] = {};
            }
            dayGroupCountMap[dailyRevenue.day]['DRR Total'] = 0;
            ref = dailyRevenue.groups;
            for (group in ref) {
              val = ref[group];
              groupMap[group] = true;
              dayGroupCountMap[dailyRevenue.day][group] = val;
              dayGroupCountMap[dailyRevenue.day]['DRR Total'] += val;
            }
          }
          _this.revenueGroups = Object.keys(groupMap);
          _this.revenueGroups.push('DRR Total');
          _this.revenue = [];
          for (day in dayGroupCountMap) {
            dashedDay = (day.substring(0, 4)) + "-" + (day.substring(4, 6)) + "-" + (day.substring(6, 8));
            data = {
              day: dashedDay,
              groups: []
            };
            ref1 = _this.revenueGroups;
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              group = ref1[k];
              data.groups.push((ref2 = dayGroupCountMap[day][group]) != null ? ref2 : 0);
            }
            _this.revenue.push(data);
          }
          _this.revenue.sort(function(a, b) {
            return b.day.localeCompare(a.day);
          });
          if (!(_this.revenue.length > 0)) {
            return;
          }
          monthlyDailyGroupMap = {};
          dailyGroupIndexMap = {};
          ref3 = _this.revenueGroups;
          for (i = l = 0, len2 = ref3.length; l < len2; i = ++l) {
            group = ref3[i];
            monthlyDailyGroupMap[group.replace('DRR', 'MRR')] = group;
            dailyGroupIndexMap[group] = i;
          }
          for (monthlyGroup in monthlyDailyGroupMap) {
            dailyGroup = monthlyDailyGroupMap[monthlyGroup];
            monthlyValues = [];
            for (i = m = ref4 = _this.revenue.length - 1; ref4 <= 0 ? m <= 0 : m >= 0; i = ref4 <= 0 ? ++m : --m) {
              dailyTotal = _this.revenue[i].groups[dailyGroupIndexMap[dailyGroup]];
              monthlyValues.push(dailyTotal);
              while (monthlyValues.length > 30) {
                monthlyValues.shift();
              }
              if (monthlyValues.length === 30) {
                _this.revenue[i].groups.push(_.reduce(monthlyValues, function(s, num) {
                  return s + num;
                }));
              }
            }
          }
          for (monthlyGroup in monthlyDailyGroupMap) {
            dailyGroup = monthlyDailyGroupMap[monthlyGroup];
            _this.revenueGroups.push(monthlyGroup);
          }
          _this.monthMrrMap = {};
          ref5 = _this.revenue;
          for (n = 0, len3 = ref5.length; n < len3; n++) {
            revenue = ref5[n];
            month = revenue.day.substring(0, 7);
            if ((base = _this.monthMrrMap)[month] == null) {
              base[month] = {
                gems: 0,
                yearly: 0,
                monthly: 0,
                total: 0
              };
            }
            ref6 = _this.revenueGroups;
            for (i = o = 0, len4 = ref6.length; o < len4; i = ++o) {
              group = ref6[i];
              if (group === 'DRR gems') {
                _this.monthMrrMap[month].gems += revenue.groups[i];
              } else if (group === 'DRR monthly subs') {
                _this.monthMrrMap[month].monthly += revenue.groups[i];
              } else if (group === 'DRR yearly subs') {
                _this.monthMrrMap[month].yearly += revenue.groups[i];
              }
              if (group === 'DRR gems' || group === 'DRR monthly subs' || group === 'DRR yearly subs') {
                _this.monthMrrMap[month].total += revenue.groups[i];
              }
            }
          }
          _this.updateAllKPIChartData();
          _this.updateRevenueChartData();
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    }, 0).load();
    this.supermodel.addRequestResource({
      url: '/db/user/-/school_counts',
      method: 'POST',
      data: {
        minCount: this.minSchoolCount
      },
      success: (function(_this) {
        return function(schoolCounts) {
          var ref;
          _this.schoolCounts = schoolCounts;
          if ((ref = _this.schoolCounts) != null) {
            ref.sort(function(a, b) {
              if (a.count > b.count) {
                return -1;
              }
              if (a.count === b.count) {
                return 0;
              }
              return 1;
            });
          }
          return typeof _this.renderSelectors === "function" ? _this.renderSelectors('#school-counts') : void 0;
        };
      })(this)
    }, 0).load();
    this.supermodel.addRequestResource({
      url: '/db/payment/-/school_sales',
      success: (function(_this) {
        return function(schoolSales) {
          var ref;
          _this.schoolSales = schoolSales;
          if ((ref = _this.schoolSales) != null) {
            ref.sort(function(a, b) {
              if (a.created > b.created) {
                return -1;
              }
              if (a.created === b.created) {
                return 0;
              }
              return 1;
            });
          }
          return typeof _this.renderSelectors === "function" ? _this.renderSelectors('.school-sales') : void 0;
        };
      })(this)
    }, 0).load();
    this.supermodel.addRequestResource({
      url: '/db/prepaid/-/courses',
      method: 'POST',
      data: {
        project: {
          endDate: 1,
          maxRedeemers: 1,
          properties: 1,
          redeemers: 1
        }
      },
      success: (function(_this) {
        return function(prepaids) {
          var base, base1, base2, base3, count, day, j, k, l, len, len1, len2, paidDayMaxMap, paidDayRedeemedMap, prepaid, redeemDay, redeemer, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, trialDayMaxMap, trialDayRedeemedMap;
          paidDayMaxMap = {};
          paidDayRedeemedMap = {};
          trialDayMaxMap = {};
          trialDayRedeemedMap = {};
          for (j = 0, len = prepaids.length; j < len; j++) {
            prepaid = prepaids[j];
            day = utils.objectIdToDate(prepaid._id).toISOString().substring(0, 10);
            if ((((ref = prepaid.properties) != null ? ref.trialRequestID : void 0) != null) || (((ref1 = prepaid.properties) != null ? ref1.endDate : void 0) != null)) {
              if (trialDayMaxMap[day] == null) {
                trialDayMaxMap[day] = 0;
              }
              if (((ref2 = prepaid.properties) != null ? ref2.endDate : void 0) != null) {
                trialDayMaxMap[day] += (ref3 = (ref4 = prepaid.redeemers) != null ? ref4.length : void 0) != null ? ref3 : 0;
              } else {
                trialDayMaxMap[day] += prepaid.maxRedeemers;
              }
              ref6 = (ref5 = prepaid.redeemers) != null ? ref5 : [];
              for (k = 0, len1 = ref6.length; k < len1; k++) {
                redeemer = ref6[k];
                redeemDay = redeemer.date.substring(0, 10);
                if (trialDayRedeemedMap[redeemDay] == null) {
                  trialDayRedeemedMap[redeemDay] = 0;
                }
                trialDayRedeemedMap[redeemDay]++;
              }
            } else if ((prepaid.endDate == null) || new Date(prepaid.endDate) > new Date()) {
              if (paidDayMaxMap[day] == null) {
                paidDayMaxMap[day] = 0;
              }
              paidDayMaxMap[day] += prepaid.maxRedeemers;
              ref7 = prepaid.redeemers;
              for (l = 0, len2 = ref7.length; l < len2; l++) {
                redeemer = ref7[l];
                redeemDay = redeemer.date.substring(0, 10);
                if (paidDayRedeemedMap[redeemDay] == null) {
                  paidDayRedeemedMap[redeemDay] = 0;
                }
                paidDayRedeemedMap[redeemDay]++;
              }
            }
          }
          _this.dayEnrollmentsMap = {};
          _this.paidCourseTotalEnrollments = [];
          for (day in paidDayMaxMap) {
            count = paidDayMaxMap[day];
            _this.paidCourseTotalEnrollments.push({
              day: day,
              count: count
            });
            if ((base = _this.dayEnrollmentsMap)[day] == null) {
              base[day] = {
                paidIssued: 0,
                paidRedeemed: 0,
                trialIssued: 0,
                trialRedeemed: 0
              };
            }
            _this.dayEnrollmentsMap[day].paidIssued += count;
          }
          _this.paidCourseTotalEnrollments.sort(function(a, b) {
            return a.day.localeCompare(b.day);
          });
          _this.paidCourseRedeemedEnrollments = [];
          for (day in paidDayRedeemedMap) {
            count = paidDayRedeemedMap[day];
            _this.paidCourseRedeemedEnrollments.push({
              day: day,
              count: count
            });
            if ((base1 = _this.dayEnrollmentsMap)[day] == null) {
              base1[day] = {
                paidIssued: 0,
                paidRedeemed: 0,
                trialIssued: 0,
                trialRedeemed: 0
              };
            }
            _this.dayEnrollmentsMap[day].paidRedeemed += count;
          }
          _this.paidCourseRedeemedEnrollments.sort(function(a, b) {
            return a.day.localeCompare(b.day);
          });
          _this.trialCourseTotalEnrollments = [];
          for (day in trialDayMaxMap) {
            count = trialDayMaxMap[day];
            _this.trialCourseTotalEnrollments.push({
              day: day,
              count: count
            });
            if ((base2 = _this.dayEnrollmentsMap)[day] == null) {
              base2[day] = {
                paidIssued: 0,
                paidRedeemed: 0,
                trialIssued: 0,
                trialRedeemed: 0
              };
            }
            _this.dayEnrollmentsMap[day].trialIssued += count;
          }
          _this.trialCourseTotalEnrollments.sort(function(a, b) {
            return a.day.localeCompare(b.day);
          });
          _this.trialCourseRedeemedEnrollments = [];
          for (day in trialDayRedeemedMap) {
            count = trialDayRedeemedMap[day];
            _this.trialCourseRedeemedEnrollments.push({
              day: day,
              count: count
            });
            if ((base3 = _this.dayEnrollmentsMap)[day] == null) {
              base3[day] = {
                paidIssued: 0,
                paidRedeemed: 0,
                trialIssued: 0,
                trialRedeemed: 0
              };
            }
            _this.dayEnrollmentsMap[day].trialRedeemed += count;
          }
          _this.trialCourseRedeemedEnrollments.sort(function(a, b) {
            return a.day.localeCompare(b.day);
          });
          _this.updateEnrollmentsChartData();
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    }, 0).load();
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.listenToOnce(this.courses, 'sync', this.onCoursesSync);
    return this.supermodel.loadCollection(this.courses);
  };

  AnalyticsView.prototype.onCoursesSync = function() {
    var i, j, options, ref, ref1, sortedCourses, startDay;
    this.courses.remove(this.courses.findWhere({
      releasePhase: 'beta'
    }));
    sortedCourses = utils.sortCourses((ref = this.courses.models) != null ? ref : []);
    this.courseOrderMap = {};
    for (i = j = 0, ref1 = sortedCourses.length; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
      this.courseOrderMap[sortedCourses[i].get('_id')] = i;
    }
    startDay = new Date();
    startDay.setUTCDate(startDay.getUTCDate() - this.furthestCourseDayRange);
    startDay = startDay.toISOString().substring(0, 10);
    options = {
      url: '/db/course_instance/-/recent',
      method: 'POST',
      data: {
        startDay: startDay
      }
    };
    options.error = (function(_this) {
      return function(models, response, options) {
        if (_this.destroyed) {
          return;
        }
        return console.error('Failed to get recent course instances', response);
      };
    })(this);
    options.success = (function(_this) {
      return function(data) {
        _this.onCourseInstancesSync(data);
        return typeof _this.renderSelectors === "function" ? _this.renderSelectors('#furthest-course') : void 0;
      };
    })(this);
    return this.supermodel.addRequestResource(options, 0).load();
  };

  AnalyticsView.prototype.onCourseInstancesSync = function(data) {
    var createCourseDistributions;
    this.courseDistributionsRecent = [];
    this.courseDistributions = [];
    if (!(data.courseInstances && data.students && data.prepaids)) {
      return;
    }
    createCourseDistributions = (function(_this) {
      return function(numDays) {
        var courseDistributions, courseID, courseInstance, courseName, courseTotalsMap, j, k, l, len, len1, len2, len3, len4, len5, m, n, o, prepaid, prepaidID, prepaidUserMap, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, startDate, student, studentFurthestCourseMap, studentID, studentPaidStatusMap, students, teacher, teacherFurthestCourseMap, teacherID, teacherPaidStatusMap, teacherStudentsMap, totals, updateCourseTotalsMap, user, userID;
        startDate = new Date();
        startDate.setUTCDate(startDate.getUTCDate() - numDays);
        teacherStudentsMap = {};
        studentFurthestCourseMap = {};
        studentPaidStatusMap = {};
        ref = data.courseInstances;
        for (j = 0, len = ref.length; j < len; j++) {
          courseInstance = ref[j];
          if (utils.objectIdToDate(courseInstance._id) < startDate) {
            continue;
          }
          courseID = courseInstance.courseID;
          if (_this.courseOrderMap[courseID] == null) {
            console.error("ERROR: no course order for courseID=" + courseID);
            continue;
          }
          teacherID = courseInstance.ownerID;
          ref1 = courseInstance.members;
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            studentID = ref1[k];
            studentPaidStatusMap[studentID] = 'free';
            if (!studentFurthestCourseMap[studentID] || studentFurthestCourseMap[studentID] < _this.courseOrderMap[courseID]) {
              studentFurthestCourseMap[studentID] = _this.courseOrderMap[courseID];
            }
            if (teacherStudentsMap[teacherID] == null) {
              teacherStudentsMap[teacherID] = [];
            }
            teacherStudentsMap[teacherID].push(studentID);
          }
        }
        prepaidUserMap = {};
        ref2 = data.students;
        for (l = 0, len2 = ref2.length; l < len2; l++) {
          user = ref2[l];
          if (!studentPaidStatusMap[user._id]) {
            continue;
          }
          if (prepaidID = (ref3 = user.coursePrepaid) != null ? ref3._id : void 0) {
            studentPaidStatusMap[user._id] = 'paid';
            if (prepaidUserMap[prepaidID] == null) {
              prepaidUserMap[prepaidID] = [];
            }
            prepaidUserMap[prepaidID].push(user._id);
          }
        }
        ref4 = data.prepaids;
        for (m = 0, len3 = ref4.length; m < len3; m++) {
          prepaid = ref4[m];
          if (!prepaidUserMap[prepaid._id]) {
            continue;
          }
          if ((ref5 = prepaid.properties) != null ? ref5.trialRequestID : void 0) {
            ref6 = prepaidUserMap[prepaid._id];
            for (n = 0, len4 = ref6.length; n < len4; n++) {
              userID = ref6[n];
              studentPaidStatusMap[userID] = 'trial';
            }
          }
        }
        teacherFurthestCourseMap = {};
        teacherPaidStatusMap = {};
        for (teacher in teacherStudentsMap) {
          students = teacherStudentsMap[teacher];
          for (o = 0, len5 = students.length; o < len5; o++) {
            student = students[o];
            if (studentFurthestCourseMap[student] == null) {
              console.error("ERROR: no student furthest map for teacher=" + teacher + " student=" + student);
              continue;
            }
            if (!teacherPaidStatusMap[teacher]) {
              teacherPaidStatusMap[teacher] = studentPaidStatusMap[student];
              teacherFurthestCourseMap[teacher] = studentFurthestCourseMap[student];
            } else if (teacherPaidStatusMap[teacher] === 'paid') {
              if (studentPaidStatusMap[student] === 'paid' && teacherFurthestCourseMap[teacher] < studentFurthestCourseMap[student]) {
                teacherFurthestCourseMap[teacher] = studentFurthestCourseMap[student];
              }
            } else if (teacherPaidStatusMap[teacher] === 'trial') {
              if (studentPaidStatusMap[student] === 'paid') {
                teacherPaidStatusMap[teacher] = studentPaidStatusMap[student];
                teacherFurthestCourseMap[teacher] = studentFurthestCourseMap[student];
              } else if (studentPaidStatusMap[student] === 'trial' && teacherFurthestCourseMap[teacher] < studentFurthestCourseMap[student]) {
                teacherFurthestCourseMap[teacher] = studentFurthestCourseMap[student];
              }
            } else {
              if ((ref7 = studentPaidStatusMap[student]) === 'paid' || ref7 === 'trial') {
                teacherPaidStatusMap[teacher] = studentPaidStatusMap[student];
                teacherFurthestCourseMap[teacher] = studentFurthestCourseMap[student];
              } else if (studentPaidStatusMap[student] === 'free' && teacherFurthestCourseMap[teacher] < studentFurthestCourseMap[student]) {
                teacherFurthestCourseMap[teacher] = studentFurthestCourseMap[student];
              }
            }
          }
        }
        updateCourseTotalsMap = function(courseTotalsMap, furthestCourseMap, paidStatusMap, columnSuffix) {
          var base, base1, base2, base3, columnName, courseIndex, courseName, name, name1, results;
          results = [];
          for (user in furthestCourseMap) {
            courseIndex = furthestCourseMap[user];
            courseName = _this.courses.models[courseIndex].get('name');
            if (courseTotalsMap[courseName] == null) {
              courseTotalsMap[courseName] = {};
            }
            columnName = (function() {
              switch (paidStatusMap[user]) {
                case 'paid':
                  return 'Paid ' + columnSuffix;
                case 'trial':
                  return 'Trial ' + columnSuffix;
                case 'free':
                  return 'Free ' + columnSuffix;
              }
            })();
            if ((base = courseTotalsMap[courseName])[columnName] == null) {
              base[columnName] = 0;
            }
            courseTotalsMap[courseName][columnName]++;
            if ((base1 = courseTotalsMap[courseName])[name = 'Total ' + columnSuffix] == null) {
              base1[name] = 0;
            }
            courseTotalsMap[courseName]['Total ' + columnSuffix]++;
            if ((base2 = courseTotalsMap['All Courses'])[name1 = 'Total ' + columnSuffix] == null) {
              base2[name1] = 0;
            }
            courseTotalsMap['All Courses']['Total ' + columnSuffix]++;
            if ((base3 = courseTotalsMap['All Courses'])[columnName] == null) {
              base3[columnName] = 0;
            }
            results.push(courseTotalsMap['All Courses'][columnName]++);
          }
          return results;
        };
        courseTotalsMap = {
          'All Courses': {}
        };
        updateCourseTotalsMap(courseTotalsMap, teacherFurthestCourseMap, teacherPaidStatusMap, 'Teachers');
        updateCourseTotalsMap(courseTotalsMap, studentFurthestCourseMap, studentPaidStatusMap, 'Students');
        courseDistributions = [];
        for (courseName in courseTotalsMap) {
          totals = courseTotalsMap[courseName];
          courseDistributions.push({
            courseName: courseName,
            totals: totals
          });
        }
        courseDistributions.sort(function(a, b) {
          var aID, bID;
          if (a.courseName.indexOf('All Courses') >= 0 && b.courseName.indexOf('All Courses') < 0) {
            return 1;
          } else if (b.courseName.indexOf('All Courses') >= 0 && a.courseName.indexOf('All Courses') < 0) {
            return -1;
          }
          aID = _this.courses.findWhere({
            name: a.courseName
          }).id;
          bID = _this.courses.findWhere({
            name: b.courseName
          }).id;
          return _this.courseOrderMap[aID] - _this.courseOrderMap[bID];
        });
        return courseDistributions;
      };
    })(this);
    this.courseDistributionsRecent = createCourseDistributions(this.furthestCourseDayRangeRecent);
    return this.courseDistributions = createCourseDistributions(this.furthestCourseDayRange);
  };

  AnalyticsView.prototype.createLineChartPoints = function(days, data) {
    var day, entry, i, j, k, l, len, len1, len2, point, points, prevY, ref;
    points = [];
    for (i = j = 0, len = data.length; j < len; i = ++j) {
      entry = data[i];
      points.push({
        day: entry.day,
        y: entry.value
      });
    }
    if (points.length && days.length && points[0].day.localeCompare(days[0]) < 0) {
      if (points[points.length - 1].day.localeCompare(days[0]) < 0) {
        points = [];
      } else {
        for (i = k = 0, len1 = points.length; k < len1; i = ++k) {
          point = points[i];
          if (point.day.localeCompare(days[0]) >= 0) {
            points.splice(0, i);
            break;
          }
        }
      }
    }
    for (i = l = 0, len2 = days.length; l < len2; i = ++l) {
      day = days[i];
      if (points.length <= i || ((ref = points[i]) != null ? ref.day : void 0) !== day) {
        prevY = i > 0 ? points[i - 1].y : 0.0;
        points.splice(i, 0, {
          day: day,
          y: prevY
        });
      }
      points[i].x = i;
    }
    if (points.length > days.length) {
      points.splice(0, points.length - days.length);
    }
    return points;
  };

  AnalyticsView.prototype.createLineCharts = function() {
    var visibleWidth;
    visibleWidth = $('.kpi-recent-chart').width();
    d3Utils.createLineChart('.kpi-recent-chart', this.kpiRecentChartLines, visibleWidth);
    d3Utils.createLineChart('.kpi-chart', this.kpiChartLines, visibleWidth);
    d3Utils.createLineChart('.active-classes-chart-90', this.activeClassesChartLines90, visibleWidth);
    d3Utils.createLineChart('.active-classes-chart-365', this.activeClassesChartLines365, visibleWidth);
    d3Utils.createLineChart('.classroom-daily-active-users-chart-90', this.classroomDailyActiveUsersChartLines90, visibleWidth);
    d3Utils.createLineChart('.classroom-monthly-active-users-chart-90', this.classroomMonthlyActiveUsersChartLines90, visibleWidth);
    d3Utils.createLineChart('.classroom-daily-active-users-chart-365', this.classroomDailyActiveUsersChartLines365, visibleWidth);
    d3Utils.createLineChart('.classroom-monthly-active-users-chart-365', this.classroomMonthlyActiveUsersChartLines365, visibleWidth);
    d3Utils.createLineChart('.campaign-daily-active-users-chart-90', this.campaignDailyActiveUsersChartLines90, visibleWidth);
    d3Utils.createLineChart('.campaign-monthly-active-users-chart-90', this.campaignMonthlyActiveUsersChartLines90, visibleWidth);
    d3Utils.createLineChart('.campaign-daily-active-users-chart-365', this.campaignDailyActiveUsersChartLines365, visibleWidth);
    d3Utils.createLineChart('.campaign-monthly-active-users-chart-365', this.campaignMonthlyActiveUsersChartLines365, visibleWidth);
    d3Utils.createLineChart('.campaign-vs-classroom-monthly-active-users-recent-chart.line-chart-container', this.campaignVsClassroomMonthlyActiveUsersRecentChartLines, visibleWidth);
    d3Utils.createLineChart('.campaign-vs-classroom-monthly-active-users-chart.line-chart-container', this.campaignVsClassroomMonthlyActiveUsersChartLines, visibleWidth);
    d3Utils.createLineChart('.paid-courses-chart', this.enrollmentsChartLines, visibleWidth);
    d3Utils.createLineChart('.recurring-daily-revenue-chart-90', this.revenueDailyChartLines90Days, visibleWidth);
    d3Utils.createLineChart('.recurring-monthly-revenue-chart-90', this.revenueMonthlyChartLines90Days, visibleWidth);
    d3Utils.createLineChart('.recurring-daily-revenue-chart-365', this.revenueDailyChartLines365Days, visibleWidth);
    return d3Utils.createLineChart('.recurring-monthly-revenue-chart-365', this.revenueMonthlyChartLines365Days, visibleWidth);
  };

  AnalyticsView.prototype.updateAllKPIChartData = function() {
    var base, base1, currentMonth, currentMonthMultipler, currentYear, currentYearMonth, entry, i, j, k, len, monthlySubAmount, ref, ref1, ref2, ref3, thisMonth, yearlySubAmount;
    if (((ref = this.revenue) != null ? ref.length : void 0) > 0) {
      this.yearMonthMrrMap = {};
      thisMonth = new Date().toISOString().substring(0, 7);
      currentMonthMultipler = 30 / new Date().getUTCDate();
      ref1 = this.revenue;
      for (j = 0, len = ref1.length; j < len; j++) {
        entry = ref1[j];
        monthlySubAmount = (ref2 = entry.groups[this.revenueGroups.indexOf('DRR monthly subs')]) != null ? ref2 : 0;
        currentYearMonth = entry.day.substring(0, 7);
        if ((base = this.yearMonthMrrMap)[currentYearMonth] == null) {
          base[currentYearMonth] = 0;
        }
        if (currentYearMonth === thisMonth) {
          this.yearMonthMrrMap[currentYearMonth] += monthlySubAmount * currentMonthMultipler;
        } else {
          this.yearMonthMrrMap[currentYearMonth] += monthlySubAmount;
        }
        yearlySubAmount = ((ref3 = entry.groups[this.revenueGroups.indexOf('DRR yearly subs')]) != null ? ref3 : 0) / 12;
        if (yearlySubAmount > 0) {
          currentYear = parseInt(entry.day.substring(0, 4));
          currentMonth = parseInt(entry.day.substring(5, 7));
          for (i = k = 0; k < 12; i = ++k) {
            if (currentMonth > 9) {
              currentYearMonth = currentYear + "-" + currentMonth;
            } else {
              currentYearMonth = currentYear + "-0" + currentMonth;
            }
            if ((base1 = this.yearMonthMrrMap)[currentYearMonth] == null) {
              base1[currentYearMonth] = 0;
            }
            if (currentYearMonth === thisMonth) {
              this.yearMonthMrrMap[currentYearMonth] += yearlySubAmount * currentMonthMultipler;
            } else {
              this.yearMonthMrrMap[currentYearMonth] += yearlySubAmount;
            }
            currentMonth++;
            if (currentMonth === 13) {
              currentYear++;
              currentMonth = 1;
            }
          }
        }
      }
    }
    this.kpiRecentChartLines = [];
    this.kpiChartLines = [];
    this.updateKPIChartData(60, this.kpiRecentChartLines);
    return this.updateKPIChartData(365, this.kpiChartLines);
  };

  AnalyticsView.prototype.updateKPIChartData = function(timeframeDays, chartLines) {
    var base, campaignData, count, currentMonth, data, day, days, entry, event, eventDayDataMap, j, k, l, len, len1, len2, points, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
    days = d3Utils.createContiguousDays(timeframeDays);
    if (((ref = this.activeClasses) != null ? ref.length : void 0) > 0) {
      data = [];
      ref1 = this.activeClasses;
      for (j = 0, len = ref1.length; j < len; j++) {
        entry = ref1[j];
        data.push({
          day: entry.day,
          value: entry.groups[entry.groups.length - 1]
        });
      }
      data.reverse();
      points = this.createLineChartPoints(days, data);
      chartLines.push({
        points: points,
        description: 'Monthly Active Classes',
        lineColor: 'blue',
        strokeWidth: 1,
        min: 0,
        max: _.max(points, 'y').y,
        showYScale: true
      });
    }
    if (((ref2 = this.revenue) != null ? ref2.length : void 0) > 0) {
      data = [];
      ref3 = this.revenue;
      for (k = 0, len1 = ref3.length; k < len1; k++) {
        entry = ref3[k];
        currentMonth = entry.day.substring(0, 7);
        value = this.yearMonthMrrMap[currentMonth];
        data.push({
          day: entry.day,
          value: value / 100 / 1000
        });
      }
      data.reverse();
      points = this.createLineChartPoints(days, data);
      chartLines.push({
        points: points,
        description: 'Monthly Recurring Revenue (in thousands)',
        lineColor: 'green',
        strokeWidth: 1,
        min: 0,
        max: _.max(points, 'y').y,
        showYScale: true
      });
    }
    if (((ref4 = this.activeUsers) != null ? ref4.length : void 0) > 0) {
      eventDayDataMap = {};
      ref5 = this.activeUsers;
      for (l = 0, len2 = ref5.length; l < len2; l++) {
        entry = ref5[l];
        day = entry.day;
        ref6 = entry.events;
        for (event in ref6) {
          count = ref6[event];
          if (event.indexOf('MAU campaign') >= 0) {
            if (eventDayDataMap['MAU campaign'] == null) {
              eventDayDataMap['MAU campaign'] = {};
            }
            if ((base = eventDayDataMap['MAU campaign'])[day] == null) {
              base[day] = 0;
            }
            eventDayDataMap['MAU campaign'][day] += count;
          }
        }
      }
      campaignData = [];
      for (event in eventDayDataMap) {
        entry = eventDayDataMap[event];
        for (day in entry) {
          count = entry[day];
          campaignData.push({
            day: day,
            value: count / 1000
          });
        }
      }
      campaignData.reverse();
      points = this.createLineChartPoints(days, campaignData);
      return chartLines.push({
        points: points,
        description: 'Home Monthly Active Users (in thousands)',
        lineColor: 'purple',
        strokeWidth: 1,
        min: 0,
        max: _.max(points, 'y').y,
        showYScale: true
      });
    }
  };

  AnalyticsView.prototype.updateActiveClassesChartData = function() {
    var base, count, createActiveClassesChartLines, entry, groupDayMap, i, j, k, len, len1, name, name1, ref, ref1, ref2;
    this.activeClassesChartLines90 = [];
    this.activeClassesChartLines365 = [];
    if (!((ref = this.activeClasses) != null ? ref.length : void 0)) {
      return;
    }
    groupDayMap = {};
    ref1 = this.activeClasses;
    for (j = 0, len = ref1.length; j < len; j++) {
      entry = ref1[j];
      ref2 = entry.groups;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        count = ref2[i];
        if (groupDayMap[name = this.activeClassGroups[i]] == null) {
          groupDayMap[name] = {};
        }
        if ((base = groupDayMap[this.activeClassGroups[i]])[name1 = entry.day] == null) {
          base[name1] = 0;
        }
        groupDayMap[this.activeClassGroups[i]][entry.day] += count;
      }
    }
    createActiveClassesChartLines = (function(_this) {
      return function(lines, numDays) {
        var colorIndex, data, day, days, entries, group, l, len2, line, points, results, totalMax;
        days = d3Utils.createContiguousDays(numDays);
        colorIndex = 0;
        totalMax = 0;
        for (group in groupDayMap) {
          entries = groupDayMap[group];
          data = [];
          for (day in entries) {
            count = entries[day];
            data.push({
              day: day,
              value: count
            });
          }
          data.reverse();
          points = _this.createLineChartPoints(days, data);
          lines.push({
            points: points,
            description: group.replace('Active classes ', ''),
            lineColor: _this.lineColors[colorIndex++ % _this.lineColors.length],
            strokeWidth: 1,
            min: 0,
            showYScale: group === 'Total'
          });
          if (group === 'Total') {
            totalMax = _.max(points, 'y').y;
          }
        }
        results = [];
        for (l = 0, len2 = lines.length; l < len2; l++) {
          line = lines[l];
          results.push(line.max = totalMax);
        }
        return results;
      };
    })(this);
    createActiveClassesChartLines(this.activeClassesChartLines90, 90);
    return createActiveClassesChartLines(this.activeClassesChartLines365, 365);
  };

  AnalyticsView.prototype.updateActiveUsersChartData = function() {
    var count, createActiveUsersChartLines, day, entry, event, eventDataMap, j, len, ref, ref1, ref2;
    this.campaignDailyActiveUsersChartLines90 = [];
    this.campaignMonthlyActiveUsersChartLines90 = [];
    this.campaignDailyActiveUsersChartLines365 = [];
    this.campaignMonthlyActiveUsersChartLines365 = [];
    this.classroomDailyActiveUsersChartLines90 = [];
    this.classroomMonthlyActiveUsersChartLines90 = [];
    this.classroomDailyActiveUsersChartLines365 = [];
    this.classroomMonthlyActiveUsersChartLines365 = [];
    if (!((ref = this.activeUsers) != null ? ref.length : void 0)) {
      return;
    }
    eventDataMap = {};
    ref1 = this.activeUsers;
    for (j = 0, len = ref1.length; j < len; j++) {
      entry = ref1[j];
      day = entry.day;
      ref2 = entry.events;
      for (event in ref2) {
        count = ref2[event];
        if (eventDataMap[event] == null) {
          eventDataMap[event] = [];
        }
        eventDataMap[event].push({
          day: entry.day,
          value: count
        });
      }
    }
    createActiveUsersChartLines = (function(_this) {
      return function(lines, numDays, eventPrefix) {
        var colorIndex, data, days, k, len1, line, lineMax, points, results, showYScale;
        days = d3Utils.createContiguousDays(numDays);
        colorIndex = 0;
        lineMax = 0;
        showYScale = true;
        for (event in eventDataMap) {
          data = eventDataMap[event];
          if (!(event.indexOf(eventPrefix) >= 0)) {
            continue;
          }
          points = _this.createLineChartPoints(days, _.cloneDeep(data).reverse());
          lineMax = Math.max(_.max(points, 'y').y, lineMax);
          lines.push({
            points: points,
            description: event,
            lineColor: _this.lineColors[colorIndex++ % _this.lineColors.length],
            strokeWidth: 1,
            min: 0,
            showYScale: showYScale
          });
          showYScale = false;
        }
        results = [];
        for (k = 0, len1 = lines.length; k < len1; k++) {
          line = lines[k];
          line.description = line.description.replace('campaign', 'home');
          results.push(line.max = lineMax);
        }
        return results;
      };
    })(this);
    createActiveUsersChartLines(this.campaignDailyActiveUsersChartLines90, 90, 'DAU campaign');
    createActiveUsersChartLines(this.campaignMonthlyActiveUsersChartLines90, 90, 'MAU campaign');
    createActiveUsersChartLines(this.classroomDailyActiveUsersChartLines90, 90, 'DAU classroom');
    createActiveUsersChartLines(this.classroomMonthlyActiveUsersChartLines90, 90, 'MAU classroom');
    createActiveUsersChartLines(this.campaignDailyActiveUsersChartLines365, 365, 'DAU campaign');
    createActiveUsersChartLines(this.campaignMonthlyActiveUsersChartLines365, 365, 'MAU campaign');
    createActiveUsersChartLines(this.classroomDailyActiveUsersChartLines365, 365, 'DAU classroom');
    return createActiveUsersChartLines(this.classroomMonthlyActiveUsersChartLines365, 365, 'MAU classroom');
  };

  AnalyticsView.prototype.updateCampaignVsClassroomActiveUsersChartData = function() {
    var colorIndex, count, data, day, days, entry, event, eventDataMap, j, k, l, len, len1, len2, line, max, points, ref, ref1, ref2, ref3, ref4, results;
    this.campaignVsClassroomMonthlyActiveUsersRecentChartLines = [];
    this.campaignVsClassroomMonthlyActiveUsersChartLines = [];
    if (!((ref = this.activeUsers) != null ? ref.length : void 0)) {
      return;
    }
    eventDataMap = {};
    ref1 = this.activeUsers;
    for (j = 0, len = ref1.length; j < len; j++) {
      entry = ref1[j];
      day = entry.day;
      ref2 = entry.events;
      for (event in ref2) {
        count = ref2[event];
        if (eventDataMap[event] == null) {
          eventDataMap[event] = [];
        }
        eventDataMap[event].push({
          day: entry.day,
          value: count
        });
      }
    }
    days = d3Utils.createContiguousDays(90);
    colorIndex = 0;
    max = 0;
    for (event in eventDataMap) {
      data = eventDataMap[event];
      if (event === 'MAU campaign paid') {
        points = this.createLineChartPoints(days, _.cloneDeep(data).reverse());
        max = Math.max(max, _.max(points, 'y').y);
        this.campaignVsClassroomMonthlyActiveUsersRecentChartLines.push({
          points: points,
          description: event,
          lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
          strokeWidth: 1,
          min: 0,
          showYScale: true
        });
      } else if (event === 'MAU classroom paid') {
        points = this.createLineChartPoints(days, _.cloneDeep(data).reverse());
        max = Math.max(max, _.max(points, 'y').y);
        this.campaignVsClassroomMonthlyActiveUsersRecentChartLines.push({
          points: points,
          description: event,
          lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
          strokeWidth: 1,
          min: 0,
          showYScale: false
        });
      }
    }
    ref3 = this.campaignVsClassroomMonthlyActiveUsersRecentChartLines;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      line = ref3[k];
      line.max = max;
      line.description = line.description.replace('campaign', 'home');
    }
    days = d3Utils.createContiguousDays(365);
    colorIndex = 0;
    max = 0;
    for (event in eventDataMap) {
      data = eventDataMap[event];
      if (event === 'MAU campaign paid') {
        points = this.createLineChartPoints(days, _.cloneDeep(data).reverse());
        max = Math.max(max, _.max(points, 'y').y);
        this.campaignVsClassroomMonthlyActiveUsersChartLines.push({
          points: points,
          description: event,
          lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
          strokeWidth: 1,
          min: 0,
          showYScale: true
        });
      } else if (event === 'MAU classroom paid') {
        points = this.createLineChartPoints(days, _.cloneDeep(data).reverse());
        max = Math.max(max, _.max(points, 'y').y);
        this.campaignVsClassroomMonthlyActiveUsersChartLines.push({
          points: points,
          description: event,
          lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
          strokeWidth: 1,
          min: 0,
          showYScale: false
        });
      }
    }
    ref4 = this.campaignVsClassroomMonthlyActiveUsersChartLines;
    results = [];
    for (l = 0, len2 = ref4.length; l < len2; l++) {
      line = ref4[l];
      line.max = max;
      results.push(line.description = line.description.replace('campaign', 'home'));
    }
    return results;
  };

  AnalyticsView.prototype.updateEnrollmentsChartData = function() {
    var colorIndex, dailyMax, data, days, entry, j, k, l, len, len1, len2, len3, len4, line, m, n, points, ref, ref1, ref2, ref3, ref4, ref5, ref6, results;
    this.enrollmentsChartLines = [];
    if (!(((ref = this.paidCourseTotalEnrollments) != null ? ref.length : void 0) && ((ref1 = this.trialCourseTotalEnrollments) != null ? ref1.length : void 0))) {
      return;
    }
    days = d3Utils.createContiguousDays(90, false);
    this.enrollmentDays = _.cloneDeep(days);
    this.enrollmentDays.reverse();
    colorIndex = 0;
    dailyMax = 0;
    data = [];
    ref2 = this.paidCourseTotalEnrollments;
    for (j = 0, len = ref2.length; j < len; j++) {
      entry = ref2[j];
      data.push({
        day: entry.day,
        value: entry.count
      });
    }
    points = this.createLineChartPoints(days, data);
    this.enrollmentsChartLines.push({
      points: points,
      description: 'Paid enrollments issued',
      lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
      strokeWidth: 1,
      min: 0,
      max: _.max(points, 'y').y,
      showYScale: true
    });
    dailyMax = _.max([dailyMax, _.max(points, 'y').y]);
    data = [];
    ref3 = this.paidCourseRedeemedEnrollments;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      entry = ref3[k];
      data.push({
        day: entry.day,
        value: entry.count
      });
    }
    points = this.createLineChartPoints(days, data);
    this.enrollmentsChartLines.push({
      points: points,
      description: 'Paid enrollments redeemed',
      lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
      strokeWidth: 1,
      min: 0,
      max: _.max(points, 'y').y,
      showYScale: false
    });
    dailyMax = _.max([dailyMax, _.max(points, 'y').y]);
    data = [];
    ref4 = this.trialCourseTotalEnrollments;
    for (l = 0, len2 = ref4.length; l < len2; l++) {
      entry = ref4[l];
      data.push({
        day: entry.day,
        value: entry.count
      });
    }
    points = this.createLineChartPoints(days, data, true);
    this.enrollmentsChartLines.push({
      points: points,
      description: 'Trial enrollments issued',
      lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
      strokeWidth: 1,
      min: 0,
      max: _.max(points, 'y').y,
      showYScale: false
    });
    dailyMax = _.max([dailyMax, _.max(points, 'y').y]);
    data = [];
    ref5 = this.trialCourseRedeemedEnrollments;
    for (m = 0, len3 = ref5.length; m < len3; m++) {
      entry = ref5[m];
      data.push({
        day: entry.day,
        value: entry.count
      });
    }
    points = this.createLineChartPoints(days, data);
    this.enrollmentsChartLines.push({
      points: points,
      description: 'Trial enrollments redeemed',
      lineColor: this.lineColors[colorIndex++ % this.lineColors.length],
      strokeWidth: 1,
      min: 0,
      max: _.max(points, 'y').y,
      showYScale: false
    });
    dailyMax = _.max([dailyMax, _.max(points, 'y').y]);
    ref6 = this.enrollmentsChartLines;
    results = [];
    for (n = 0, len4 = ref6.length; n < len4; n++) {
      line = ref6[n];
      results.push(line.max = dailyMax);
    }
    return results;
  };

  AnalyticsView.prototype.updateRevenueChartData = function() {
    var addRevenueChartLine, base, count, entry, groupDayMap, i, j, k, len, len1, name, name1, ref, ref1, ref2;
    this.revenueDailyChartLines90Days = [];
    this.revenueMonthlyChartLines90Days = [];
    this.revenueDailyChartLines365Days = [];
    this.revenueMonthlyChartLines365Days = [];
    if (!((ref = this.revenue) != null ? ref.length : void 0)) {
      return;
    }
    groupDayMap = {};
    ref1 = this.revenue;
    for (j = 0, len = ref1.length; j < len; j++) {
      entry = ref1[j];
      ref2 = entry.groups;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        count = ref2[i];
        if (groupDayMap[name = this.revenueGroups[i]] == null) {
          groupDayMap[name] = {};
        }
        if ((base = groupDayMap[this.revenueGroups[i]])[name1 = entry.day] == null) {
          base[name1] = 0;
        }
        groupDayMap[this.revenueGroups[i]][entry.day] += count;
      }
    }
    addRevenueChartLine = (function(_this) {
      return function(days, eventPrefix, lines) {
        var colorIndex, dailyMax, data, day, entries, group, line, points, results;
        colorIndex = 0;
        dailyMax = 0;
        results = [];
        for (group in groupDayMap) {
          entries = groupDayMap[group];
          if (!(group.indexOf(eventPrefix) >= 0)) {
            continue;
          }
          data = [];
          for (day in entries) {
            count = entries[day];
            data.push({
              day: day,
              value: count / 100
            });
          }
          data.reverse();
          points = _this.createLineChartPoints(days, data);
          lines.push({
            points: points,
            description: group.replace(eventPrefix + ' ', 'Daily '),
            lineColor: _this.lineColors[colorIndex++ % _this.lineColors.length],
            strokeWidth: 1,
            min: 0,
            max: _.max(points, 'y').y,
            showYScale: group === eventPrefix + ' Total'
          });
          if (group === eventPrefix + ' Total') {
            dailyMax = _.max(points, 'y').y;
          }
          results.push((function() {
            var l, len2, results1;
            results1 = [];
            for (l = 0, len2 = lines.length; l < len2; l++) {
              line = lines[l];
              results1.push(line.max = dailyMax);
            }
            return results1;
          })());
        }
        return results;
      };
    })(this);
    addRevenueChartLine(d3Utils.createContiguousDays(90), 'DRR', this.revenueDailyChartLines90Days);
    addRevenueChartLine(d3Utils.createContiguousDays(90), 'MRR', this.revenueMonthlyChartLines90Days);
    addRevenueChartLine(d3Utils.createContiguousDays(365), 'DRR', this.revenueDailyChartLines365Days);
    return addRevenueChartLine(d3Utils.createContiguousDays(365), 'MRR', this.revenueMonthlyChartLines365Days);
  };

  return AnalyticsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/AnalyticsView.js.map