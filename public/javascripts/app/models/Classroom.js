require.register("models/Classroom", function(exports, require, module) {
var Classroom, CocoModel, User, schema, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/classroom.schema');

utils = require('../core/utils');

User = require('models/User');

module.exports = Classroom = (function(superClass) {
  extend(Classroom, superClass);

  function Classroom() {
    return Classroom.__super__.constructor.apply(this, arguments);
  }

  Classroom.className = 'Classroom';

  Classroom.schema = schema;

  Classroom.prototype.urlRoot = '/db/classroom';

  Classroom.prototype.initialize = function() {
    this.listenTo(this, 'change:aceConfig', this.capitalizeLanguageName);
    return Classroom.__super__.initialize.apply(this, arguments);
  };

  Classroom.prototype.parse = function(obj) {
    if (obj._id) {
      return obj;
    } else {
      this.owner = new User(obj.owner);
      return obj.data;
    }
  };

  Classroom.prototype.capitalizeLanguageName = function() {
    var language, ref;
    language = (ref = this.get('aceConfig')) != null ? ref.language : void 0;
    return this.capitalLanguage = utils.capitalLanguages[language];
  };

  Classroom.prototype.joinWithCode = function(code, opts) {
    var options;
    options = {
      url: this.urlRoot + '/~/members',
      type: 'POST',
      data: {
        code: code
      },
      success: (function(_this) {
        return function() {
          return _this.trigger('join:success');
        };
      })(this),
      error: (function(_this) {
        return function() {
          return _this.trigger('join:error');
        };
      })(this)
    };
    _.extend(options, opts);
    return this.fetch(options);
  };

  Classroom.prototype.fetchByCode = function(code, opts) {
    var options;
    options = {
      url: _.result(this, 'url'),
      data: {
        code: code,
        "with-owner": true
      }
    };
    _.extend(options, opts);
    return this.fetch(options);
  };

  Classroom.prototype.getLevelNumber = function(levelID, defaultNumber) {
    var course, i, j, language, len, len1, level, levels, ref, ref1, ref2, ref3, ref4, ref5;
    if (!this.levelNumberMap) {
      this.levelNumberMap = {};
      language = (ref = this.get('aceConfig')) != null ? ref.language : void 0;
      ref2 = (ref1 = this.get('courses')) != null ? ref1 : [];
      for (i = 0, len = ref2.length; i < len; i++) {
        course = ref2[i];
        levels = [];
        ref3 = course.levels;
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          level = ref3[j];
          if (!level.original) {
            continue;
          }
          if ((language != null) && level.primerLanguage === language) {
            continue;
          }
          levels.push({
            key: level.original,
            practice: (ref4 = level.practice) != null ? ref4 : false
          });
        }
        _.assign(this.levelNumberMap, utils.createLevelNumberMap(levels));
      }
    }
    return (ref5 = this.levelNumberMap[levelID]) != null ? ref5 : defaultNumber;
  };

  Classroom.prototype.removeMember = function(userID, opts) {
    var options;
    options = {
      url: _.result(this, 'url') + '/members',
      type: 'DELETE',
      data: {
        userID: userID
      }
    };
    _.extend(options, opts);
    return this.fetch(options);
  };

  Classroom.prototype.setStudentPassword = function(student, password, options) {
    var classroomID;
    classroomID = this.id;
    return $.ajax({
      url: "/db/classroom/" + classroomID + "/members/" + student.id + "/reset-password",
      method: 'POST',
      data: {
        password: password
      },
      success: (function(_this) {
        return function() {
          return _this.trigger('save-password:success');
        };
      })(this),
      error: (function(_this) {
        return function(response) {
          return _this.trigger('save-password:error', response.responseJSON);
        };
      })(this)
    });
  };

  Classroom.prototype.getLevels = function(options) {
    var Levels, course, courses, i, language, len, levelObjects, levels, ref;
    if (options == null) {
      options = {};
    }
    Levels = require('collections/Levels');
    courses = this.get('courses');
    if (!courses) {
      return new Levels();
    }
    levelObjects = [];
    for (i = 0, len = courses.length; i < len; i++) {
      course = courses[i];
      if (options.courseID && options.courseID !== course._id) {
        continue;
      }
      levelObjects.push(course.levels);
    }
    levels = new Levels(_.flatten(levelObjects));
    language = (ref = this.get('aceConfig')) != null ? ref.language : void 0;
    if (language) {
      levels.remove(levels.filter((function(_this) {
        return function(level) {
          return level.get('primerLanguage') === language;
        };
      })(this)));
    }
    if (options.withoutLadderLevels) {
      levels.remove(levels.filter(function(level) {
        return level.isLadder();
      }));
    }
    if (options.projectLevels) {
      levels.remove(levels.filter(function(level) {
        return level.get('shareable') !== 'project';
      }));
    }
    return levels;
  };

  Classroom.prototype.getLadderLevel = function(courseID) {
    var Levels, course, courses, levels;
    Levels = require('collections/Levels');
    courses = this.get('courses');
    course = _.findWhere(courses, {
      _id: courseID
    });
    if (!course) {
      return;
    }
    levels = new Levels(course.levels);
    return levels.find(function(l) {
      return l.isLadder();
    });
  };

  Classroom.prototype.getProjectLevel = function(courseID) {
    var Levels, course, courses, levels;
    Levels = require('collections/Levels');
    courses = this.get('courses');
    course = _.findWhere(courses, {
      _id: courseID
    });
    if (!course) {
      return;
    }
    levels = new Levels(course.levels);
    return levels.find(function(l) {
      return l.isProject();
    });
  };

  Classroom.prototype.statsForSessions = function(sessions, courseID) {
    var arena, complete, courseLevels, currentIndex, currentLevel, currentPlaytime, i, index, j, lastPlayed, lastPlayedNumber, lastStarted, len, len1, level, levelSessionMap, levels, levelsLeft, levelsTotal, needsPractice, nextIndex, nextLevel, playtime, project, ref, ref1, ref2, ref3, ref4, ref5, session, stats;
    if (!sessions) {
      return null;
    }
    sessions = sessions.models || sessions;
    arena = this.getLadderLevel(courseID);
    project = this.getProjectLevel(courseID);
    courseLevels = this.getLevels({
      courseID: courseID,
      withoutLadderLevels: true
    });
    levelSessionMap = {};
    for (i = 0, len = sessions.length; i < len; i++) {
      session = sessions[i];
      levelSessionMap[session.get('level').original] = session;
    }
    currentIndex = -1;
    lastStarted = null;
    levelsTotal = 0;
    levelsLeft = 0;
    lastPlayed = null;
    playtime = 0;
    levels = [];
    ref = courseLevels.models;
    for (index = j = 0, len1 = ref.length; j < len1; index = ++j) {
      level = ref[index];
      if (!level.get('practice')) {
        levelsTotal++;
      }
      complete = false;
      if (session = levelSessionMap[level.get('original')]) {
        complete = (ref1 = session.get('state').complete) != null ? ref1 : false;
        playtime += (ref2 = session.get('playtime')) != null ? ref2 : 0;
        lastPlayed = level;
        lastPlayedNumber = index + 1;
        if (complete) {
          currentIndex = index;
        } else {
          lastStarted = level;
          if (!level.get('practice')) {
            levelsLeft++;
          }
        }
      } else if (!level.get('practice')) {
        levelsLeft++;
      }
      levels.push({
        practice: (ref3 = level.get('practice')) != null ? ref3 : false,
        complete: complete
      });
    }
    lastPlayed = lastStarted != null ? lastStarted : lastPlayed;
    needsPractice = false;
    nextIndex = 0;
    if (currentIndex >= 0) {
      currentLevel = courseLevels.models[currentIndex];
      currentPlaytime = (ref4 = (ref5 = levelSessionMap[currentLevel.get('original')]) != null ? ref5.get('playtime') : void 0) != null ? ref4 : 0;
      needsPractice = utils.needsPractice(currentPlaytime, currentLevel.get('practiceThresholdMinutes'));
      nextIndex = utils.findNextLevel(levels, currentIndex, needsPractice);
    }
    nextLevel = courseLevels.models[nextIndex];
    if (nextLevel == null) {
      nextLevel = _.find(courseLevels.models, function(level) {
        var ref6, ref7;
        return !((ref6 = levelSessionMap[level.get('original')]) != null ? (ref7 = ref6.get('state')) != null ? ref7.complete : void 0 : void 0);
      });
    }
    if (lastPlayedNumber == null) {
      lastPlayedNumber = 1;
    }
    if (courseLevels.length >= 1 && lastPlayedNumber < courseLevels.length) {
      lastPlayedNumber = this.getLevelNumber(courseLevels.models[lastPlayedNumber - 1].get('original'), lastPlayedNumber);
    }
    stats = {
      levels: {
        size: levelsTotal,
        left: levelsLeft,
        done: levelsLeft === 0,
        numDone: levelsTotal - levelsLeft,
        pctDone: (100 * (levelsTotal - levelsLeft) / levelsTotal).toFixed(1) + '%',
        lastPlayed: lastPlayed,
        lastPlayedNumber: lastPlayedNumber,
        next: nextLevel,
        first: courseLevels.first(),
        arena: arena,
        project: project
      },
      playtime: playtime
    };
    return stats;
  };

  Classroom.prototype.fetchForCourseInstance = function(courseInstanceID, options) {
    var CourseInstance, courseInstance;
    if (options == null) {
      options = {};
    }
    if (!courseInstanceID) {
      return;
    }
    CourseInstance = require('models/CourseInstance');
    courseInstance = _.isString(courseInstanceID) ? new CourseInstance({
      _id: courseInstanceID
    }) : courseInstanceID;
    options = _.extend(options, {
      url: _.result(courseInstance, 'url') + '/classroom'
    });
    return this.fetch(options);
  };

  Classroom.prototype.inviteMembers = function(emails, options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.emails = emails;
    options.url = this.url() + '/invite-members';
    options.type = 'POST';
    return this.fetch(options);
  };

  Classroom.prototype.getSortedCourses = function() {
    var ref;
    return utils.sortCourses((ref = this.get('courses')) != null ? ref : []);
  };

  Classroom.prototype.updateCourses = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = this.url() + '/update-courses';
    options.type = 'POST';
    return this.fetch(options);
  };

  return Classroom;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Classroom.js.map