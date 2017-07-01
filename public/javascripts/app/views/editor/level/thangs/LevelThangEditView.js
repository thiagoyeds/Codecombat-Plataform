require.register("views/editor/level/thangs/LevelThangEditView", function(exports, require, module) {
var CocoView, LevelThangEditView, ThangComponentsEditView, ThangType, ace, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/thang/level-thang-edit-view');

ThangComponentsEditView = require('views/editor/component/ThangComponentsEditView');

ThangType = require('models/ThangType');

ace = require('ace');

module.exports = LevelThangEditView = (function(superClass) {
  extend(LevelThangEditView, superClass);


  /*
  In the level editor, is the bar at the top when editing a single thang.
  Everything below is part of the ThangComponentsEditView, which is shared with the
  ThangType editor view.
   */

  LevelThangEditView.prototype.id = 'level-thang-edit-view';

  LevelThangEditView.prototype.template = template;

  LevelThangEditView.prototype.events = {
    'click #all-thangs-link': 'navigateToAllThangs',
    'click #thang-name-link span': 'toggleNameEdit',
    'click #thang-type-link span': 'toggleTypeEdit',
    'blur #thang-name-link input': 'toggleNameEdit',
    'blur #thang-type-link input': 'toggleTypeEdit',
    'keydown #thang-name-link input': 'toggleNameEditIfReturn',
    'keydown #thang-type-link input': 'toggleTypeEditIfReturn'
  };

  function LevelThangEditView(options) {
    this.reportChanges = bind(this.reportChanges, this);
    this.onComponentsChanged = bind(this.onComponentsChanged, this);
    var ref;
    if (options == null) {
      options = {};
    }
    LevelThangEditView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.thangData = $.extend(true, {}, (ref = options.thangData) != null ? ref : {});
    this.level = options.level;
    this.oldPath = options.oldPath;
    this.reportChanges = _.debounce(this.reportChanges, 1000);
  }

  LevelThangEditView.prototype.onLoaded = function() {
    return this.render();
  };

  LevelThangEditView.prototype.afterRender = function() {
    var input, m, options, thangType, thangTypeName, thangTypeNames;
    LevelThangEditView.__super__.afterRender.call(this);
    thangType = this.supermodel.getModelByOriginal(ThangType, this.thangData.thangType);
    options = {
      components: this.thangData.components,
      supermodel: this.supermodel,
      level: this.level,
      world: this.world
    };
    if (this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      options.thangType = thangType;
    }
    this.thangComponentEditView = new ThangComponentsEditView(options);
    this.listenTo(this.thangComponentEditView, 'components-changed', this.onComponentsChanged);
    this.insertSubView(this.thangComponentEditView);
    thangTypeNames = (function() {
      var i, len, ref, results;
      ref = this.supermodel.getModels(ThangType);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        results.push(m.get('name'));
      }
      return results;
    }).call(this);
    input = this.$el.find('#thang-type-link input').autocomplete({
      source: thangTypeNames,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    thangType = _.find(this.supermodel.getModels(ThangType), (function(_this) {
      return function(m) {
        return m.get('original') === _this.thangData.thangType;
      };
    })(this));
    thangTypeName = (thangType != null ? thangType.get('name') : void 0) || 'None';
    input.val(thangTypeName);
    this.$el.find('#thang-type-link span').text(thangTypeName);
    return this.hideLoading();
  };

  LevelThangEditView.prototype.navigateToAllThangs = function() {
    return Backbone.Mediator.publish('editor:level-thang-done-editing', {
      thangData: $.extend(true, {}, this.thangData),
      oldPath: this.oldPath
    });
  };

  LevelThangEditView.prototype.toggleNameEdit = function() {
    var input, link, span, wasEditing;
    link = this.$el.find('#thang-name-link');
    wasEditing = link.find('input:visible').length;
    span = link.find('span');
    input = link.find('input');
    if (wasEditing) {
      span.text(input.val());
    } else {
      input.val(span.text());
    }
    link.find('span, input').toggle();
    if (!wasEditing) {
      input.select();
    }
    return this.thangData.id = span.text();
  };

  LevelThangEditView.prototype.toggleTypeEdit = function() {
    var input, link, span, thangType, thangTypeName, wasEditing;
    link = this.$el.find('#thang-type-link');
    wasEditing = link.find('input:visible').length;
    span = link.find('span');
    input = link.find('input');
    if (wasEditing) {
      span.text(input.val());
    }
    link.find('span, input').toggle();
    if (!wasEditing) {
      input.select();
    }
    thangTypeName = input.val();
    thangType = _.find(this.supermodel.getModels(ThangType), function(m) {
      return m.get('name') === thangTypeName;
    });
    if (thangType && wasEditing) {
      return this.thangData.thangType = thangType.get('original');
    }
  };

  LevelThangEditView.prototype.toggleNameEditIfReturn = function(e) {
    if (e.which === 13) {
      return this.$el.find('#thang-name-link input').blur();
    }
  };

  LevelThangEditView.prototype.toggleTypeEditIfReturn = function(e) {
    if (e.which === 13) {
      return this.$el.find('#thang-type-link input').blur();
    }
  };

  LevelThangEditView.prototype.onComponentsChanged = function(components) {
    this.thangData.components = components;
    return this.reportChanges();
  };

  LevelThangEditView.prototype.reportChanges = function() {
    if (this.destroyed) {
      return;
    }
    return Backbone.Mediator.publish('editor:level-thang-edited', {
      thangData: $.extend(true, {}, this.thangData),
      oldPath: this.oldPath
    });
  };

  return LevelThangEditView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/thangs/LevelThangEditView.js.map