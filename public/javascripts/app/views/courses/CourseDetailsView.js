require.register("views/courses/CourseDetailsView", function(exports, require, module) {
var Classroom, Classrooms, Course, CourseDetailsView, CourseInstance, CourseInstances, Courses, LevelSessions, Levels, RootView, User, storage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Course = require('models/Course');

Courses = require('collections/Courses');

LevelSessions = require('collections/LevelSessions');

CourseInstance = require('models/CourseInstance');

CourseInstances = require('collections/CourseInstances');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

Levels = require('collections/Levels');

RootView = require('views/core/RootView');

template = require('templates/courses/course-details');

User = require('models/User');

storage = require('core/storage');

module.exports = CourseDetailsView = (function(superClass) {
  extend(CourseDetailsView, superClass);

  CourseDetailsView.prototype.id = 'course-details-view';

  CourseDetailsView.prototype.template = template;

  CourseDetailsView.prototype.memberSort = 'nameAsc';

  CourseDetailsView.prototype.events = {
    'click .btn-play-level': 'onClickPlayLevel',
    'click .btn-select-instance': 'onClickSelectInstance',
    'submit #school-form': 'onSubmitSchoolForm'
  };

  function CourseDetailsView(options, courseID, courseInstanceID) {
    var sessionsLoaded;
    this.courseID = courseID;
    this.courseInstanceID = courseInstanceID;
    CourseDetailsView.__super__.constructor.call(this, options);
    this.courses = new Courses();
    this.course = new Course();
    this.levelSessions = new LevelSessions();
    this.courseInstance = new CourseInstance({
      _id: this.courseInstanceID
    });
    this.owner = new User();
    this.classroom = new Classroom();
    this.levels = new Levels();
    this.courseInstances = new CourseInstances();
    this.supermodel.trackRequest(this.courses.fetch().then((function(_this) {
      return function() {
        return _this.course = _this.courses.get(_this.courseID);
      };
    })(this)));
    sessionsLoaded = this.supermodel.trackRequest(this.levelSessions.fetchForCourseInstance(this.courseInstanceID, {
      cache: false
    }));
    this.supermodel.trackRequest(this.courseInstance.fetch().then((function(_this) {
      return function() {
        var classroomID, levelsLoaded;
        if (_this.destroyed) {
          return;
        }
        _this.owner = new User({
          _id: _this.courseInstance.get('ownerID')
        });
        _this.supermodel.trackRequest(_this.owner.fetch());
        classroomID = _this.courseInstance.get('classroomID');
        _this.classroom = new Classroom({
          _id: classroomID
        });
        _this.supermodel.trackRequest(_this.classroom.fetch());
        levelsLoaded = _this.supermodel.trackRequest(_this.levels.fetchForClassroomAndCourse(classroomID, _this.courseID, {
          data: {
            project: 'concepts,practice,primerLanguage,type,slug,name,original,description,shareable,i18n'
          }
        }));
        return _this.supermodel.trackRequest($.when(levelsLoaded, sessionsLoaded).then(function() {
          var ref;
          _this.buildSessionStats();
          if (_this.destroyed) {
            return;
          }
          if (((ref = _this.memberStats[me.id]) != null ? ref.totalLevelsCompleted : void 0) >= _this.levels.size() - 1) {
            _this.courseComplete = true;
            _this.courseInstances.comparator = 'courseID';
            _this.supermodel.trackRequest(_this.courseInstances.fetchForClassroom(classroomID).then(function() {
              var nextCourseID;
              _this.nextCourseInstance = _.find(_this.courseInstances.models, function(ci) {
                return ci.get('courseID') > _this.courseID;
              });
              if (_this.nextCourseInstance) {
                nextCourseID = _this.nextCourseInstance.get('courseID');
                return _this.nextCourse = _this.courses.get(nextCourseID);
              }
            }));
          }
          return _this.promptForSchool = _this.courseComplete && !me.isAnonymous() && !me.get('schoolName') && !storage.load('no-school');
        }));
      };
    })(this)));
  }

  CourseDetailsView.prototype.initialize = function(options) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Class Course Loaded', {
        category: 'Students'
      }, ['Mixpanel']);
    }
    return CourseDetailsView.__super__.initialize.call(this, options);
  };

  CourseDetailsView.prototype.buildSessionStats = function() {
    var base, base1, base2, base3, concept, conceptStateMap, fn, i, j, k, len, len1, len2, level, levelID, levelSession, name, playtime, ref, ref1, ref2, ref3, ref4, ref5, results, state, userID;
    if (this.destroyed) {
      return;
    }
    this.levelConceptMap = {};
    ref = this.levels.models;
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      if ((base = this.levelConceptMap)[name = level.get('original')] == null) {
        base[name] = {};
      }
      ref1 = level.get('concepts') || [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        concept = ref1[j];
        this.levelConceptMap[level.get('original')][concept] = true;
      }
      if (level.isType('course-ladder')) {
        this.arenaLevel = level;
      }
    }
    this.memberStats = {};
    this.userConceptStateMap = {};
    this.userLevelStateMap = {};
    ref2 = this.levelSessions.models;
    fn = (function(_this) {
      return function(userID, levelID) {
        var playtime, ref3, ref4, secondSessionForLevel, state;
        secondSessionForLevel = _.find(_this.levelSessions.models, (function(otherSession) {
          return otherSession.get('creator') === userID && otherSession.get('level').original === levelID && otherSession.id !== levelSession.id;
        }));
        if (secondSessionForLevel) {
          if ((ref3 = secondSessionForLevel.get('state')) != null ? ref3.complete : void 0) {
            state = 'complete';
          }
          playtime = playtime + parseInt((ref4 = secondSessionForLevel.get('playtime')) != null ? ref4 : 0, 10);
          return secondSessionForLevel.skipMe = true;
        }
      };
    })(this);
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      levelSession = ref2[k];
      if (levelSession.skipMe) {
        continue;
      }
      userID = levelSession.get('creator');
      levelID = levelSession.get('level').original;
      state = ((ref3 = levelSession.get('state')) != null ? ref3.complete : void 0) ? 'complete' : 'started';
      playtime = parseInt((ref4 = levelSession.get('playtime')) != null ? ref4 : 0, 10);
      fn(userID, levelID);
      if ((base1 = this.memberStats)[userID] == null) {
        base1[userID] = {
          totalLevelsCompleted: 0,
          totalPlayTime: 0
        };
      }
      if (state === 'complete') {
        this.memberStats[userID].totalLevelsCompleted++;
      }
      this.memberStats[userID].totalPlayTime += playtime;
      if ((base2 = this.userConceptStateMap)[userID] == null) {
        base2[userID] = {};
      }
      for (concept in this.levelConceptMap[levelID]) {
        this.userConceptStateMap[userID][concept] = state;
      }
      if ((base3 = this.userLevelStateMap)[userID] == null) {
        base3[userID] = {};
      }
      this.userLevelStateMap[userID][levelID] = state;
    }
    this.conceptsCompleted = {};
    ref5 = this.userConceptStateMap;
    results = [];
    for (userID in ref5) {
      conceptStateMap = ref5[userID];
      results.push((function() {
        var base4, results1;
        results1 = [];
        for (concept in conceptStateMap) {
          state = conceptStateMap[concept];
          if ((base4 = this.conceptsCompleted)[concept] == null) {
            base4[concept] = 0;
          }
          results1.push(this.conceptsCompleted[concept]++);
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  CourseDetailsView.prototype.onClickPlayLevel = function(e) {
    var level, levelID, levelSlug, ref, route, viewArgs, viewClass;
    levelSlug = $(e.target).closest('.btn-play-level').data('level-slug');
    levelID = $(e.target).closest('.btn-play-level').data('level-id');
    level = this.levels.findWhere({
      original: levelID
    });
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Students Class Course Play Level', {
        category: 'Students',
        courseID: this.courseID,
        courseInstanceID: this.courseInstanceID,
        levelSlug: levelSlug
      }, ['Mixpanel']);
    }
    if (level.isType('course-ladder')) {
      viewClass = 'views/ladder/LadderView';
      viewArgs = [
        {
          supermodel: this.supermodel
        }, levelSlug
      ];
      route = '/play/ladder/' + levelSlug;
      route += '/course/' + this.courseInstance.id;
      viewArgs = viewArgs.concat(['course', this.courseInstance.id]);
    } else {
      route = this.getLevelURL(levelSlug);
      if (level.get('primerLanguage')) {
        route += "&codeLanguage=" + level.get('primerLanguage');
      }
      viewClass = 'views/play/level/PlayLevelView';
      viewArgs = [
        {
          courseID: this.courseID,
          courseInstanceID: this.courseInstanceID,
          supermodel: this.supermodel
        }, levelSlug
      ];
    }
    return Backbone.Mediator.publish('router:navigate', {
      route: route,
      viewClass: viewClass,
      viewArgs: viewArgs
    });
  };

  CourseDetailsView.prototype.getLevelURL = function(levelSlug) {
    return "/play/level/" + levelSlug + "?course=" + this.courseID + "&course-instance=" + this.courseInstanceID;
  };

  CourseDetailsView.prototype.getOwnerName = function() {
    if (this.owner.isNew()) {
      return;
    }
    if (this.owner.get('firstName') && this.owner.get('lastName')) {
      return (this.owner.get('firstName')) + " " + (this.owner.get('lastName'));
    }
    return this.owner.get('name') || this.owner.get('email');
  };

  CourseDetailsView.prototype.getLastLevelCompleted = function() {
    var i, lastLevelCompleted, len, levelID, ref, ref1, ref2;
    lastLevelCompleted = null;
    ref = this.levels.pluck('original');
    for (i = 0, len = ref.length; i < len; i++) {
      levelID = ref[i];
      if (((ref1 = this.userLevelStateMap) != null ? (ref2 = ref1[me.id]) != null ? ref2[levelID] : void 0 : void 0) === 'complete') {
        lastLevelCompleted = levelID;
      }
    }
    return lastLevelCompleted;
  };

  return CourseDetailsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/CourseDetailsView.js.map