require.register("core/Router", function(exports, require, module) {
var CocoRouter, ViewLoadTimer, go, redirect, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

go = function(path, options) {
  return function() {
    return this.routeDirectly(path, arguments, options);
  };
};

redirect = function(path) {
  return function() {
    return this.navigate(path + document.location.search, {
      trigger: true,
      replace: true
    });
  };
};

utils = require('./utils');

ViewLoadTimer = require('core/ViewLoadTimer');

module.exports = CocoRouter = (function(superClass) {
  extend(CocoRouter, superClass);

  function CocoRouter() {
    this.renderSocialButtons = bind(this.renderSocialButtons, this);
    return CocoRouter.__super__.constructor.apply(this, arguments);
  }

  CocoRouter.prototype.initialize = function() {
    this.bind('route', this._trackPageView);
    Backbone.Mediator.subscribe('router:navigate', this.onNavigate, this);
    return this.initializeSocialMediaServices = _.once(this.initializeSocialMediaServices);
  };

  CocoRouter.prototype.routes = {
    '': function() {
      if (window.serverConfig.picoCTF) {
        return this.routeDirectly('play/CampaignView', ['picoctf'], {});
      }
      if (utils.getQueryVariable('hour_of_code')) {
        return this.navigate("/play?hour_of_code=true", {
          trigger: true,
          replace: true
        });
      }
      return this.routeDirectly('HomeView', []);
    },
    'about': go('AboutView'),
    'account': go('account/MainAccountView'),
    'account/settings': go('account/AccountSettingsRootView'),
    'account/unsubscribe': go('account/UnsubscribeView'),
    'account/payments': go('account/PaymentsView'),
    'account/subscription': go('account/SubscriptionView'),
    'account/invoices': go('account/InvoicesView'),
    'account/prepaid': go('account/PrepaidView'),
    'admin': go('admin/MainAdminView'),
    'admin/clas': go('admin/CLAsView'),
    'admin/classroom-content': go('admin/AdminClassroomContentView'),
    'admin/classroom-levels': go('admin/AdminClassroomLevelsView'),
    'admin/classrooms-progress': go('admin/AdminClassroomsProgressView'),
    'admin/design-elements': go('admin/DesignElementsView'),
    'admin/files': go('admin/FilesView'),
    'admin/analytics': go('admin/AnalyticsView'),
    'admin/analytics/subscriptions': go('admin/AnalyticsSubscriptionsView'),
    'admin/level-sessions': go('admin/LevelSessionsView'),
    'admin/school-counts': go('admin/SchoolCountsView'),
    'admin/school-licenses': go('admin/SchoolLicensesView'),
    'admin/base': go('admin/BaseView'),
    'admin/demo-requests': go('admin/DemoRequestsView'),
    'admin/trial-requests': go('admin/TrialRequestsView'),
    'admin/user-code-problems': go('admin/UserCodeProblemsView'),
    'admin/pending-patches': go('admin/PendingPatchesView'),
    'admin/codelogs': go('admin/CodeLogsView'),
    'admin/skipped-contacts': go('admin/SkippedContactsView'),
    'artisans': go('artisans/ArtisansView'),
    'artisans/level-tasks': go('artisans/LevelTasksView'),
    'artisans/solution-problems': go('artisans/SolutionProblemsView'),
    'artisans/thang-tasks': go('artisans/ThangTasksView'),
    'artisans/level-concepts': go('artisans/LevelConceptMap'),
    'artisans/level-guides': go('artisans/LevelGuidesView'),
    'artisans/student-solutions': go('artisans/StudentSolutionsView'),
    'artisans/tag-test': go('artisans/TagTestView'),
    'careers': function() {
      return window.location.href = 'https://jobs.lever.co/codecombat';
    },
    'Careers': function() {
      return window.location.href = 'https://jobs.lever.co/codecombat';
    },
    'cla': go('CLAView'),
    'clans': go('clans/ClansView'),
    'clans/:clanID': go('clans/ClanDetailsView'),
    'community': go('CommunityView'),
    'contribute': go('contribute/MainContributeView'),
    'contribute/adventurer': go('contribute/AdventurerView'),
    'contribute/ambassador': go('contribute/AmbassadorView'),
    'contribute/archmage': go('contribute/ArchmageView'),
    'contribute/artisan': go('contribute/ArtisanView'),
    'contribute/diplomat': go('contribute/DiplomatView'),
    'contribute/scribe': go('contribute/ScribeView'),
    'courses': redirect('/students'),
    'Courses': redirect('/students'),
    'courses/students': redirect('/students'),
    'courses/teachers': redirect('/teachers/classes'),
    'courses/purchase': redirect('/teachers/licenses'),
    'courses/enroll(/:courseID)': redirect('/teachers/licenses'),
    'courses/update-account': redirect('students/update-account'),
    'courses/:classroomID': function() {
      return this.navigate("/students/" + arguments[0], {
        trigger: true,
        replace: true
      });
    },
    'courses/:courseID/:courseInstanceID': function() {
      return this.navigate("/students/" + arguments[0] + "/" + arguments[1], {
        trigger: true,
        replace: true
      });
    },
    'db/*path': 'routeToServer',
    'demo(/*subpath)': go('DemoView'),
    'docs/components': go('docs/ComponentsDocumentationView'),
    'docs/systems': go('docs/SystemsDocumentationView'),
    'editor': go('CommunityView'),
    'editor/achievement': go('editor/achievement/AchievementSearchView'),
    'editor/achievement/:articleID': go('editor/achievement/AchievementEditView'),
    'editor/article': go('editor/article/ArticleSearchView'),
    'editor/article/preview': go('editor/article/ArticlePreviewView'),
    'editor/article/:articleID': go('editor/article/ArticleEditView'),
    'editor/level': go('editor/level/LevelSearchView'),
    'editor/level/:levelID': go('editor/level/LevelEditView'),
    'editor/thang': go('editor/thang/ThangTypeSearchView'),
    'editor/thang/:thangID': go('editor/thang/ThangTypeEditView'),
    'editor/campaign/:campaignID': go('editor/campaign/CampaignEditorView'),
    'editor/poll': go('editor/poll/PollSearchView'),
    'editor/poll/:articleID': go('editor/poll/PollEditView'),
    'editor/thang-tasks': go('editor/ThangTasksView'),
    'editor/verifier': go('editor/verifier/VerifierView'),
    'editor/verifier/:levelID': go('editor/verifier/VerifierView'),
    'editor/course': go('editor/course/CourseSearchView'),
    'editor/course/:courseID': go('editor/course/CourseEditView'),
    'file/*path': 'routeToServer',
    'github/*path': 'routeToServer',
    'hoc': function() {
      return this.navigate("/play?hour_of_code=true", {
        trigger: true,
        replace: true
      });
    },
    'home': go('HomeView'),
    'i18n': go('i18n/I18NHomeView'),
    'i18n/thang/:handle': go('i18n/I18NEditThangTypeView'),
    'i18n/component/:handle': go('i18n/I18NEditComponentView'),
    'i18n/level/:handle': go('i18n/I18NEditLevelView'),
    'i18n/achievement/:handle': go('i18n/I18NEditAchievementView'),
    'i18n/campaign/:handle': go('i18n/I18NEditCampaignView'),
    'i18n/poll/:handle': go('i18n/I18NEditPollView'),
    'i18n/course/:handle': go('i18n/I18NEditCourseView'),
    'identify': go('user/IdentifyView'),
    'il-signup': go('account/IsraelSignupView'),
    'legal': go('LegalView'),
    'play(/)': go('play/CampaignView', {
      redirectStudents: true,
      redirectTeachers: true
    }),
    'play/ladder/:levelID/:leagueType/:leagueID': go('ladder/LadderView'),
    'play/ladder/:levelID': go('ladder/LadderView'),
    'play/ladder': go('ladder/MainLadderView'),
    'play/level/:levelID': go('play/level/PlayLevelView'),
    'play/game-dev-level/:levelID/:sessionID': go('play/level/PlayGameDevLevelView'),
    'play/web-dev-level/:levelID/:sessionID': go('play/level/PlayWebDevLevelView'),
    'play/spectate/:levelID': go('play/SpectateView'),
    'play/:map': go('play/CampaignView', {
      redirectStudents: true,
      redirectTeachers: true
    }),
    'preview': go('HomeView'),
    'privacy': go('PrivacyView'),
    'schools': go('HomeView'),
    'seen': go('HomeView'),
    'SEEN': go('HomeView'),
    'students': go('courses/CoursesView', {
      redirectTeachers: true
    }),
    'students/update-account': go('courses/CoursesUpdateAccountView', {
      redirectTeachers: true
    }),
    'students/:classroomID': go('courses/ClassroomView', {
      redirectTeachers: true,
      studentsOnly: true
    }),
    'students/:courseID/:courseInstanceID': go('courses/CourseDetailsView', {
      redirectTeachers: true,
      studentsOnly: true
    }),
    'teachers': redirect('/teachers/classes'),
    'teachers/classes': go('courses/TeacherClassesView', {
      redirectStudents: true,
      teachersOnly: true
    }),
    'teachers/classes/:classroomID/:studentID': go('teachers/TeacherStudentView', {
      redirectStudents: true,
      teachersOnly: true
    }),
    'teachers/classes/:classroomID': go('courses/TeacherClassView', {
      redirectStudents: true,
      teachersOnly: true
    }),
    'teachers/courses': go('courses/TeacherCoursesView', {
      redirectStudents: true
    }),
    'teachers/course-solution/:courseID/:language': go('teachers/TeacherCourseSolutionView', {
      redirectStudents: true
    }),
    'teachers/demo': go('teachers/RequestQuoteView', {
      redirectStudents: true
    }),
    'teachers/enrollments': redirect('/teachers/licenses'),
    'teachers/licenses': go('courses/EnrollmentsView', {
      redirectStudents: true,
      teachersOnly: true
    }),
    'teachers/freetrial': go('teachers/RequestQuoteView', {
      redirectStudents: true
    }),
    'teachers/quote': redirect('/teachers/demo'),
    'teachers/resources': go('teachers/ResourceHubView', {
      redirectStudents: true
    }),
    'teachers/resources/:name': go('teachers/MarkdownResourceView', {
      redirectStudents: true
    }),
    'teachers/signup': function() {
      if (me.isAnonymous()) {
        return this.routeDirectly('teachers/CreateTeacherAccountView', []);
      }
      if (me.isStudent() && !me.isAdmin()) {
        return this.navigate('/students', {
          trigger: true,
          replace: true
        });
      }
      return this.navigate('/teachers/update-account', {
        trigger: true,
        replace: true
      });
    },
    'teachers/starter-licenses': go('teachers/StarterLicenseUpsellView', {
      redirectStudents: true,
      teachersOnly: true
    }),
    'teachers/update-account': function() {
      if (me.isAnonymous()) {
        return this.navigate('/teachers/signup', {
          trigger: true,
          replace: true
        });
      }
      if (me.isStudent() && !me.isAdmin()) {
        return this.navigate('/students', {
          trigger: true,
          replace: true
        });
      }
      return this.routeDirectly('teachers/ConvertToTeacherAccountView', []);
    },
    'test(/*subpath)': go('TestView'),
    'user/:slugOrID': go('user/MainUserView'),
    'user/:userID/verify/:verificationCode': go('user/EmailVerifiedView'),
    '*name/': 'removeTrailingSlash',
    '*name': go('NotFoundView')
  };

  CocoRouter.prototype.routeToServer = function(e) {
    return window.location.href = window.location.href;
  };

  CocoRouter.prototype.removeTrailingSlash = function(e) {
    return this.navigate(e, {
      trigger: true
    });
  };

  CocoRouter.prototype.routeDirectly = function(path, args, options) {
    var ViewClass, leavingMessage, view;
    if (args == null) {
      args = [];
    }
    if (options == null) {
      options = {};
    }
    if (!options.recursive) {
      this.viewLoad = new ViewLoadTimer();
    }
    if (options.redirectStudents && me.isStudent() && !me.isAdmin()) {
      return this.redirectHome();
    }
    if (options.redirectTeachers && me.isTeacher() && !me.isAdmin()) {
      return this.redirectHome();
    }
    if (options.teachersOnly && !(me.isTeacher() || me.isAdmin())) {
      return this.routeDirectly('teachers/RestrictedToTeachersView');
    }
    if (options.studentsOnly && !(me.isStudent() || me.isAdmin())) {
      return this.routeDirectly('courses/RestrictedToStudentsView');
    }
    leavingMessage = _.result(window.currentView, 'onLeaveMessage');
    if (leavingMessage) {
      if (!confirm(leavingMessage)) {
        return this.navigate(this.path, {
          replace: true
        });
      } else {
        window.currentView.onLeaveMessage = _.noop;
      }
    }
    if (features.playViewsOnly && !(_.string.startsWith(document.location.pathname, '/play') || document.location.pathname === '/admin')) {
      return this.navigate('/play', {
        trigger: true,
        replace: true
      });
    }
    if (features.playOnly && !/^(views)?\/?play/.test(path)) {
      path = 'play/CampaignView';
    }
    if (!_.string.startsWith(path, 'views/')) {
      path = "views/" + path;
    }
    ViewClass = this.tryToLoadModule(path);
    if (!ViewClass && application.moduleLoader.load(path)) {
      this.listenToOnce(application.moduleLoader, 'load-complete', function() {
        options.recursive = true;
        return this.routeDirectly(path, args, options);
      });
      return;
    }
    if (!ViewClass) {
      return go('NotFoundView');
    }
    view = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(ViewClass, [options].concat(slice.call(args)), function(){});
    view.render();
    this.openView(view);
    this.viewLoad.setView(view);
    return this.viewLoad.record();
  };

  CocoRouter.prototype.redirectHome = function() {
    var homeUrl;
    homeUrl = (function() {
      switch (false) {
        case !me.isStudent():
          return '/students';
        case !me.isTeacher():
          return '/teachers';
        default:
          return '/';
      }
    })();
    return this.navigate(homeUrl, {
      trigger: true,
      replace: true
    });
  };

  CocoRouter.prototype.tryToLoadModule = function(path) {
    var error, error1;
    try {
      return window.require(path);
    } catch (error1) {
      error = error1;
      if (error.toString().search('Cannot find module "' + path + '" from') === -1) {
        throw error;
      }
    }
  };

  CocoRouter.prototype.openView = function(view) {
    this.closeCurrentView();
    $('#page-container').empty().append(view.el);
    window.currentView = view;
    this.activateTab();
    view.afterInsert();
    view.didReappear();
    return this.path = document.location.pathname + document.location.search;
  };

  CocoRouter.prototype.closeCurrentView = function() {
    var ref, ref1;
    if ((ref = window.currentView) != null ? ref.reloadOnClose : void 0) {
      return document.location.reload();
    }
    if ((ref1 = window.currentModal) != null) {
      if (typeof ref1.hide === "function") {
        ref1.hide();
      }
    }
    if (window.currentView == null) {
      return;
    }
    window.currentView.destroy();
    $('.popover').popover('hide');
    $('#flying-focus').css({
      top: 0,
      left: 0
    });
    return _.delay((function() {
      $('html')[0].scrollTop = 0;
      return $('body')[0].scrollTop = 0;
    }), 10);
  };

  CocoRouter.prototype.initializeSocialMediaServices = function() {
    if (application.testing || application.demoing) {
      return;
    }
    application.facebookHandler.loadAPI();
    application.gplusHandler.loadAPI();
    return require('core/services/twitter')();
  };

  CocoRouter.prototype.renderSocialButtons = function() {
    var ref;
    this.initializeSocialMediaServices();
    $('.share-buttons, .partner-badges').addClass('fade-in').delay(10000).removeClass('fade-in', 5000);
    application.facebookHandler.renderButtons();
    application.gplusHandler.renderButtons();
    return typeof twttr !== "undefined" && twttr !== null ? (ref = twttr.widgets) != null ? typeof ref.load === "function" ? ref.load() : void 0 : void 0 : void 0;
  };

  CocoRouter.prototype.activateTab = function() {
    var base;
    base = _.string.words(document.location.pathname.slice(1), '/')[0];
    return $("ul.nav li." + base).addClass('active');
  };

  CocoRouter.prototype._trackPageView = function() {
    var ref;
    return (ref = window.tracker) != null ? ref.trackPageView() : void 0;
  };

  CocoRouter.prototype.onNavigate = function(e, recursive) {
    var ViewClass, args, manualView, view;
    if (recursive == null) {
      recursive = false;
    }
    if (!recursive) {
      this.viewLoad = new ViewLoadTimer();
    }
    if (_.isString(e.viewClass)) {
      ViewClass = this.tryToLoadModule(e.viewClass);
      if (!ViewClass && application.moduleLoader.load(e.viewClass)) {
        this.listenToOnce(application.moduleLoader, 'load-complete', function() {
          return this.onNavigate(e, true);
        });
        return;
      }
      e.viewClass = ViewClass;
    }
    manualView = e.view || e.viewClass;
    if ((e.route === document.location.pathname) && !manualView) {
      return document.location.reload();
    }
    this.navigate(e.route, {
      trigger: !manualView
    });
    this._trackPageView();
    if (!manualView) {
      return;
    }
    if (e.viewClass) {
      args = e.viewArgs || [];
      view = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(e.viewClass, args, function(){});
      view.render();
      this.openView(view);
      this.viewLoad.setView(view);
    } else {
      this.openView(e.view);
      this.viewLoad.setView(e.view);
    }
    return this.viewLoad.record();
  };

  CocoRouter.prototype.navigate = function(fragment, options) {
    CocoRouter.__super__.navigate.call(this, fragment, options);
    return Backbone.Mediator.publish('router:navigated', {
      route: fragment
    });
  };

  CocoRouter.prototype.reload = function() {
    return document.location.reload();
  };

  return CocoRouter;

})(Backbone.Router);
});

;
//# sourceMappingURL=/javascripts/app/core/Router.js.map