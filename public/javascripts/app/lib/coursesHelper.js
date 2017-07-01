require.register("lib/coursesHelper", function(exports, require, module) {
var Levels, progressMixin;

Levels = require('collections/Levels');

module.exports = {
  calculateDots: function(classrooms, courses, courseInstances) {
    var classroom, course, courseIndex, i, instance, len, levelCompletes, levels, ref, results, userID;
    ref = classrooms.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      classroom = ref[i];
      results.push((function() {
        var j, len1, ref1, results1;
        ref1 = courses.models;
        results1 = [];
        for (courseIndex = j = 0, len1 = ref1.length; j < len1; courseIndex = ++j) {
          course = ref1[courseIndex];
          instance = courseInstances.findWhere({
            courseID: course.id,
            classroomID: classroom.id
          });
          if (!instance) {
            continue;
          }
          instance.numCompleted = 0;
          instance.started = false;
          levels = classroom.getLevels({
            courseID: course.id
          });
          levels.remove(levels.filter((function(_this) {
            return function(level) {
              return level.get('practice');
            };
          })(this)));
          results1.push((function() {
            var k, len2, ref2, results2;
            ref2 = instance.get('members');
            results2 = [];
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              userID = ref2[k];
              instance.started || (instance.started = _.any(levels.models, function(level) {
                var session;
                session = _.find(classroom.sessions.models, function(session) {
                  return session.get('creator') === userID && session.get('level').original === level.get('original');
                });
                return session != null;
              }));
              levelCompletes = _.map(levels.models, function(level) {
                var sessions;
                sessions = _.filter(classroom.sessions.models, function(session) {
                  return session.get('creator') === userID && session.get('level').original === level.get('original');
                });
                return _.find(sessions, function(s) {
                  return s.completed();
                });
              });
              if (_.every(levelCompletes)) {
                results2.push(instance.numCompleted += 1);
              } else {
                results2.push(void 0);
              }
            }
            return results2;
          })());
        }
        return results1;
      }).call(this));
    }
    return results;
  },
  calculateEarliestIncomplete: function(classroom, courses, courseInstances, students) {
    var course, courseIndex, i, instance, j, k, len, len1, len2, level, levelIndex, levelNumber, levels, ref, ref1, ref2, sessions, user, userID, userIDs, users;
    ref = courses.models;
    for (courseIndex = i = 0, len = ref.length; i < len; courseIndex = ++i) {
      course = ref[courseIndex];
      instance = courseInstances.findWhere({
        courseID: course.id,
        classroomID: classroom.id
      });
      if (!instance) {
        continue;
      }
      levels = classroom.getLevels({
        courseID: course.id
      });
      ref1 = levels.models;
      for (levelIndex = j = 0, len1 = ref1.length; j < len1; levelIndex = ++j) {
        level = ref1[levelIndex];
        userIDs = [];
        ref2 = students.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          user = ref2[k];
          userID = user.id;
          sessions = _.filter(classroom.sessions.models, function(session) {
            return session.get('creator') === userID && session.get('level').original === level.get('original');
          });
          if (!_.find(sessions, function(s) {
            return s.completed();
          })) {
            userIDs.push(userID);
          }
        }
        if (userIDs.length > 0) {
          users = _.map(userIDs, function(id) {
            return students.get(id);
          });
          levelNumber = classroom.getLevelNumber(level.get('original'), levelIndex + 1);
          return {
            courseName: course.get('name'),
            courseNumber: courseIndex + 1,
            levelNumber: levelNumber,
            levelName: level.get('name'),
            users: users
          };
        }
      }
    }
    return null;
  },
  calculateLatestComplete: function(classroom, courses, courseInstances, students) {
    var course, courseIndex, courseModels, i, instance, j, k, len, len1, len2, level, levelIndex, levelModels, levelNumber, levels, ref, ref1, ref2, sessions, user, userID, userIDs, users;
    courseModels = courses.models.slice();
    ref = courseModels.reverse();
    for (courseIndex = i = 0, len = ref.length; i < len; courseIndex = ++i) {
      course = ref[courseIndex];
      courseIndex = courses.models.length - courseIndex - 1;
      instance = courseInstances.findWhere({
        courseID: course.id,
        classroomID: classroom.id
      });
      if (!instance) {
        continue;
      }
      levels = classroom.getLevels({
        courseID: course.id
      });
      levelModels = levels.models.slice();
      ref1 = levelModels.reverse();
      for (levelIndex = j = 0, len1 = ref1.length; j < len1; levelIndex = ++j) {
        level = ref1[levelIndex];
        levelIndex = levelModels.length - levelIndex - 1;
        userIDs = [];
        ref2 = students.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          user = ref2[k];
          userID = user.id;
          sessions = _.filter(classroom.sessions.models, function(session) {
            return session.get('creator') === userID && session.get('level').original === level.get('original');
          });
          if (_.find(sessions, function(s) {
            return s.completed();
          })) {
            userIDs.push(userID);
          }
        }
        if (userIDs.length > 0) {
          users = _.map(userIDs, function(id) {
            return students.get(id);
          });
          levelNumber = classroom.getLevelNumber(level.get('original'), levelIndex + 1);
          return {
            courseName: course.get('name'),
            courseNumber: courseIndex + 1,
            levelNumber: levelNumber,
            levelName: level.get('name'),
            users: users
          };
        }
      }
    }
    return null;
  },
  calculateConceptsCovered: function(classrooms, courses, campaigns, courseInstances, students) {
    var classroom, concept, conceptData, course, courseIndex, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, len8, level, levelID, levels, m, n, o, p, q, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, sessions, userID;
    conceptData = {};
    ref = classrooms.models;
    for (i = 0, len = ref.length; i < len; i++) {
      classroom = ref[i];
      conceptData[classroom.id] = {};
      ref1 = courses.models;
      for (courseIndex = j = 0, len1 = ref1.length; j < len1; courseIndex = ++j) {
        course = ref1[courseIndex];
        levels = classroom.getLevels({
          courseID: course.id
        });
        ref2 = levels.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          level = ref2[k];
          levelID = level.get('original');
          ref3 = level.get('concepts');
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            concept = ref3[l];
            if (!conceptData[classroom.id][concept]) {
              conceptData[classroom.id][concept] = {
                completed: true,
                started: false
              };
            }
          }
          ref4 = level.get('concepts');
          for (m = 0, len4 = ref4.length; m < len4; m++) {
            concept = ref4[m];
            ref5 = classroom.get('members');
            for (n = 0, len5 = ref5.length; n < len5; n++) {
              userID = ref5[n];
              sessions = _.filter(classroom.sessions.models, function(session) {
                return session.get('creator') === userID && session.get('level').original === levelID;
              });
              if (_.size(sessions) === 0) {
                ref6 = level.get('concepts');
                for (o = 0, len6 = ref6.length; o < len6; o++) {
                  concept = ref6[o];
                  conceptData[classroom.id][concept].completed = false;
                }
              }
              if (_.size(sessions) > 0) {
                ref7 = level.get('concepts');
                for (p = 0, len7 = ref7.length; p < len7; p++) {
                  concept = ref7[p];
                  conceptData[classroom.id][concept].started = true;
                }
              }
              if (!_.find(sessions, function(s) {
                return s.completed();
              })) {
                ref8 = level.get('concepts');
                for (q = 0, len8 = ref8.length; q < len8; q++) {
                  concept = ref8[q];
                  conceptData[classroom.id][concept].completed = false;
                }
              }
            }
          }
        }
      }
    }
    return conceptData;
  },
  calculateAllProgress: function(classrooms, courses, courseInstances, students) {
    var base, base1, base2, base3, classroom, course, courseIndex, courseProgress, dates, i, instance, isPractice, j, k, l, len, len1, len2, len3, level, levelID, levels, progressData, ref, ref1, ref2, ref3, s, sessions, user, userID;
    progressData = {};
    ref = classrooms.models;
    for (i = 0, len = ref.length; i < len; i++) {
      classroom = ref[i];
      progressData[classroom.id] = {};
      ref1 = courses.models;
      for (courseIndex = j = 0, len1 = ref1.length; j < len1; courseIndex = ++j) {
        course = ref1[courseIndex];
        instance = courseInstances.findWhere({
          courseID: course.id,
          classroomID: classroom.id
        });
        if (!instance) {
          progressData[classroom.id][course.id] = {
            completed: false,
            started: false
          };
          continue;
        }
        progressData[classroom.id][course.id] = {
          completed: true,
          started: false
        };
        levels = classroom.getLevels({
          courseID: course.id
        });
        ref2 = levels.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          level = ref2[k];
          levelID = level.get('original');
          progressData[classroom.id][course.id][levelID] = {
            completed: students.size() > 0,
            started: false,
            numStarted: 0
          };
          isPractice = level.get('practice');
          ref3 = students.models;
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            user = ref3[l];
            userID = user.id;
            courseProgress = progressData[classroom.id][course.id];
            if (courseProgress[userID] == null) {
              courseProgress[userID] = {
                completed: true,
                started: false,
                levelsCompleted: 0
              };
            }
            courseProgress[levelID][userID] = {
              completed: true,
              started: false
            };
            sessions = _.filter(classroom.sessions.models, function(session) {
              return session.get('creator') === userID && session.get('level').original === levelID;
            });
            courseProgress[levelID][userID].session = _.find(sessions, function(s) {
              return s.completed();
            }) || _.first(sessions);
            if (_.size(sessions) === 0) {
              if (!isPractice) {
                courseProgress.started || (courseProgress.started = false);
              }
              if (!isPractice) {
                courseProgress.completed = false;
              }
              if (!isPractice) {
                (base = courseProgress[userID]).started || (base.started = false);
              }
              if (!isPractice) {
                courseProgress[userID].completed = false;
              }
              (base1 = courseProgress[levelID]).started || (base1.started = false);
              if (!isPractice) {
                courseProgress[levelID].completed = false;
              }
              courseProgress[levelID][userID].started = false;
              courseProgress[levelID][userID].completed = false;
            }
            if (_.size(sessions) > 0) {
              if (!isPractice) {
                courseProgress.started = true;
              }
              if (!isPractice) {
                courseProgress[userID].started = true;
              }
              courseProgress[levelID].started = true;
              courseProgress[levelID][userID].started = true;
              courseProgress[levelID][userID].lastPlayed = new Date(Math.max(_.map(sessions, 'changed')));
              courseProgress[levelID].numStarted += 1;
            }
            if (_.find(sessions, function(s) {
              return s.completed();
            })) {
              if (!isPractice) {
                courseProgress.completed && (courseProgress.completed = true);
              }
              if (!isPractice) {
                (base2 = courseProgress[userID]).completed && (base2.completed = true);
              }
              if (!isPractice) {
                courseProgress[userID].levelsCompleted += 1;
              }
              (base3 = courseProgress[levelID]).completed && (base3.completed = true);
              courseProgress[levelID][userID].completed = true;
              dates = (function() {
                var len4, m, results;
                results = [];
                for (m = 0, len4 = sessions.length; m < len4; m++) {
                  s = sessions[m];
                  results.push(s.get('dateFirstCompleted') || s.get('changed'));
                }
                return results;
              })();
              courseProgress[levelID][userID].dateFirstCompleted = new Date(Math.max.apply(Math, dates));
            } else {
              if (!isPractice) {
                courseProgress.completed = false;
              }
              if (!isPractice) {
                courseProgress[userID].completed = false;
              }
              if (isPractice) {
                if (courseProgress[levelID][userID].started) {
                  courseProgress[levelID].completed = false;
                }
              } else {
                courseProgress[levelID].completed = false;
              }
              courseProgress[levelID][userID].completed = false;
              courseProgress[levelID].dateFirstCompleted = null;
              courseProgress[levelID][userID].dateFirstCompleted = null;
            }
          }
          if (isPractice && courseProgress && !courseProgress[levelID].started) {
            courseProgress[levelID].completed = false;
          }
        }
      }
    }
    _.assign(progressData, progressMixin);
    return progressData;
  },
  courseLabelsArray: function(courses) {
    var acronym, course, courseLabelIndexes, i, labels, len;
    labels = [];
    courseLabelIndexes = {
      CS: 0,
      GD: 0,
      WD: 0
    };
    for (i = 0, len = courses.length; i < len; i++) {
      course = courses[i];
      acronym = (function() {
        switch (false) {
          case !/game-dev/.test(course.get('slug')):
            return 'GD';
          case !/web-dev/.test(course.get('slug')):
            return 'WD';
          default:
            return 'CS';
        }
      })();
      labels.push(acronym + ++courseLabelIndexes[acronym]);
    }
    return labels;
  }
};

