require.register("views/admin/AdminClassroomsProgressView", function(exports, require, module) {
var AdminClassroomsProgressView, RootView, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

utils = require('core/utils');

RootView = require('views/core/RootView');

module.exports = AdminClassroomsProgressView = (function(superClass) {
  extend(AdminClassroomsProgressView, superClass);

  function AdminClassroomsProgressView() {
    return AdminClassroomsProgressView.__super__.constructor.apply(this, arguments);
  }

  AdminClassroomsProgressView.prototype.id = 'admin-classrooms-progress-view';

  AdminClassroomsProgressView.prototype.template = require('templates/admin/admin-classrooms-progress');

  AdminClassroomsProgressView.prototype.courseAcronymMap = utils.courseAcronyms;

  AdminClassroomsProgressView.prototype.initialize = function() {
    if (!me.isAdmin()) {
      return AdminClassroomsProgressView.__super__.initialize.call(this);
    }
    this.licenseEndMonths = utils.getQueryVariable('licenseEndMonths', 6);
    this.buildProgressData(this.licenseEndMonths);
    return AdminClassroomsProgressView.__super__.initialize.call(this);
  };

  AdminClassroomsProgressView.prototype.buildProgressData = function() {
    return Promise.all([Promise.resolve($.get('/db/course')), Promise.resolve($.get('/db/campaign')), Promise.resolve($.get("/db/prepaid/-/active-school-licenses?licenseEndMonths=" + this.licenseEndMonths))]).then((function(_this) {
      return function(results) {
        var campaigns, classroom, classroomId, classroomLatestActivity, classroomLicenseCourseLevelMap, classroomLicenseFurthestLevelMap, classroomLicenses, courseData, courseId, courseLastLevelIndexMap, courseLastLevelIndexes, courseLevelMap, courses, furthestLevelIndex, j, latestOrderedLevelOriginals, len, levelMap, levelOriginal, levelSessions, levels, license, licenseId, licenses, licensesCourseLevelMap, missingCourses, percentComplete, prepaids, ref, ref1, ref2, ref3, ref4, teacher, teachers, userLatestActivityMap, userLevelOriginalCompleteMap, userLicensesMap, val;
        courses = results[0], campaigns = results[1], (ref = results[2], _this.classrooms = ref.classrooms, levelSessions = ref.levelSessions, prepaids = ref.prepaids, teachers = ref.teachers);
        courses = courses.filter(function(c) {
          return c.releasePhase === 'released';
        });
        utils.sortCourses(courses);
        licenses = prepaids.filter(function(p) {
          var ref1;
          return ((ref1 = p.redeemers) != null ? ref1.length : void 0) > 0;
        });
        _this.teacherMap = {};
        for (j = 0, len = teachers.length; j < len; j++) {
          teacher = teachers[j];
          _this.teacherMap[teacher._id] = teacher;
        }
        ref1 = _this.getLatestLevels(campaigns, courses), _this.latestCourseMap = ref1[0], _this.latestLevelSlugMap = ref1[1], latestOrderedLevelOriginals = ref1[2];
        ref2 = _this.getUserActivity(levelSessions, licenses, latestOrderedLevelOriginals), userLatestActivityMap = ref2[0], userLevelOriginalCompleteMap = ref2[1], userLicensesMap = ref2[2];
        ref3 = _this.getClassroomActivity(_this.classrooms, _this.latestCourseMap, userLatestActivityMap, userLicensesMap, userLevelOriginalCompleteMap), classroomLatestActivity = ref3[0], classroomLicenseCourseLevelMap = ref3[1], classroomLicenseFurthestLevelMap = ref3[2];
        _this.classroomProgress = [];
        for (classroomId in classroomLicenseCourseLevelMap) {
          licensesCourseLevelMap = classroomLicenseCourseLevelMap[classroomId];
          classroom = _.find(_this.classrooms, function(c) {
            return c._id === classroomId;
          });
          classroomLicenses = [];
          for (licenseId in licensesCourseLevelMap) {
            courseLevelMap = licensesCourseLevelMap[licenseId];
            courseLastLevelIndexes = [];
            courseLastLevelIndexMap = {};
            levels = [];
            for (courseId in courseLevelMap) {
              levelMap = courseLevelMap[courseId];
              for (levelOriginal in levelMap) {
                val = levelMap[levelOriginal];
                levels.push({
                  levelOriginal: levelOriginal,
                  numUsers: val
                });
              }
              courseLastLevelIndexes.push({
                courseId: courseId,
                index: levels.length - 1
              });
              courseLastLevelIndexMap[courseId] = levels.length - 1;
            }
            furthestLevelIndex = levels.indexOf(_.findLast(levels, function(l) {
              return l.numUsers > 0;
            }));
            percentComplete = (furthestLevelIndex + 1) / levels.length * 100;
            courseLastLevelIndexes.sort(function(a, b) {
              return utils.orderedCourseIDs.indexOf(a.courseId) - utils.orderedCourseIDs.indexOf(b.courseId);
            });
            missingCourses = [];
            ref4 = _this.latestCourseMap;
            for (courseId in ref4) {
              courseData = ref4[courseId];
              if (courseLevelMap[courseId]) {
                if (furthestLevelIndex <= courseLastLevelIndexMap[courseId]) {
                  _this.addAvailableCourseMissingLevels(classroomId, classroomLicenseFurthestLevelMap, courseId, courseLastLevelIndexes, courseLevelMap, courseData.levels, latestOrderedLevelOriginals, levels, licenseId);
                }
              } else {
                missingCourses.push({
                  courseId: courseId,
                  levels: courseData.levels
                });
              }
            }
            license = _.find(licenses, function(l) {
              return l._id === licenseId;
            });
            classroomLicenses.push({
              courseLastLevelIndexes: courseLastLevelIndexes,
              license: license,
              levels: levels,
              furthestLevelIndex: furthestLevelIndex,
              missingCourses: missingCourses,
              percentComplete: percentComplete
            });
          }
          _this.classroomProgress.push({
            classroom: classroom,
            licenses: classroomLicenses,
            latestActivity: classroomLatestActivity[classroom._id]
          });
        }
        _this.sortClassroomProgress(_this.classroomProgress);
        console.log('classroomProgress', _this.classroomProgress);
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
  };

  AdminClassroomsProgressView.prototype.addAvailableCourseMissingLevels = function(classroomId, classroomLicenseFurthestLevelMap, courseId, courseLastLevelIndexes, courseLevelMap, latestCourseLevelOriginals, latestOrderedLevelOriginals, levels, licenseId) {
    var courseLastLevelIndexData, currentCourseLevelOriginals, currentFurthestCourseLevelIndex, currentPreviousCourseLevelIndex, furthestCurrentAndLatestCourseLevelIndex, i, j, latestCourseMissingLevelOriginals, latestLevelEarliestInsertionLevelIndex, latestLevelsToAdd, len, levelOriginal, previousLatestOriginal, ref, results1, val;
    currentCourseLevelOriginals = (function() {
      var ref, results1;
      ref = courseLevelMap[courseId];
      results1 = [];
      for (levelOriginal in ref) {
        val = ref[levelOriginal];
        results1.push(levelOriginal);
      }
      return results1;
    })();
    latestCourseMissingLevelOriginals = _.reject(latestCourseLevelOriginals, function(l) {
      return indexOf.call(currentCourseLevelOriginals, l) >= 0;
    });
    currentFurthestCourseLevelIndex = currentCourseLevelOriginals.indexOf((ref = classroomLicenseFurthestLevelMap[classroomId]) != null ? ref[licenseId] : void 0);
    furthestCurrentAndLatestCourseLevelIndex = currentFurthestCourseLevelIndex;
    while (furthestCurrentAndLatestCourseLevelIndex >= 0 && latestOrderedLevelOriginals.indexOf(currentCourseLevelOriginals[furthestCurrentAndLatestCourseLevelIndex]) < 0) {
      furthestCurrentAndLatestCourseLevelIndex--;
    }
    latestLevelEarliestInsertionLevelIndex = 0;
    if (furthestCurrentAndLatestCourseLevelIndex >= 0) {
      latestLevelEarliestInsertionLevelIndex = latestOrderedLevelOriginals.indexOf(currentCourseLevelOriginals[furthestCurrentAndLatestCourseLevelIndex]) + 1;
    }
    latestLevelsToAdd = _.filter(latestCourseMissingLevelOriginals, function(l) {
      return latestOrderedLevelOriginals.indexOf(l) >= latestLevelEarliestInsertionLevelIndex && !_.find(levels, {
        levelOriginal: l
      });
    });
    latestLevelsToAdd.sort((function(_this) {
      return function(a, b) {
        return latestOrderedLevelOriginals.indexOf(a) - latestOrderedLevelOriginals.indexOf(b);
      };
    })(this));
    currentPreviousCourseLevelIndex = currentFurthestCourseLevelIndex;
    results1 = [];
    for (i = j = 0, len = latestLevelsToAdd.length; j < len; i = ++j) {
      levelOriginal = latestLevelsToAdd[i];
      previousLatestOriginal = latestOrderedLevelOriginals[latestOrderedLevelOriginals.indexOf(levelOriginal) - 1];
      if (currentPreviousCourseLevelIndex < 0) {
        currentPreviousCourseLevelIndex = currentCourseLevelOriginals.indexOf(previousLatestOriginal);
        if (currentPreviousCourseLevelIndex < 0) {
          currentPreviousCourseLevelIndex = 0;
          levels.splice(_.findIndex(levels, {
            levelOriginal: currentCourseLevelOriginals[currentPreviousCourseLevelIndex]
          }), 0, {
            levelOriginal: levelOriginal,
            numusers: 0,
            missing: true
          });
          currentCourseLevelOriginals.splice(currentPreviousCourseLevelIndex, 0, levelOriginal);
        } else {
          levels.splice(_.findIndex(levels, {
            levelOriginal: currentCourseLevelOriginals[currentPreviousCourseLevelIndex]
          }) + 1, 0, {
            levelOriginal: levelOriginal,
            numusers: 0,
            missing: true
          });
          currentCourseLevelOriginals.splice(currentPreviousCourseLevelIndex + 1, 0, levelOriginal);
          currentPreviousCourseLevelIndex++;
        }
      } else if (currentCourseLevelOriginals[currentPreviousCourseLevelIndex] === previousLatestOriginal || currentCourseLevelOriginals.indexOf(previousLatestOriginal) < 0 || currentCourseLevelOriginals.indexOf(previousLatestOriginal) < currentPreviousCourseLevelIndex) {
        levels.splice(_.findIndex(levels, {
          levelOriginal: currentCourseLevelOriginals[currentPreviousCourseLevelIndex]
        }) + 1, 0, {
          levelOriginal: levelOriginal,
          numusers: 0,
          missing: true
        });
        currentCourseLevelOriginals.splice(currentPreviousCourseLevelIndex + 1, 0, levelOriginal);
        currentPreviousCourseLevelIndex++;
      } else {
        if (currentCourseLevelOriginals.indexOf(previousLatestOriginal) <= currentPreviousCourseLevelIndex) {
          console.log("ERROR! current index " + (currentCourseLevelOriginals.indexOf(previousLatestOriginal)) + " of prev latest " + previousLatestOriginal + " is <= currentPreviousCourseLevelIndex " + currentPreviousCourseLevelIndex);
        }
        currentPreviousCourseLevelIndex = currentCourseLevelOriginals.indexOf(previousLatestOriginal);
        levels.splice(_.findIndex(levels, {
          levelOriginal: currentCourseLevelOriginals[currentPreviousCourseLevelIndex]
        }) + 1, 0, {
          levelOriginal: levelOriginal,
          numusers: 0,
          missing: true
        });
        currentCourseLevelOriginals.splice(currentPreviousCourseLevelIndex + 1, 0, levelOriginal);
        currentPreviousCourseLevelIndex++;
      }
      results1.push((function() {
        var k, len1, results2;
        results2 = [];
        for (k = 0, len1 = courseLastLevelIndexes.length; k < len1; k++) {
          courseLastLevelIndexData = courseLastLevelIndexes[k];
          if (utils.orderedCourseIDs.indexOf(courseLastLevelIndexData.courseId) >= utils.orderedCourseIDs.indexOf(courseId)) {
            results2.push(courseLastLevelIndexData.index++);
          } else {
            results2.push(void 0);
          }
        }
        return results2;
      })());
    }
    return results1;
  };

  AdminClassroomsProgressView.prototype.getClassroomActivity = function(classrooms, latestCourseMap, userLatestActivityMap, userLicensesMap, userLevelOriginalCompleteMap) {
    var base, base1, base2, base3, classroom, classroomLatestActivity, classroomLicenseCourseLevelMap, classroomLicenseFurthestLevelMap, complete, course, courseOriginalLevels, j, k, len, len1, len2, len3, len4, len5, len6, level, levelOriginal, levelOriginalCompleteMap, license, licensedMembers, m, n, name, name1, name2, name3, name4, name5, o, q, r, ref, ref1, ref2, ref3, ref4, userFurthestLevelOriginalMap, userId;
    classroomLicenseFurthestLevelMap = {};
    classroomLatestActivity = {};
    classroomLicenseCourseLevelMap = {};
    for (j = 0, len = classrooms.length; j < len; j++) {
      classroom = classrooms[j];
      ref = userLicensesMap[classroom.ownerID];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        license = ref[k];
        licensedMembers = _.intersection(classroom.members, _.map(license.redeemers, 'userID'));
        if (_.isEmpty(licensedMembers)) {
          continue;
        }
        if (classroomLicenseCourseLevelMap[name = classroom._id] == null) {
          classroomLicenseCourseLevelMap[name] = {};
        }
        if ((base = classroomLicenseCourseLevelMap[classroom._id])[name1 = license._id] == null) {
          base[name1] = {};
        }
        courseOriginalLevels = [];
        ref1 = utils.sortCourses(classroom.courses);
        for (m = 0, len2 = ref1.length; m < len2; m++) {
          course = ref1[m];
          if (latestCourseMap[course._id]) {
            ref2 = course.levels;
            for (n = 0, len3 = ref2.length; n < len3; n++) {
              level = ref2[n];
              courseOriginalLevels.push(level.original);
            }
          }
        }
        userFurthestLevelOriginalMap = {};
        for (userId in userLevelOriginalCompleteMap) {
          levelOriginalCompleteMap = userLevelOriginalCompleteMap[userId];
          if (!(licensedMembers.indexOf(userId) >= 0)) {
            continue;
          }
          if (userFurthestLevelOriginalMap[userId] == null) {
            userFurthestLevelOriginalMap[userId] = {};
          }
          for (levelOriginal in levelOriginalCompleteMap) {
            complete = levelOriginalCompleteMap[levelOriginal];
            if (_.isEmpty(userFurthestLevelOriginalMap[userId]) || courseOriginalLevels.indexOf(levelOriginal) > courseOriginalLevels.indexOf(userFurthestLevelOriginalMap[userId])) {
              userFurthestLevelOriginalMap[userId] = levelOriginal;
            }
          }
        }
        ref3 = utils.sortCourses(classroom.courses);
        for (o = 0, len4 = ref3.length; o < len4; o++) {
          course = ref3[o];
          if (!latestCourseMap[course._id]) {
            continue;
          }
          if ((base1 = classroomLicenseCourseLevelMap[classroom._id][license._id])[name2 = course._id] == null) {
            base1[name2] = {};
          }
          ref4 = course.levels;
          for (q = 0, len5 = ref4.length; q < len5; q++) {
            level = ref4[q];
            if ((base2 = classroomLicenseCourseLevelMap[classroom._id][license._id][course._id])[name3 = level.original] == null) {
              base2[name3] = 0;
            }
            for (r = 0, len6 = licensedMembers.length; r < len6; r++) {
              userId = licensedMembers[r];
              if (!classroomLatestActivity[classroom._id] || classroomLatestActivity[classroom._id] < userLatestActivityMap[userId]) {
                classroomLatestActivity[classroom._id] = userLatestActivityMap[userId];
              }
              if (userFurthestLevelOriginalMap[userId] === level.original) {
                classroomLicenseCourseLevelMap[classroom._id][license._id][course._id][level.original]++;
                if (classroomLicenseFurthestLevelMap[name4 = classroom._id] == null) {
                  classroomLicenseFurthestLevelMap[name4] = {};
                }
                if ((base3 = classroomLicenseFurthestLevelMap[classroom._id])[name5 = license._id] == null) {
                  base3[name5] = {};
                }
                classroomLicenseFurthestLevelMap[classroom._id][license._id] = level.original;
              }
            }
          }
        }
      }
    }
    return [classroomLatestActivity, classroomLicenseCourseLevelMap, classroomLicenseFurthestLevelMap];
  };

  AdminClassroomsProgressView.prototype.getLatestLevels = function(campaigns, courses) {
    var campaign, course, courseLevelsMap, j, latestOrderedLevelOriginals, len, level, levelOriginal, originalSlugMap, ref;
    courseLevelsMap = {};
    originalSlugMap = {};
    latestOrderedLevelOriginals = [];
    for (j = 0, len = courses.length; j < len; j++) {
      course = courses[j];
      campaign = _.find(campaigns, {
        _id: course.campaignID
      });
      courseLevelsMap[course._id] = {
        slug: course.slug,
        levels: []
      };
      ref = campaign.levels;
      for (levelOriginal in ref) {
        level = ref[levelOriginal];
        originalSlugMap[levelOriginal] = level.slug;
        latestOrderedLevelOriginals.push(levelOriginal);
        courseLevelsMap[course._id].levels.push(levelOriginal);
      }
    }
    return [courseLevelsMap, originalSlugMap, latestOrderedLevelOriginals];
  };

  AdminClassroomsProgressView.prototype.getUserActivity = function(levelSessions, licenses, latestOrderedLevelOriginals) {
    var j, k, len, len1, levelSession, license, name, name1, ref, ref1, ref2, userLatestActivityMap, userLevelOriginalCompleteMap, userLicensesMap;
    userLatestActivityMap = {};
    userLevelOriginalCompleteMap = {};
    for (j = 0, len = levelSessions.length; j < len; j++) {
      levelSession = levelSessions[j];
      if (!(latestOrderedLevelOriginals.indexOf(levelSession != null ? (ref = levelSession.level) != null ? ref.original : void 0 : void 0) >= 0)) {
        continue;
      }
      if (userLevelOriginalCompleteMap[name = levelSession.creator] == null) {
        userLevelOriginalCompleteMap[name] = {};
      }
      userLevelOriginalCompleteMap[levelSession.creator][levelSession.level.original] = (ref1 = levelSession != null ? (ref2 = levelSession.state) != null ? ref2.complete : void 0 : void 0) != null ? ref1 : false;
      if (!userLatestActivityMap[levelSession.creator] || userLatestActivityMap[levelSession.creator] < levelSession.changed) {
        userLatestActivityMap[levelSession.creator] = levelSession.changed;
      }
    }
    userLicensesMap = {};
    for (k = 0, len1 = licenses.length; k < len1; k++) {
      license = licenses[k];
      if (userLicensesMap[name1 = license.creator] == null) {
        userLicensesMap[name1] = [];
      }
      userLicensesMap[license.creator].push(license);
    }
    return [userLatestActivityMap, userLevelOriginalCompleteMap, userLicensesMap];
  };

  AdminClassroomsProgressView.prototype.sortClassroomProgress = function(classroomProgress) {
    var j, len, numUsers, percentComplete, progress, teacherContentBufferMap, teacherId;
    teacherContentBufferMap = {};
    for (j = 0, len = classroomProgress.length; j < len; j++) {
      progress = classroomProgress[j];
      teacherId = progress.classroom.ownerID;
      if (teacherContentBufferMap[teacherId] == null) {
        teacherContentBufferMap[teacherId] = {};
      }
      percentComplete = _.max(_.map(progress.licenses, 'percentComplete'));
      if ((teacherContentBufferMap[teacherId].percentComplete == null) || percentComplete > teacherContentBufferMap[teacherId].percentComplete) {
        teacherContentBufferMap[teacherId].percentComplete = percentComplete;
      }
      if ((teacherContentBufferMap[teacherId].latestActivity == null) || progress.latestActivity > teacherContentBufferMap[teacherId].latestActivity) {
        teacherContentBufferMap[teacherId].latestActivity = progress.latestActivity;
      }
      numUsers = _.max(_.map(progress.licenses, function(l) {
        var ref, ref1, ref2;
        return (ref = (ref1 = l.license) != null ? (ref2 = ref1.redeemers) != null ? ref2.length : void 0 : void 0) != null ? ref : 0;
      }));
      if ((teacherContentBufferMap[teacherId].numUsers == null) || numUsers > teacherContentBufferMap[teacherId].numUsers) {
        teacherContentBufferMap[teacherId].numUsers = numUsers;
      }
    }
    return classroomProgress.sort(function(a, b) {
      var idA, idB, latestActivityA, latestActivityB, numUsersA, numUsersB, percentCompleteA, percentCompleteB;
      idA = a.classroom.ownerID;
      idB = b.classroom.ownerID;
      if (idA === idB) {
        percentCompleteA = _.max(_.map(a.licenses, 'percentComplete'));
        percentCompleteB = _.max(_.map(b.licenses, 'percentComplete'));
        if (percentCompleteA > percentCompleteB) {
          return -1;
        } else if (percentCompleteA < percentCompleteB) {
          return 1;
        } else {
          latestActivityA = a.latestActivity;
          latestActivityB = b.latestActivity;
          if (latestActivityA > latestActivityB) {
            return -1;
          } else if (latestActivityA < latestActivityB) {
            return 1;
          } else {
            numUsersA = _.max(_.map(a.licenses, function(l) {
              var ref, ref1, ref2;
              return (ref = (ref1 = l.license) != null ? (ref2 = ref1.redeemers) != null ? ref2.length : void 0 : void 0) != null ? ref : 0;
            }));
            numUsersB = _.max(_.map(b.licenses, function(l) {
              var ref, ref1, ref2;
              return (ref = (ref1 = l.license) != null ? (ref2 = ref1.redeemers) != null ? ref2.length : void 0 : void 0) != null ? ref : 0;
            }));
            if (numUsersA > numUsersB) {
              return -1;
            } else if (numUsersA < numUsersB) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      } else {
        percentCompleteA = teacherContentBufferMap[idA].percentComplete;
        percentCompleteB = teacherContentBufferMap[idB].percentComplete;
        if (percentCompleteA > percentCompleteB) {
          return -1;
        } else if (percentCompleteA < percentCompleteB) {
          return 1;
        } else {
          latestActivityA = teacherContentBufferMap[idA].latestActivity;
          latestActivityB = teacherContentBufferMap[idB].latestActivity;
          if (latestActivityA > latestActivityB) {
            return -1;
          } else if (latestActivityA < latestActivityB) {
            return 1;
          } else {
            numUsersA = teacherContentBufferMap[idA].numUsers;
            numUsersB = teacherContentBufferMap[idB].numUsers;
            if (numUsersA > numUsersB) {
              return -1;
            } else if (numUsersA < numUsersB) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      }
    });
  };

  return AdminClassroomsProgressView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/AdminClassroomsProgressView.js.map