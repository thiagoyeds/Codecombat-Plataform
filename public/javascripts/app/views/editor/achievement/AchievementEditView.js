require.register("views/editor/achievement/AchievementEditView", function(exports, require, module) {
var Achievement, AchievementEditView, AchievementPopup, ConfirmModal, Level, PatchesView, RootView, app, errors, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/achievement/edit');

Achievement = require('models/Achievement');

Level = require('models/Level');

AchievementPopup = require('views/core/AchievementPopup');

ConfirmModal = require('views/core/ConfirmModal');

PatchesView = require('views/editor/PatchesView');

errors = require('core/errors');

app = require('core/application');

nodes = require('views/editor/level/treema_nodes');

require('game-libraries');

module.exports = AchievementEditView = (function(superClass) {
  extend(AchievementEditView, superClass);

  AchievementEditView.prototype.id = 'editor-achievement-edit-view';

  AchievementEditView.prototype.template = template;

  AchievementEditView.prototype.events = {
    'click #save-button': 'saveAchievement',
    'click #recalculate-button': 'confirmRecalculation',
    'click #recalculate-all-button': 'confirmAllRecalculation',
    'click #delete-button': 'confirmDeletion'
  };

  function AchievementEditView(options, achievementID) {
    this.achievementID = achievementID;
    this.deleteAchievement = bind(this.deleteAchievement, this);
    this.recalculateAchievement = bind(this.recalculateAchievement, this);
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    AchievementEditView.__super__.constructor.call(this, options);
    this.achievement = new Achievement({
      _id: this.achievementID
    });
    this.achievement.saveBackups = true;
    this.supermodel.trackRequest(this.achievement.fetch());
    this.listenToOnce(this.achievement, 'sync', function() {
      var i, len, level, levelOriginal, ref, ref1, ref2, results;
      ref2 = (ref = (ref1 = this.achievement.get('rewards')) != null ? ref1.levels : void 0) != null ? ref : [];
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        levelOriginal = ref2[i];
        level = new Level();
        this.supermodel.trackRequest(level.fetchLatestVersion(levelOriginal, {
          data: {
            project: 'name,version,original'
          }
        }));
        results.push(level.once('sync', (function(_this) {
          return function(level) {
            return _this.supermodel.registerModel(level);
          };
        })(this)));
      }
      return results;
    });
    this.pushChangesToPreview = _.throttle(this.pushChangesToPreview, 500);
  }

  AchievementEditView.prototype.onLoaded = function() {
    AchievementEditView.__super__.onLoaded.call(this);
    this.buildTreema();
    return this.listenTo(this.achievement, 'change', (function(_this) {
      return function() {
        _this.achievement.updateI18NCoverage();
        return _this.treema.set('/', _this.achievement.attributes);
      };
    })(this));
  };

  AchievementEditView.prototype.buildTreema = function() {
    var data, options, ref;
    if ((this.treema != null) || (!this.achievement.loaded)) {
      return;
    }
    data = $.extend(true, {}, this.achievement.attributes);
    options = {
      data: data,
      filePath: "db/achievement/" + (this.achievement.get('_id')),
      schema: Achievement.schema,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.pushChangesToPreview
      },
      nodeClasses: {
        'thang-type': nodes.ThangTypeNode,
        'item-thang-type': nodes.ItemThangTypeNode
      },
      supermodel: this.supermodel
    };
    this.treema = this.$el.find('#achievement-treema').treema(options);
    this.treema.build();
    if ((ref = this.treema.childrenTreemas.rewards) != null) {
      ref.open(3);
    }
    return this.pushChangesToPreview();
  };

  AchievementEditView.prototype.afterRender = function() {
    AchievementEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.pushChangesToPreview();
    this.patchesView = this.insertSubView(new PatchesView(this.achievement), this.$el.find('.patches-view'));
    return this.patchesView.load();
  };

  AchievementEditView.prototype.pushChangesToPreview = function() {
    var earned, key, popup, ref, value;
    if (!this.treema) {
      return;
    }
    this.$el.find('#achievement-view').empty();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.achievement.set(key, value);
    }
    earned = {
      get: (function(_this) {
        return function(key) {
          return {
            earnedPoints: _this.achievement.get('worth'),
            previouslyAchievedAmount: 0
          }[key];
        };
      })(this)
    };
    return popup = new AchievementPopup({
      achievement: this.achievement,
      earnedAchievement: earned,
      popup: false,
      container: $('#achievement-view')
    });
  };

  AchievementEditView.prototype.openSaveModal = function() {
    return 'Maybe later';
  };

  AchievementEditView.prototype.saveAchievement = function(e) {
    var key, ref, res, value;
    this.treema.endExistingEdits();
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      this.achievement.set(key, value);
    }
    res = this.achievement.save();
    res.error((function(_this) {
      return function(collection, response, options) {
        return console.error(response);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var url;
        if (window.achievementSavedCallback) {
          return window.achievementSavedCallback({
            achievement: _this.achievement
          });
        } else {
          url = "/editor/achievement/" + (_this.achievement.get('slug') || _this.achievement.id);
          return document.location.href = url;
        }
      };
    })(this));
  };

  AchievementEditView.prototype.confirmRecalculation = function(e, all) {
    var confirmModal, renderData;
    if (all == null) {
      all = false;
    }
    renderData = {
      title: 'Are you really sure?',
      body: "This will trigger recalculation of " + (all ? 'all achievements' : 'the achievement') + " for all users. Are you really sure you want to go down this path?",
      decline: 'Not really',
      confirm: 'Definitely'
    };
    confirmModal = new ConfirmModal(renderData);
    confirmModal.on('confirm', this.recalculateAchievement);
    this.recalculatingAll = all;
    return this.openModalView(confirmModal);
  };

  AchievementEditView.prototype.confirmAllRecalculation = function(e) {
    return this.confirmRecalculation(e, true);
  };

  AchievementEditView.prototype.confirmDeletion = function() {
    var confirmModal, renderData;
    renderData = {
      title: 'Are you really sure?',
      body: 'This will completely delete the achievement, potentially breaking a lot of stuff you don\'t want breaking. Are you entirely sure?',
      decline: 'Not really',
      confirm: 'Definitely'
    };
    confirmModal = new ConfirmModal(renderData);
    confirmModal.on('confirm', this.deleteAchievement);
    return this.openModalView(confirmModal);
  };

  AchievementEditView.prototype.recalculateAchievement = function() {
    var data;
    data = this.recalculatingAll ? {} : {
      achievements: [this.achievement.get('slug') || this.achievement.get('_id')]
    };
    return $.ajax({
      data: JSON.stringify(data),
      success: function(data, status, jqXHR) {
        return noty({
          timeout: 5000,
          text: 'Recalculation process started',
          type: 'success',
          layout: 'topCenter'
        });
      },
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return noty({
          timeout: 5000,
          text: "Starting recalculation process failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        });
      },
      url: '/admin/earned.achievement/recalculate',
      type: 'POST',
      contentType: 'application/json'
    });
  };

  AchievementEditView.prototype.deleteAchievement = function() {
    console.debug('deleting');
    return $.ajax({
      type: 'DELETE',
      success: function() {
        noty({
          timeout: 5000,
          text: 'Aaaand it\'s gone.',
          type: 'success',
          layout: 'topCenter'
        });
        return _.delay(function() {
          return app.router.navigate('/editor/achievement', {
            trigger: true
          });
        }, 500);
      },
      error: function(jqXHR, status, error) {
        console.error(jqXHR);
        return {
          timeout: 5000,
          text: "Deleting achievement failed with error code " + jqXHR.status,
          type: 'error',
          layout: 'topCenter'
        };
      },
      url: "/db/achievement/" + this.achievement.id
    });
  };

  return AchievementEditView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/achievement/AchievementEditView.js.map