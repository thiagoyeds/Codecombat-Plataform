require.register("views/editor/level/systems/SystemsTabView", function(exports, require, module) {
var AddLevelSystemModal, CocoView, Level, LevelSystem, LevelSystemConfigurationNode, LevelSystemEditView, LevelSystemNode, NewLevelSystemModal, SystemsTabView, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/systems-tab-view');

Level = require('models/Level');

LevelSystem = require('models/LevelSystem');

LevelSystemEditView = require('./LevelSystemEditView');

NewLevelSystemModal = require('./NewLevelSystemModal');

AddLevelSystemModal = require('./AddLevelSystemModal');

nodes = require('../treema_nodes');

require('vendor/treema');

module.exports = SystemsTabView = (function(superClass) {
  extend(SystemsTabView, superClass);

  SystemsTabView.prototype.id = 'systems-tab-view';

  SystemsTabView.prototype.template = template;

  SystemsTabView.prototype.className = 'tab-pane';

  SystemsTabView.prototype.subscriptions = {
    'editor:level-system-added': 'onLevelSystemAdded',
    'editor:edit-level-system': 'editLevelSystem',
    'editor:level-system-editing-ended': 'onLevelSystemEditingEnded',
    'editor:level-loaded': 'onLevelLoaded',
    'editor:terrain-changed': 'onTerrainChanged'
  };

  SystemsTabView.prototype.events = {
    'click #add-system-button': 'addLevelSystem',
    'click #create-new-system-button': 'createNewLevelSystem',
    'click #create-new-system': 'createNewLevelSystem'
  };

  function SystemsTabView(options) {
    this.onSystemSelected = bind(this.onSystemSelected, this);
    this.getSortedByName = bind(this.getSortedByName, this);
    this.onSystemsChanged = bind(this.onSystemsChanged, this);
    var i, len, ls, ref, system, url;
    SystemsTabView.__super__.constructor.call(this, options);
    ref = this.buildDefaultSystems();
    for (i = 0, len = ref.length; i < len; i++) {
      system = ref[i];
      url = "/db/level.system/" + system.original + "/version/" + system.majorVersion;
      ls = new LevelSystem().setURL(url);
      this.supermodel.loadModel(ls);
    }
  }

  SystemsTabView.prototype.afterRender = function() {
    return this.buildSystemsTreema();
  };

  SystemsTabView.prototype.onLoaded = function() {
    return SystemsTabView.__super__.onLoaded.call(this);
  };

  SystemsTabView.prototype.onLevelLoaded = function(e) {
    this.level = e.level;
    return this.buildSystemsTreema();
  };

  SystemsTabView.prototype.buildSystemsTreema = function() {
    var insertedDefaults, ref, superteams, systems, teams, thangIDs, thangs, treemaOptions;
    if (!(this.level && this.supermodel.finished())) {
      return;
    }
    systems = $.extend(true, [], (ref = this.level.get('systems')) != null ? ref : []);
    if (!systems.length) {
      systems = this.buildDefaultSystems();
      insertedDefaults = true;
    }
    systems = this.getSortedByName(systems);
    thangs = this.level != null ? this.level.get('thangs') : [];
    thangIDs = _.filter(_.pluck(thangs, 'id'));
    teams = _.filter(_.pluck(thangs, 'team'));
    superteams = _.filter(_.pluck(thangs, 'superteam'));
    superteams = _.union(teams, superteams);
    treemaOptions = {
      supermodel: this.supermodel,
      schema: Level.schema.properties.systems,
      data: systems,
      readOnly: me.get('anonymous'),
      world: this.options.world,
      view: this,
      thangIDs: thangIDs,
      teams: teams,
      superteams: superteams,
      callbacks: {
        change: this.onSystemsChanged,
        select: this.onSystemSelected
      },
      nodeClasses: {
        'level-system': LevelSystemNode,
        'level-system-configuration': LevelSystemConfigurationNode,
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
        'item-thang-type': nodes.ItemThangTypeNode
      }
    };
    this.systemsTreema = this.$el.find('#systems-treema').treema(treemaOptions);
    this.systemsTreema.build();
    this.systemsTreema.open();
    if (insertedDefaults) {
      return this.onSystemsChanged();
    }
  };

  SystemsTabView.prototype.onSystemsChanged = function(e) {
    var systems;
    systems = this.getSortedByName(this.systemsTreema.data);
    return this.level.set('systems', systems);
  };

  SystemsTabView.prototype.getSortedByName = function(systems) {
    var i, len, sys, systemModelMap, systemModels;
    systemModels = this.supermodel.getModels(LevelSystem);
    systemModelMap = {};
    for (i = 0, len = systemModels.length; i < len; i++) {
      sys = systemModels[i];
      systemModelMap[sys.get('original')] = sys.get('name');
    }
    return _.sortBy(systems, function(sys) {
      return systemModelMap[sys.original];
    });
  };

  SystemsTabView.prototype.onSystemSelected = function(e, selected) {
    var data;
    selected = selected.length > 1 ? selected[0].getLastSelectedTreema() : selected[0];
    if (!selected) {
      if (this.levelSystemEditView) {
        this.removeSubView(this.levelSystemEditView);
      }
      this.levelSystemEditView = null;
      return;
    }
    while (!((data = selected.getData()) && data.original)) {
      selected = selected.parent;
    }
    return this.editLevelSystem({
      original: data.original,
      majorVersion: data.majorVersion
    });
  };

  SystemsTabView.prototype.onLevelSystemAdded = function(e) {
    return this.systemsTreema.insert('/', e.system);
  };

  SystemsTabView.prototype.addLevelSystem = function(e) {
    this.openModalView(new AddLevelSystemModal({
      supermodel: this.supermodel,
      extantSystems: _.cloneDeep(this.systemsTreema.data)
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  SystemsTabView.prototype.createNewLevelSystem = function(e) {
    this.openModalView(new NewLevelSystemModal({
      supermodel: this.supermodel
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  SystemsTabView.prototype.editLevelSystem = function(e) {
    return this.levelSystemEditView = this.insertSubView(new LevelSystemEditView({
      original: e.original,
      majorVersion: e.majorVersion,
      supermodel: this.supermodel
    }));
  };

  SystemsTabView.prototype.onLevelSystemEditingEnded = function(e) {
    this.removeSubView(this.levelSystemEditView);
    return this.levelSystemEditView = null;
  };

  SystemsTabView.prototype.onTerrainChanged = function(e) {
    var AI, Vision, changed, defaultPathfinding, ref, ref1, ref2;
    defaultPathfinding = (ref = e.terrain) === 'Dungeon' || ref === 'Indoor' || ref === 'Mountain' || ref === 'Glacier' || ref === 'Volcano';
    changed = false;
    if (AI = this.systemsTreema.get('original=528110f30268d018e3000001')) {
      if (((ref1 = AI.config) != null ? ref1.findsPaths : void 0) !== defaultPathfinding) {
        if (AI.config == null) {
          AI.config = {};
        }
        AI.config.findsPaths = defaultPathfinding;
        this.systemsTreema.set('original=528110f30268d018e3000001', AI);
        changed = true;
      }
    }
    if (Vision = this.systemsTreema.get('original=528115040268d018e300001b')) {
      if (((ref2 = Vision.config) != null ? ref2.checksLineOfSight : void 0) !== defaultPathfinding) {
        if (Vision.config == null) {
          Vision.config = {};
        }
        Vision.config.checksLineOfSight = defaultPathfinding;
        this.systemsTreema.set('original=528115040268d018e300001b', Vision);
        changed = true;
      }
    }
    if (changed) {
      return noty({
        text: "AI/Vision System defaulted pathfinding/line-of-sight to " + defaultPathfinding + " for terrain " + e.terrain + ".",
        layout: 'topCenter',
        timeout: 5000,
        type: 'information'
      });
    }
  };

  SystemsTabView.prototype.buildDefaultSystems = function() {
    return [
      {
        original: '528112c00268d018e3000008',
        majorVersion: 0
      }, {
        original: '5280f83b8ae1581b66000001',
        majorVersion: 0
      }, {
        original: '5281146f0268d018e3000014',
        majorVersion: 0
      }, {
        original: '528110f30268d018e3000001',
        majorVersion: 0
      }, {
        original: '52810ffa33e01a6e86000012',
        majorVersion: 0
      }, {
        original: '528114b20268d018e3000017',
        majorVersion: 0
      }, {
        original: '528105f833e01a6e86000007',
        majorVersion: 0
      }, {
        original: '528113240268d018e300000c',
        majorVersion: 0
      }, {
        original: '528112530268d018e3000007',
        majorVersion: 0
      }, {
        original: '52810f4933e01a6e8600000c',
        majorVersion: 0
      }, {
        original: '528115040268d018e300001b',
        majorVersion: 0
      }, {
        original: '5280dc4d251616c907000001',
        majorVersion: 0
      }, {
        original: '528111b30268d018e3000004',
        majorVersion: 0
      }, {
        original: '528114e60268d018e300001a',
        majorVersion: 0
      }, {
        original: '528114040268d018e3000011',
        majorVersion: 0
      }, {
        original: '52ae4f02a4dcd4415200000b',
        majorVersion: 0
      }, {
        original: '52e953e81b2028d102000004',
        majorVersion: 0
      }, {
        original: '52f1354370fb890000000005',
        majorVersion: 0
      }
    ];
  };

  SystemsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.systemsTreema) != null) {
      ref.destroy();
    }
    return SystemsTabView.__super__.destroy.call(this);
  };

  return SystemsTabView;

})(CocoView);

LevelSystemNode = (function(superClass) {
  extend(LevelSystemNode, superClass);

  LevelSystemNode.prototype.valueClass = 'treema-level-system';

  function LevelSystemNode() {
    var ref, ref1, ref2;
    LevelSystemNode.__super__.constructor.apply(this, arguments);
    this.grabDBComponent();
    this.collection = ((ref = this.system) != null ? (ref1 = ref.attributes) != null ? (ref2 = ref1.configSchema) != null ? ref2.properties : void 0 : void 0 : void 0) != null;
  }

  LevelSystemNode.prototype.grabDBComponent = function() {
    var data;
    data = this.getData();
    this.system = this.settings.supermodel.getModelByOriginalAndMajorVersion(LevelSystem, data.original, data.majorVersion);
    if (!this.system) {
      return console.error('Couldn\'t find system for', data.original, data.majorVersion, 'from models', this.settings.supermodel.models);
    }
  };

  LevelSystemNode.prototype.getChildSchema = function(key) {
    if (key === 'config') {
      return this.system.attributes.configSchema;
    }
    return LevelSystemNode.__super__.getChildSchema.call(this, key);
  };

  LevelSystemNode.prototype.buildValueForDisplay = function(valEl, data) {
    var name;
    if (!(data.original && this.system)) {
      return LevelSystemNode.__super__.buildValueForDisplay.call(this, valEl);
    }
    name = this.system.get('name');
    if (this.system.get('version').major) {
      name += " v" + (this.system.get('version').major);
    }
    return this.buildValueForDisplaySimply(valEl, name);
  };

  LevelSystemNode.prototype.onEnterPressed = function(e) {
    var data;
    LevelSystemNode.__super__.onEnterPressed.call(this, e);
    data = this.getData();
    return Backbone.Mediator.publish('editor:edit-level-system', {
      original: data.original,
      majorVersion: data.majorVersion
    });
  };

  LevelSystemNode.prototype.open = function(depth) {
    var cTreema;
    LevelSystemNode.__super__.open.call(this, depth);
    cTreema = this.childrenTreemas.config;
    if ((cTreema != null) && (cTreema.getChildren().length || cTreema.canAddChild())) {
      return cTreema.open();
    }
  };

  return LevelSystemNode;

})(TreemaObjectNode);

LevelSystemConfigurationNode = (function(superClass) {
  extend(LevelSystemConfigurationNode, superClass);

  function LevelSystemConfigurationNode() {
    return LevelSystemConfigurationNode.__super__.constructor.apply(this, arguments);
  }

  LevelSystemConfigurationNode.prototype.valueClass = 'treema-level-system-configuration';

  LevelSystemConfigurationNode.prototype.buildValueForDisplay = function() {};

  return LevelSystemConfigurationNode;

})(TreemaObjectNode);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/systems/SystemsTabView.js.map