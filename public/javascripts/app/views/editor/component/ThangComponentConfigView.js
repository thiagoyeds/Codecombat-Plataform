require.register("templates/editor/component/thang-component-config-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"panel panel-default\"><div" + (jade.attrs({ "class": [('panel-heading'),(view.isDefaultComponent ? "is-default-component" : "")] }, {"class":true})) + "><em>" + (jade.escape((jade.interp = view.component.attributes.system) == null ? '' : jade.interp)) + ".</em><strong class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = view.component.attributes.name) ? "" : jade.interp)) + "</strong><span id=\"description\" class=\"text-muted\">" + (jade.escape(null == (jade.interp = view.component.attributes.description) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div class=\"treema\"></div></div></div>");;return buf.join("");
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

;require.register("views/editor/component/ThangComponentConfigView", function(exports, require, module) {
var CocoView, ComponentConfigNode, Level, LevelComponent, SolutionsNode, ThangComponentConfigView, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/component/thang-component-config-view');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

nodes = require('../level/treema_nodes');

require('vendor/treema');

module.exports = ThangComponentConfigView = (function(superClass) {
  extend(ThangComponentConfigView, superClass);

  ThangComponentConfigView.prototype.className = 'thang-component-config-view';

  ThangComponentConfigView.prototype.template = template;

  ThangComponentConfigView.prototype.changed = false;

  function ThangComponentConfigView(options) {
    this.onConfigEdited = bind(this.onConfigEdited, this);
    ThangComponentConfigView.__super__.constructor.call(this, options);
    this.component = options.component;
    this.config = options.config || {};
    this.additionalDefaults = options.additionalDefaults;
    this.isDefaultComponent = false;
    this.world = options.world;
    this.level = options.level;
    this.callback = options.callback;
  }

  ThangComponentConfigView.prototype.afterRender = function() {
    ThangComponentConfigView.__super__.afterRender.call(this);
    return this.buildTreema();
  };

  ThangComponentConfigView.prototype.setConfig = function(config) {
    this.handlingChange = true;
    this.editThangTreema.set('/', config);
    return this.handlingChange = false;
  };

  ThangComponentConfigView.prototype.setIsDefaultComponent = function(isDefaultComponent) {
    var changed;
    changed = this.isDefaultComponent !== isDefaultComponent;
    if (isDefaultComponent) {
      this.config = void 0;
    }
    this.isDefaultComponent = isDefaultComponent;
    if (changed) {
      return this.render();
    }
  };

  ThangComponentConfigView.prototype.buildTreema = function() {
    var ref, schema, superteams, teams, thangIDs, thangs, treemaOptions;
    thangs = this.level != null ? this.level.get('thangs') : [];
    thangIDs = _.filter(_.pluck(thangs, 'id'));
    teams = _.filter(_.pluck(thangs, 'team'));
    superteams = _.filter(_.pluck(thangs, 'superteam'));
    superteams = _.union(teams, superteams);
    schema = $.extend(true, {}, this.component.get('configSchema'));
    if (schema["default"] == null) {
      schema["default"] = {};
    }
    if (this.additionalDefaults) {
      _.merge(schema["default"], this.additionalDefaults);
    }
    if ((ref = this.level) != null ? ref.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') : void 0) {
      schema.required = [];
    }
    treemaOptions = {
      supermodel: this.supermodel,
      schema: schema,
      data: this.config,
      callbacks: {
        change: this.onConfigEdited
      },
      world: this.world,
      view: this,
      thangIDs: thangIDs,
      teams: teams,
      superteams: superteams,
      nodeClasses: {
        object: ComponentConfigNode,
        'point2d': nodes.WorldPointNode,
        'viewport': nodes.WorldViewportNode,
        'bounds': nodes.WorldBoundsNode,
        'radians': nodes.RadiansNode,
        'team': nodes.TeamNode,
        'superteam': nodes.SuperteamNode,
        'meters': nodes.MetersNode,
        'kilograms': nodes.KilogramsNode,
        'seconds': nodes.SecondsNode,
        'speed': nodes.SpeedNode,
        'acceleration': nodes.AccelerationNode,
        'thang-type': nodes.ThangTypeNode,
        'item-thang-type': nodes.ItemThangTypeNode,
        'solutions': SolutionsNode
      }
    };
    this.editThangTreema = this.$el.find('.treema').treema(treemaOptions);
    this.editThangTreema.build();
    this.editThangTreema.open(2);
    if (_.isEqual(this.editThangTreema.data, {}) && !this.editThangTreema.canAddChild()) {
      return this.$el.find('.panel-body').hide();
    }
  };

  ThangComponentConfigView.prototype.onConfigEdited = function() {
    if (this.destroyed || this.handlingChange) {
      return;
    }
    this.config = this.data();
    this.changed = true;
    return this.trigger('changed', {
      component: this.component,
      config: this.config
    });
  };

  ThangComponentConfigView.prototype.data = function() {
    return this.editThangTreema.data;
  };

  ThangComponentConfigView.prototype.destroy = function() {
    var ref;
    if ((ref = this.editThangTreema) != null) {
      ref.destroy();
    }
    return ThangComponentConfigView.__super__.destroy.call(this);
  };

  return ThangComponentConfigView;

})(CocoView);

ComponentConfigNode = (function(superClass) {
  extend(ComponentConfigNode, superClass);

  function ComponentConfigNode() {
    return ComponentConfigNode.__super__.constructor.apply(this, arguments);
  }

  ComponentConfigNode.prototype.nodeDescription = 'Component Property';

  return ComponentConfigNode;

})(TreemaObjectNode);

SolutionsNode = (function(superClass) {
  extend(SolutionsNode, superClass);

  function SolutionsNode() {
    this.onClickFillDefaults = bind(this.onClickFillDefaults, this);
    return SolutionsNode.__super__.constructor.apply(this, arguments);
  }

  SolutionsNode.prototype.buildValueForDisplay = function(valEl, data) {
    var btn;
    btn = $('<button class="btn btn-default btn-xs">Fill defaults</button>');
    btn.on('click', this.onClickFillDefaults);
    return valEl.append(btn);
  };

  SolutionsNode.prototype.onClickFillDefaults = function(e) {
    var i, language, len, ref, solution, solutions, source, sources;
    e.preventDefault();
    sources = {
      javascript: this.parent.data.source
    };
    _.extend(sources, this.parent.data.languages || {});
    solutions = _.clone(this.data);
    solutions = _.filter(solutions, function(solution) {
      return !_.isEmpty(solution);
    });
    ref = _.keys(sources);
    for (i = 0, len = ref.length; i < len; i++) {
      language = ref[i];
      source = sources[language];
      solution = _.findWhere(solutions, {
        language: language
      });
      if (solution) {
        continue;
      }
      solutions.push({
        source: source,
        language: language,
        succeeds: true
      });
    }
    return this.set('/', solutions);
  };

  return SolutionsNode;

})(TreemaArrayNode);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/component/ThangComponentConfigView.js.map