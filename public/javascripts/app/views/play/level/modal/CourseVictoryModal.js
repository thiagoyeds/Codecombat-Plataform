require.register("templates/play/level/modal/course-victory-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"modal-dialog\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-body\"></div></div></div></div>");;return buf.join("");
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

;require.register("views/play/level/modal/CourseVictoryModal", function(exports, require, module) {
var Classroom, Course, CourseVictoryModal, Level, LevelSessions, ModalView, ProgressView, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/level/modal/course-victory-modal');

Level = require('models/Level');

Course = require('models/Course');

LevelSessions = require('collections/LevelSessions');

ProgressView = require('./ProgressView');

Classroom = require('models/Classroom');

utils = require('core/utils');

module.exports = CourseVictoryModal = (function(superClass) {
  extend(CourseVictoryModal, superClass);

  function CourseVictoryModal() {
    return CourseVictoryModal.__super__.constructor.apply(this, arguments);
  }

  CourseVictoryModal.prototype.id = 'course-victory-modal';

  CourseVictoryModal.prototype.template = template;

  CourseVictoryModal.prototype.closesOnClickOutside = false;

  CourseVictoryModal.prototype.initialize = function(options) {
    var ref;
    this.courseID = options.courseID;
    this.courseInstanceID = options.courseInstanceID || this.getQueryVariable('course-instance') || this.getQueryVariable('league');
    this.views = [];
    this.session = options.session;
    this.level = options.level;
    if (this.courseInstanceID) {
      this.classroom = new Classroom();
      this.supermodel.trackRequest(this.classroom.fetchForCourseInstance(this.courseInstanceID));
    }
    this.playSound('victory');
    this.nextLevel = new Level();
    this.nextLevelRequest = this.supermodel.trackRequest(this.nextLevel.fetchNextForCourse({
      levelOriginalID: this.level.get('original'),
      courseInstanceID: this.courseInstanceID,
      courseID: this.courseID,
      sessionID: this.session.id
    }));
    this.course = options.course;
    if (this.courseID && !this.course) {
      this.course = new Course().setURL("/db/course/" + this.courseID);
      this.course = this.supermodel.loadModel(this.course).model;
    }
    if (this.courseInstanceID) {
      this.levelSessions = new LevelSessions();
      this.levelSessions.fetchForCourseInstance(this.courseInstanceID);
      this.levelSessions = this.supermodel.loadCollection(this.levelSessions, 'sessions', {
        data: {
          project: 'state.complete level.original playtime changed'
        }
      }).model;
      if (!this.course) {
        this.course = new Course();
        this.supermodel.trackRequest(this.course.fetchForCourseInstance(this.courseInstanceID));
      }
    }
    return (ref = window.tracker) != null ? ref.trackEvent('Play Level Victory Modal Loaded', {
      category: 'Students',
      levelSlug: this.level.get('slug')
    }, []) : void 0;
  };

  CourseVictoryModal.prototype.onResourceLoadFailed = function(e) {
    if (e.resource.jqxhr === this.nextLevelRequest) {
      return;
    }
    return CourseVictoryModal.__super__.onResourceLoadFailed.apply(this, arguments);
  };

  CourseVictoryModal.prototype.onLoaded = function() {
    var i, len, progressView, ref, ref1, ref2, view;
    CourseVictoryModal.__super__.onLoaded.call(this);
    if (this.courseID == null) {
      this.courseID = this.course.id;
    }
    this.views = [];
    if ((ref = this.levelSessions) != null) {
      ref.remove(this.session);
    }
    if ((ref1 = this.levelSessions) != null) {
      ref1.add(this.session);
    }
    progressView = new ProgressView({
      level: this.level,
      nextLevel: this.nextLevel,
      course: this.course,
      classroom: this.classroom,
      levelSessions: this.levelSessions,
      session: this.session
    });
    progressView.once('done', this.onDone, this);
    progressView.once('next-level', this.onNextLevel, this);
    progressView.once('ladder', this.onLadder, this);
    ref2 = this.views;
    for (i = 0, len = ref2.length; i < len; i++) {
      view = ref2[i];
      view.on('continue', this.onViewContinue, this);
    }
    this.views.push(progressView);
    return this.showView(_.first(this.views));
  };

  CourseVictoryModal.prototype.afterRender = function() {
    CourseVictoryModal.__super__.afterRender.call(this);
    return this.showView(this.currentView);
  };

  CourseVictoryModal.prototype.showView = function(view) {
    if (!view) {
      return;
    }
    view.setElement(this.$('.modal-content'));
    view.$el.attr('id', view.id);
    view.$el.addClass(view.className);
    view.render();
    return this.currentView = view;
  };

  CourseVictoryModal.prototype.onViewContinue = function() {
    var index;
    index = _.indexOf(this.views, this.currentView);
    return this.showView(this.views[index + 1]);
  };

  CourseVictoryModal.prototype.onNextLevel = function() {
    var link, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Play Level Victory Modal Next Level', {
        category: 'Students',
        levelSlug: this.level.get('slug'),
        nextLevelSlug: this.nextLevel.get('slug')
      }, []);
    }
    if (me.isSessionless()) {
      link = "/play/level/" + (this.nextLevel.get('slug')) + "?course=" + this.courseID + "&codeLanguage=" + (utils.getQueryVariable('codeLanguage', 'python'));
    } else {
      link = "/play/level/" + (this.nextLevel.get('slug')) + "?course=" + this.courseID + "&course-instance=" + this.courseInstanceID;
      if (this.level.get('primerLanguage')) {
        link += "&codeLanguage=" + this.level.get('primerLanguage');
      }
    }
    return application.router.navigate(link, {
      trigger: true
    });
  };

  CourseVictoryModal.prototype.onDone = function() {
    var link, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Play Level Victory Modal Done', {
        category: 'Students',
        levelSlug: this.level.get('slug')
      }, []);
    }
    if (me.isSessionless()) {
      link = '/teachers/courses';
    } else {
      link = '/students';
    }
    return application.router.navigate(link, {
      trigger: true
    });
  };

  CourseVictoryModal.prototype.onLadder = function() {
    var ladderURL, leagueID, leagueType, viewArgs;
    viewArgs = [
      {
        supermodel: this.options.hasReceivedMemoryWarning ? null : this.supermodel
      }, this.level.get('slug')
    ];
    ladderURL = "/play/ladder/" + (this.level.get('slug') || this.level.id);
    if (leagueID = this.courseInstanceID || this.getQueryVariable('league')) {
      leagueType = this.level.get('type') === 'course-ladder' ? 'course' : 'clan';
      viewArgs.push(leagueType);
      viewArgs.push(leagueID);
      ladderURL += "/" + leagueType + "/" + leagueID;
    }
    ladderURL += '#my-matches';
    return Backbone.Mediator.publish('router:navigate', {
      route: ladderURL,
      viewClass: 'views/ladder/LadderView',
      viewArgs: viewArgs
    });
  };

  return CourseVictoryModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/CourseVictoryModal.js.map