require.register("views/admin/CodeLogsView", function(exports, require, module) {
var CodeLog, CodeLogCollection, CodeLogsView, CodePlaybackView, RootView, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/admin/codelogs-view');

CodeLogCollection = require('collections/CodeLogs');

CodeLog = require('models/CodeLog');

utils = require('core/utils');

CodePlaybackView = require('./CodePlaybackView');

module.exports = CodeLogsView = (function(superClass) {
  extend(CodeLogsView, superClass);

  function CodeLogsView() {
    this.onBlurTooltip = bind(this.onBlurTooltip, this);
    return CodeLogsView.__super__.constructor.apply(this, arguments);
  }

  CodeLogsView.prototype.template = template;

  CodeLogsView.prototype.id = 'codelogs-view';

  CodeLogsView.prototype.tooltip = null;

  CodeLogsView.prototype.events = {
    'click .playback': 'onClickPlayback',
    'input #userid-search': 'onUserIDInput',
    'input #levelslug-search': 'onLevelSlugInput'
  };

  CodeLogsView.prototype.initialize = function() {
    this.codelogs = new CodeLogCollection();
    this.supermodel.trackRequest(this.codelogs.fetchLatest());
    this.onUserIDInput = _.debounce(this.onUserIDInput, 300);
    return this.onLevelSlugInput = _.debounce(this.onLevelSlugInput, 300);
  };

  CodeLogsView.prototype.onUserIDInput = function(e) {
    var userID;
    userID = $('#userid-search')[0].value;
    if (userID !== '') {
      return Promise.resolve(this.codelogs.fetchByUserID(userID)).then((function(_this) {
        return function(e) {
          return _this.renderSelectors('#codelogtable');
        };
      })(this));
    } else {
      return Promise.resolve(this.codelogs.fetchLatest()).then((function(_this) {
        return function(e) {
          return _this.renderSelectors('#codelogtable');
        };
      })(this));
    }
  };

  CodeLogsView.prototype.onLevelSlugInput = function(e) {
    var slug;
    slug = $('#levelslug-search')[0].value;
    if (slug !== '') {
      return Promise.resolve(this.codelogs.fetchBySlug(slug)).then((function(_this) {
        return function(e) {
          return _this.renderSelectors('#codelogtable');
        };
      })(this));
    } else {
      return Promise.resolve(this.codelogs.fetchLatest()).then((function(_this) {
        return function(e) {
          return _this.renderSelectors('#codelogtable');
        };
      })(this));
    }
  };

  CodeLogsView.prototype.onClickPlayback = function(e) {
    return this.insertSubView(this.codePlaybackView = new CodePlaybackView({
      rawLog: $(e.target).data('codelog')
    }));
  };

  CodeLogsView.prototype.deleteTooltip = function() {
    if (this.tooltip != null) {
      this.tooltip.off('blur');
      this.tooltip.remove();
      return this.tooltip = null;
    }
  };

  CodeLogsView.prototype.onBlurTooltip = function(e) {
    return this.deleteTooltip();
  };

  CodeLogsView.prototype.destroy = function() {
    this.deleteTooltip();
    return CodeLogsView.__super__.destroy.call(this);
  };

  return CodeLogsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/CodeLogsView.js.map