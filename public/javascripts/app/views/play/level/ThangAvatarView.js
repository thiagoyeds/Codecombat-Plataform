require.register("views/play/level/ThangAvatarView", function(exports, require, module) {
var CocoView, ThangAvatarView, ThangType, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/thang_avatar');

ThangType = require('models/ThangType');

module.exports = ThangAvatarView = (function(superClass) {
  extend(ThangAvatarView, superClass);

  ThangAvatarView.prototype.className = 'thang-avatar-view';

  ThangAvatarView.prototype.template = template;

  ThangAvatarView.prototype.subscriptions = {
    'tome:problems-updated': 'onProblemsUpdated',
    'god:new-world-created': 'onNewWorld'
  };

  function ThangAvatarView(options) {
    ThangAvatarView.__super__.constructor.call(this, options);
    this.thang = options.thang;
    this.includeName = options.includeName;
    this.thangType = this.getSpriteThangType();
    if (!this.thangType) {
      console.error('Thang avatar view expected a thang type to be provided.');
      return;
    }
    if (!(this.thangType.isFullyLoaded() || this.thangType.loading)) {
      this.thangType.fetch();
    }
    this.listenTo(this.thangType, 'sync', this.render);
    this.listenTo(this.thangType, 'build-complete', this.render);
  }

  ThangAvatarView.prototype.getSpriteThangType = function() {
    var loadedThangs, t, thangs;
    thangs = this.supermodel.getModels(ThangType);
    thangs = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = thangs.length; i < len; i++) {
        t = thangs[i];
        if (t.get('name') === this.thang.spriteName) {
          results.push(t);
        }
      }
      return results;
    }).call(this);
    loadedThangs = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = thangs.length; i < len; i++) {
        t = thangs[i];
        if (t.isFullyLoaded()) {
          results.push(t);
        }
      }
      return results;
    })();
    return loadedThangs[0] || thangs[0];
  };

  ThangAvatarView.prototype.getRenderData = function(context) {
    var options, ref;
    if (context == null) {
      context = {};
    }
    context = ThangAvatarView.__super__.getRenderData.call(this, context);
    context.thang = this.thang;
    options = ((ref = this.thang) != null ? ref.getLankOptions() : void 0) || {};
    if (!this.thangType.loading) {
      context.avatarURL = this.thangType.getPortraitSource(options);
    }
    context.includeName = this.includeName;
    return context;
  };

  ThangAvatarView.prototype.setProblems = function(problemCount, level) {
    var badge;
    badge = this.$el.find('.badge.problems').text(problemCount ? 'x' : '');
    badge.removeClass('error warning info');
    if (level) {
      return badge.addClass(level);
    }
  };

  ThangAvatarView.prototype.setSharedThangs = function(sharedThangCount) {
    var badge;
    return badge = this.$el.find('.badge.shared-thangs').text(sharedThangCount > 1 ? sharedThangCount : '');
  };

  ThangAvatarView.prototype.setSelected = function(selected) {
    return this.$el.toggleClass('selected', Boolean(selected));
  };

  ThangAvatarView.prototype.onProblemsUpdated = function(e) {
    var aether, i, len, level, myProblems, ref, ref1, ref2, ref3, worstLevel;
    if (((ref = this.thang) != null ? ref.id : void 0) !== ((ref1 = e.spell.thang) != null ? ref1.thang.id : void 0)) {
      return;
    }
    aether = e.spell.thang.castAether;
    myProblems = (ref2 = aether != null ? aether.getAllProblems() : void 0) != null ? ref2 : [];
    worstLevel = null;
    ref3 = ['error', 'warning', 'info'];
    for (i = 0, len = ref3.length; i < len; i++) {
      level = ref3[i];
      if (!(_.some(myProblems, {
        level: level
      }))) {
        continue;
      }
      worstLevel = level;
      break;
    }
    return this.setProblems(myProblems.length, worstLevel);
  };

  ThangAvatarView.prototype.onNewWorld = function(e) {
    if (this.thang && e.world.thangMap[this.thang.id]) {
      return this.options.thang = this.thang = e.world.thangMap[this.thang.id];
    }
  };

  ThangAvatarView.prototype.destroy = function() {
    return ThangAvatarView.__super__.destroy.call(this);
  };

  return ThangAvatarView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/ThangAvatarView.js.map