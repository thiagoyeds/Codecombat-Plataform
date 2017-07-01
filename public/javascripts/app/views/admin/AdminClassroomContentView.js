require.register("views/admin/AdminClassroomContentView", function(exports, require, module) {
var AdminClassroomContentView, RootView, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

utils = require('core/utils');

RootView = require('views/core/RootView');

module.exports = AdminClassroomContentView = (function(superClass) {
  extend(AdminClassroomContentView, superClass);

  function AdminClassroomContentView() {
    return AdminClassroomContentView.__super__.constructor.apply(this, arguments);
  }

  AdminClassroomContentView.prototype.id = 'admin-classroom-content-view';

  AdminClassroomContentView.prototype.template = require('templates/admin/admin-classroom-content');

  AdminClassroomContentView.prototype.initialize = function() {
    if (!me.isAdmin()) {
      return AdminClassroomContentView.__super__.initialize.call(this);
    }
    this.fetchData();
    return AdminClassroomContentView.__super__.initialize.call(this);
  };

  AdminClassroomContentView.prototype.fetchData = function() {
    var courseID, courseLevelPlaytimesMap, courseLevelTotalPlaytimeMap, getMoreLevelSessions, key, levelPracticeMap;
    this.minSessionCount = 50;
    this.maxDays = 20;
    this.loadingMessage = "Loading..";
    courseLevelPlaytimesMap = {};
    courseLevelTotalPlaytimeMap = {};
    levelPracticeMap = {};
    getMoreLevelSessions = (function(_this) {
      return function(courseIDs, startOffset, endOffset) {
        var courseID, endDate, endDay, i, len, promises, startDate, startDay, url;
        if (_this.destroyed) {
          return;
        }
        _this.loadingMessage = "Fetching data for " + courseIDs.length + " courses for " + (endOffset != null ? endOffset : 0) + "/" + _this.maxDays + " days ago..";
        if (typeof _this.render === "function") {
          _this.render();
        }
        startDate = new Date();
        startDate.setUTCDate(startDate.getUTCDate() - startOffset);
        startDay = startDate.toISOString().substring(0, 10);
        if (endOffset) {
          endDate = new Date();
          endDate.setUTCDate(endDate.getUTCDate() - endOffset);
          endDay = endDate.toISOString().substring(0, 10);
        }
        promises = [];
        for (i = 0, len = courseIDs.length; i < len; i++) {
          courseID = courseIDs[i];
          url = "/db/classroom/-/playtimes?sessionLimit=" + (_this.minSessionCount * 100) + "&courseID=" + courseID + "&startDay=" + (encodeURIComponent(startDay));
          if (endDay) {
            url += "&endDay=" + (encodeURIComponent(endDay));
          }
          promises.push(Promise.resolve($.get(url)));
        }
        return Promise.all(promises).then(function(results) {
          var avgPlaytime, base, courseIDMap, courseSecondsMap, courseSlug, data, index, j, k, l, len1, len2, len3, len4, len5, levelOriginal, levelPlaytime, levelPlaytimes, levelSessions, m, n, name, name1, needMoreData, ref, ref1, ref2, ref3, ref4, session, totalPlaytimes;
          if (_this.destroyed) {
            return;
          }
          for (index = j = 0, len1 = results.length; j < len1; index = ++j) {
            data = results[index];
            levelPlaytimes = data[0], levelSessions = data[1];
            if (!levelPlaytimes[0]) {
              continue;
            }
            courseID = levelPlaytimes[0].courseID;
            if (courseLevelPlaytimesMap[courseID] == null) {
              courseLevelPlaytimesMap[courseID] = levelPlaytimes;
            }
            if (courseLevelTotalPlaytimeMap[courseID] == null) {
              courseLevelTotalPlaytimeMap[courseID] = {};
            }
            for (k = 0, len2 = levelPlaytimes.length; k < len2; k++) {
              levelPlaytime = levelPlaytimes[k];
              if ((base = courseLevelTotalPlaytimeMap[courseID])[name = levelPlaytime.levelOriginal] == null) {
                base[name] = {
                  count: 0,
                  total: 0
                };
              }
              if (levelPlaytime.practice) {
                levelPracticeMap[levelPlaytime.levelOriginal] = true;
              }
            }
            for (l = 0, len3 = levelSessions.length; l < len3; l++) {
              session = levelSessions[l];
              courseLevelTotalPlaytimeMap[courseID][session.level.original].count++;
              courseLevelTotalPlaytimeMap[courseID][session.level.original].total += session.playtime;
            }
          }
          for (courseID in courseLevelTotalPlaytimeMap) {
            totalPlaytimes = courseLevelTotalPlaytimeMap[courseID];
            if (!(indexOf.call(courseIDs, courseID) >= 0)) {
              continue;
            }
            needMoreData = false;
            for (levelOriginal in totalPlaytimes) {
              data = totalPlaytimes[levelOriginal];
              if (data.count < _this.minSessionCount) {
                needMoreData = true;
                break;
              }
            }
            if (needMoreData) {
              continue;
            }
            _.remove(courseIDs, function(val) {
              return val === courseID;
            });
          }
          if (startOffset <= _this.maxDays && courseIDs.length > 0) {
            return getMoreLevelSessions(courseIDs, startOffset + 1, endOffset + 1 || 1);
          } else {
            for (courseID in courseLevelPlaytimesMap) {
              levelPlaytimes = courseLevelPlaytimesMap[courseID];
              for (m = 0, len4 = levelPlaytimes.length; m < len4; m++) {
                data = levelPlaytimes[m];
                data.count = (ref = (ref1 = courseLevelTotalPlaytimeMap[courseID][data.levelOriginal]) != null ? ref1.count : void 0) != null ? ref : 0;
                data.playtime = (ref2 = (ref3 = courseLevelTotalPlaytimeMap[courseID][data.levelOriginal]) != null ? ref3.total : void 0) != null ? ref2 : 0;
              }
            }
            _this.courseLevelPlaytimes = _.flatten((function() {
              var results1;
              results1 = [];
              for (courseID in courseLevelPlaytimesMap) {
                levelPlaytimes = courseLevelPlaytimesMap[courseID];
                results1.push(levelPlaytimes);
              }
              return results1;
            })());
            _this.courseLevelPlaytimes.sort(function(a, b) {
              var aRank, bRank, ref4, ref5, ref6, ref7;
              aRank = ((ref4 = utils.orderedCourseIDs.indexOf(a.courseID)) != null ? ref4 : 9000) * 1000 + ((ref5 = a.levelIndex) != null ? ref5 : 500);
              bRank = ((ref6 = utils.orderedCourseIDs.indexOf(b.courseID)) != null ? ref6 : 9000) * 1000 + ((ref7 = b.levelIndex) != null ? ref7 : 500);
              return aRank - bRank;
            });
            _this.totalSeconds = 0;
            courseSecondsMap = {};
            courseIDMap = {};
            ref4 = _this.courseLevelPlaytimes;
            for (n = 0, len5 = ref4.length; n < len5; n++) {
              data = ref4[n];
              if (courseSecondsMap[name1 = data.courseSlug] == null) {
                courseSecondsMap[name1] = 0;
              }
              avgPlaytime = data.count > 0 ? data.playtime / data.count : 300;
              if (levelPracticeMap[data.levelOriginal]) {
                avgPlaytime /= 3;
              }
              courseIDMap[data.courseSlug] = data.courseID;
              courseSecondsMap[data.courseSlug] += avgPlaytime;
              _this.totalSeconds += avgPlaytime;
            }
            _this.courseSeconds = (function() {
              var results1;
              results1 = [];
              for (courseSlug in courseSecondsMap) {
                data = courseSecondsMap[courseSlug];
                results1.push({
                  courseSlug: courseSlug,
                  seconds: data
                });
              }
              return results1;
            })();
            _this.courseSeconds.sort(function(a, b) {
              return utils.orderedCourseIDs.indexOf(courseIDMap[a.courseSlug]) - utils.orderedCourseIDs.indexOf(courseIDMap[b.courseSlug]);
            });
            return typeof _this.render === "function" ? _this.render() : void 0;
          }
        });
      };
    })(this);
    return getMoreLevelSessions((function() {
      var ref, results1;
      ref = utils.courseIDs;
      results1 = [];
      for (key in ref) {
        courseID = ref[key];
        results1.push(courseID);
      }
      return results1;
    })(), 1);
  };

  return AdminClassroomContentView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/AdminClassroomContentView.js.map