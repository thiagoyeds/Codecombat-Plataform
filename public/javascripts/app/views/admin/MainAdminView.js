require.register("views/admin/MainAdminView", function(exports, require, module) {
var AdministerUserModal, Campaigns, Classroom, CocoCollection, Course, Courses, LevelSessions, MainAdminView, RootView, User, Users, backboneFailure, errors, forms, genericFailure, ref, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = require('core/errors'), backboneFailure = ref.backboneFailure, genericFailure = ref.genericFailure;

errors = require('core/errors');

RootView = require('views/core/RootView');

template = require('templates/admin');

AdministerUserModal = require('views/admin/AdministerUserModal');

forms = require('core/forms');

Campaigns = require('collections/Campaigns');

Classroom = require('models/Classroom');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

Courses = require('collections/Courses');

LevelSessions = require('collections/LevelSessions');

User = require('models/User');

Users = require('collections/Users');

module.exports = MainAdminView = (function(superClass) {
  extend(MainAdminView, superClass);

  function MainAdminView() {
    this.onClickTerminalSubLink = bind(this.onClickTerminalSubLink, this);
    this.onClickFreeSubLink = bind(this.onClickFreeSubLink, this);
    this.onSearchRequestFailure = bind(this.onSearchRequestFailure, this);
    this.onSearchRequestSuccess = bind(this.onSearchRequestSuccess, this);
    return MainAdminView.__super__.constructor.apply(this, arguments);
  }

  MainAdminView.prototype.id = 'admin-view';

  MainAdminView.prototype.template = template;

  MainAdminView.prototype.lastUserSearchValue = '';

  MainAdminView.prototype.events = {
    'submit #espionage-form': 'onSubmitEspionageForm',
    'submit #user-search-form': 'onSubmitUserSearchForm',
    'click #stop-spying-btn': 'onClickStopSpyingButton',
    'click #increment-button': 'incrementUserAttribute',
    'click .user-spy-button': 'onClickUserSpyButton',
    'click #user-search-result': 'onClickUserSearchResult',
    'click #create-free-sub-btn': 'onClickFreeSubLink',
    'click #terminal-create': 'onClickTerminalSubLink',
    'click .classroom-progress-csv': 'onClickExportProgress',
    'click #clear-feature-mode-btn': 'onClickClearFeatureModeButton'
  };

  MainAdminView.prototype.getTitle = function() {
    return $.i18n.t('account_settings.admin');
  };

  MainAdminView.prototype.initialize = function() {
    if (window.serverSession.amActually) {
      this.amActually = new User({
        _id: window.serverSession.amActually
      });
      this.amActually.fetch();
      this.supermodel.trackModel(this.amActually);
    }
    this.featureMode = window.serverSession.featureMode;
    return MainAdminView.__super__.initialize.call(this);
  };

  MainAdminView.prototype.onClickStopSpyingButton = function() {
    var button;
    button = this.$('#stop-spying-btn');
    forms.disableSubmit(button);
    return me.stopSpying({
      success: function() {
        return document.location.reload();
      },
      error: function() {
        forms.enableSubmit(button);
        return errors.showNotyNetworkError.apply(errors, arguments);
      }
    });
  };

  MainAdminView.prototype.onClickClearFeatureModeButton = function(e) {
    e.preventDefault();
    return application.featureMode.clear();
  };

  MainAdminView.prototype.onSubmitEspionageForm = function(e) {
    var button, userNameOrEmail;
    e.preventDefault();
    button = this.$('#enter-espionage-mode');
    userNameOrEmail = this.$el.find('#espionage-name-or-email').val().toLowerCase();
    forms.disableSubmit(button);
    return me.spy(userNameOrEmail, {
      success: function() {
        return window.location.reload();
      },
      error: function() {
        forms.enableSubmit(button);
        return errors.showNotyNetworkError.apply(errors, arguments);
      }
    });
  };

  MainAdminView.prototype.onClickUserSpyButton = function(e) {
    var button, userID;
    e.stopPropagation();
    userID = $(e.target).closest('tr').data('user-id');
    button = $(e.currentTarget);
    forms.disableSubmit(button);
    return me.spy(userID, {
      success: function() {
        return window.location.reload();
      },
      error: function() {
        forms.enableSubmit(button);
        return errors.showNotyNetworkError.apply(errors, arguments);
      }
    });
  };

  MainAdminView.prototype.onSubmitUserSearchForm = function(e) {
    var data, q, role, searchValue;
    e.preventDefault();
    searchValue = this.$el.find('#user-search').val();
    if (searchValue === this.lastUserSearchValue) {
      return;
    }
    if (!(this.lastUserSearchValue = searchValue.toLowerCase())) {
      return this.onSearchRequestSuccess([]);
    }
    forms.disableSubmit(this.$('#user-search-button'));
    q = this.lastUserSearchValue;
    role = void 0;
    q = q.replace(/role:([^ ]+)/, function(dummy, m1) {
      role = m1;
      return '';
    });
    data = {
      search: q
    };
    if (role != null) {
      data.role = role;
    }
    return $.ajax({
      type: 'POST',
      url: '/db/user/-/admin_search',
      data: data,
      success: this.onSearchRequestSuccess,
      error: this.onSearchRequestFailure
    });
  };

  MainAdminView.prototype.onSearchRequestSuccess = function(users) {
    var result, user;
    forms.enableSubmit(this.$('#user-search-button'));
    result = '';
    if (users.length) {
      result = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = users.length; i < len; i++) {
          user = users[i];
          results.push("<tr data-user-id='" + user._id + "'><td><code>" + user._id + "</code></td><td>" + (_.escape(user.name || 'Anonymous')) + "</td><td>" + (_.escape(user.email)) + "</td><td><button class='user-spy-button'>Spy</button></td></tr>");
        }
        return results;
      })();
      result = "<table class=\"table\">" + (result.join('\n')) + "</table>";
    }
    return this.$el.find('#user-search-result').html(result);
  };

  MainAdminView.prototype.onSearchRequestFailure = function(jqxhr, status, error) {
    if (this.destroyed) {
      return;
    }
    forms.enableSubmit(this.$('#user-search-button'));
    return console.warn("There was an error looking up " + this.lastUserSearchValue + ":", error);
  };

  MainAdminView.prototype.incrementUserAttribute = function(e) {
    var val;
    val = $('#increment-field').val();
    me.set(val, me.get(val) + 1);
    return me.save();
  };

  MainAdminView.prototype.onClickUserSearchResult = function(e) {
    var userID;
    userID = $(e.target).closest('tr').data('user-id');
    if (userID) {
      return this.openModalView(new AdministerUserModal({}, userID));
    }
  };

  MainAdminView.prototype.onClickFreeSubLink = function(e) {
    var options;
    delete this.freeSubLink;
    if (!me.isAdmin()) {
      return;
    }
    options = {
      url: '/db/prepaid/-/create',
      data: {
        type: 'subscription',
        maxRedeemers: 1
      },
      method: 'POST'
    };
    options.success = (function(_this) {
      return function(model, response, options) {
        if (application.isProduction()) {
          _this.freeSubLink = "https://codecombat.com/account/subscription?_ppc=" + model.code;
        } else {
          _this.freeSubLink = "http://localhost:3000/account/subscription?_ppc=" + model.code;
        }
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this);
    options.error = (function(_this) {
      return function(model, response, options) {
        return console.error('Failed to create prepaid', response);
      };
    })(this);
    return this.supermodel.addRequestResource('create_prepaid', options, 0).load();
  };

  MainAdminView.prototype.onClickTerminalSubLink = function(e) {
    var options;
    this.freeSubLink = '';
    if (!me.isAdmin()) {
      return;
    }
    options = {
      url: '/db/prepaid/-/create',
      method: 'POST',
      data: {
        type: 'terminal_subscription',
        maxRedeemers: parseInt($("#users").val()),
        months: parseInt($("#months").val())
      }
    };
    options.success = (function(_this) {
      return function(model, response, options) {
        if (application.isProduction()) {
          _this.freeSubLink = "https://codecombat.com/account/prepaid?_ppc=" + model.code;
        } else {
          _this.freeSubLink = "http://localhost:3000/account/prepaid?_ppc=" + model.code;
        }
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this);
    options.error = (function(_this) {
      return function(model, response, options) {
        return console.error('Failed to create prepaid', response);
      };
    })(this);
    return this.supermodel.addRequestResource('create_prepaid', options, 0).load();
  };

  MainAdminView.prototype.afterRender = function() {
    MainAdminView.__super__.afterRender.call(this);
    return this.$el.find('.search-help-toggle').click((function(_this) {
      return function() {
        return _this.$el.find('.search-help').toggle();
      };
    })(this));
  };

  MainAdminView.prototype.onClickExportProgress = function() {
    var classCode, classroom, courseLevels, courses, sessions, userMap, users;
    $('.classroom-progress-csv').prop('disabled', true);
    classCode = $('.classroom-progress-class-code').val();
    classroom = null;
    courses = null;
    courseLevels = [];
    sessions = null;
    users = null;
    userMap = {};
    return Promise.resolve(new Classroom().fetchByCode(classCode)).then((function(_this) {
      return function(model) {
        classroom = new Classroom({
          _id: model.data._id
        });
        return Promise.resolve(classroom.fetch());
      };
    })(this)).then((function(_this) {
      return function(model) {
        courses = new Courses();
        return Promise.resolve(courses.fetch());
      };
    })(this)).then((function(_this) {
      return function(models) {
        var course, i, index, j, len, len1, level, ref1, ref2;
        ref1 = classroom.get('courses');
        for (index = i = 0, len = ref1.length; i < len; index = ++i) {
          course = ref1[index];
          ref2 = course.levels;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            level = ref2[j];
            courseLevels.push({
              courseIndex: index + 1,
              levelID: level.original,
              slug: level.slug,
              courseSlug: courses.get(course._id).get('slug')
            });
          }
        }
        users = new Users();
        return Promise.resolve($.when.apply($, users.fetchForClassroom(classroom)));
      };
    })(this)).then((function(_this) {
      return function(models) {
        var i, len, ref1, user;
        ref1 = users.models;
        for (i = 0, len = ref1.length; i < len; i++) {
          user = ref1[i];
          userMap[user.id] = user;
        }
        sessions = new LevelSessions();
        return Promise.resolve($.when.apply($, sessions.fetchForAllClassroomMembers(classroom)));
      };
    })(this)).then((function(_this) {
      return function(models) {
        var acronym, base, columnLabels, courseLabelIndexes, csvContent, currentLevel, encodedUri, hours, i, j, k, l, lastCourseIndex, lastCourseLabel, len, len1, len2, len3, level, levelID, minutes, playtimes, rawSeconds, ref1, ref2, ref3, ref4, seconds, session, studentRow, user, userID, userLevelPlaytimeMap, userPlaytimes;
        userLevelPlaytimeMap = {};
        ref1 = sessions.models;
        for (i = 0, len = ref1.length; i < len; i++) {
          session = ref1[i];
          if (!((ref2 = session.get('state')) != null ? ref2.complete : void 0)) {
            continue;
          }
          levelID = session.get('level').original;
          userID = session.get('creator');
          if (userLevelPlaytimeMap[userID] == null) {
            userLevelPlaytimeMap[userID] = {};
          }
          if ((base = userLevelPlaytimeMap[userID])[levelID] == null) {
            base[levelID] = {};
          }
          userLevelPlaytimeMap[userID][levelID] = session.get('playtime');
        }
        userPlaytimes = [];
        for (userID in userMap) {
          user = userMap[userID];
          playtimes = [(ref3 = user.get('name')) != null ? ref3 : 'Anonymous'];
          for (j = 0, len1 = courseLevels.length; j < len1; j++) {
            level = courseLevels[j];
            if (((ref4 = userLevelPlaytimeMap[userID]) != null ? ref4[level.levelID] : void 0) != null) {
              rawSeconds = parseInt(userLevelPlaytimeMap[userID][level.levelID]);
              hours = Math.floor(rawSeconds / 60 / 60);
              minutes = Math.floor(rawSeconds / 60 - hours * 60);
              seconds = Math.round(rawSeconds - hours * 60 - minutes * 60);
              if (hours < 10) {
                hours = "0" + hours;
              }
              if (minutes < 10) {
                minutes = "0" + minutes;
              }
              if (seconds < 10) {
                seconds = "0" + seconds;
              }
              playtimes.push(hours + ":" + minutes + ":" + seconds);
            } else {
              playtimes.push('Incomplete');
            }
          }
          userPlaytimes.push(playtimes);
        }
        columnLabels = "Username";
        currentLevel = 1;
        courseLabelIndexes = {
          CS: 1,
          GD: 0,
          WD: 0
        };
        lastCourseIndex = 1;
        lastCourseLabel = 'CS1';
        for (k = 0, len2 = courseLevels.length; k < len2; k++) {
          level = courseLevels[k];
          if (level.courseIndex !== lastCourseIndex) {
            currentLevel = 1;
            lastCourseIndex = level.courseIndex;
            acronym = (function() {
              switch (false) {
                case !/game-dev/.test(level.courseSlug):
                  return 'GD';
                case !/web-dev/.test(level.courseSlug):
                  return 'WD';
                default:
                  return 'CS';
              }
            })();
            lastCourseLabel = acronym + ++courseLabelIndexes[acronym];
          }
          columnLabels += "," + lastCourseLabel + "." + (currentLevel++) + " " + level.slug;
        }
        csvContent = "data:text/csv;charset=utf-8," + columnLabels + "\n";
        for (l = 0, len3 = userPlaytimes.length; l < len3; l++) {
          studentRow = userPlaytimes[l];
          csvContent += studentRow.join(',') + "\n";
        }
        csvContent = csvContent.substring(0, csvContent.length - 1);
        encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
        return $('.classroom-progress-csv').prop('disabled', false);
      };
    })(this))["catch"](function(error) {
      $('.classroom-progress-csv').prop('disabled', false);
      console.error(error);
      throw error;
    });
  };

  return MainAdminView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/MainAdminView.js.map