progressMixin = {
  get: function(options) {
    var classroom, course, defaultValue, level, levelID, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, user;
    if (options == null) {
      options = {};
    }
    classroom = options.classroom, course = options.course, level = options.level, user = options.user;
    if (!classroom) {
      throw new Error("You must provide a classroom");
    }
    if (!course) {
      throw new Error("You must provide a course");
    }
    defaultValue = {
      completed: false,
      started: false
    };
    if (options.level) {
      levelID = level.get('original');
      if (options.user) {
        return ((ref = this[classroom.id]) != null ? (ref1 = ref[course.id]) != null ? (ref2 = ref1[levelID]) != null ? ref2[user.id] : void 0 : void 0 : void 0) || defaultValue;
      } else {
        return ((ref3 = this[classroom.id]) != null ? (ref4 = ref3[course.id]) != null ? ref4[levelID] : void 0 : void 0) || defaultValue;
      }
    } else {
      if (options.user) {
        return ((ref5 = this[classroom.id]) != null ? (ref6 = ref5[course.id]) != null ? ref6[user.id] : void 0 : void 0) || defaultValue;
      } else {
        return ((ref7 = this[classroom.id]) != null ? ref7[course.id] : void 0) || defaultValue;
      }
    }
  }
};
});

;
//# sourceMappingURL=/javascripts/app/lib/coursesHelper.js.map