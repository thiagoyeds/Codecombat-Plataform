require.register("views/editor/level/settings/SettingsTabView", function(exports, require, module) {
var CocoView, ConceptNode, ConceptsListNode, Level, SettingsNode, SettingsTabView, SolutionGearNode, SolutionStatsNode, Surface, ThangType, concepts, me, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/settings_tab');

Level = require('models/Level');

ThangType = require('models/ThangType');

Surface = require('lib/surface/Surface');

nodes = require('./../treema_nodes');

me = require('core/auth').me;

require('vendor/treema');

concepts = require('schemas/concepts');

module.exports = SettingsTabView = (function(superClass) {
  extend(SettingsTabView, superClass);

  SettingsTabView.prototype.id = 'editor-level-settings-tab-view';

  SettingsTabView.prototype.className = 'tab-pane';

  SettingsTabView.prototype.template = template;

  SettingsTabView.prototype.editableSettings = ['name', 'description', 'documentation', 'nextLevel', 'victory', 'i18n', 'goals', 'type', 'kind', 'terrain', 'banner', 'loadingTip', 'requiresSubscription', 'adventurer', 'adminOnly', 'helpVideos', 'replayable', 'scoreTypes', 'concepts', 'primaryConcepts', 'picoCTFProblem', 'practice', 'practiceThresholdMinutes', 'primerLanguage', 'shareable', 'studentPlayInstructions', 'requiredCode', 'suspectCode', 'requiredGear', 'restrictedGear', 'requiredProperties', 'restrictedProperties', 'recommendedHealth', 'allowedHeroes'];

  SettingsTabView.prototype.subscriptions = {
    'editor:level-loaded': 'onLevelLoaded',
    'editor:thangs-edited': 'onThangsEdited',
    'editor:random-terrain-generated': 'onRandomTerrainGenerated'
  };

  function SettingsTabView(options) {
    this.onSettingsChanged = bind(this.onSettingsChanged, this);
    SettingsTabView.__super__.constructor.call(this, options);
  }

  SettingsTabView.prototype.onLoaded = function() {};

  SettingsTabView.prototype.onLevelLoaded = function(e) {
    var data, schema, treemaOptions;
    this.level = e.level;
    data = _.pick(this.level.attributes, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema = _.cloneDeep(Level.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    schema.required = _.intersection(schema.required, this.editableSettings);
    schema["default"] = _.pick(schema["default"], (function(_this) {
      return function(value, key) {
        return indexOf.call(_this.editableSettings, key) >= 0;
      };
    })(this));
    this.thangIDs = this.getThangIDs();
    treemaOptions = {
      filePath: "db/level/" + (this.level.get('original')),
      supermodel: this.supermodel,
      schema: schema,
      data: data,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.onSettingsChanged
      },
      thangIDs: this.thangIDs,
      nodeClasses: {
        object: SettingsNode,
        thang: nodes.ThangNode,
        'solution-gear': SolutionGearNode,
        'solution-stats': SolutionStatsNode,
        concept: ConceptNode,
        'concepts-list': ConceptsListNode
      },
      solutions: this.level.getSolutions()
    };
    this.settingsTreema = this.$el.find('#settings-treema').treema(treemaOptions);
    this.settingsTreema.build();
    this.settingsTreema.open();
    return this.lastTerrain = data.terrain;
  };

  SettingsTabView.prototype.getThangIDs = function() {
    var i, len, ref, ref1, results, t;
    ref1 = (ref = this.level.get('thangs')) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      t = ref1[i];
      results.push(t.id);
    }
    return results;
  };

  SettingsTabView.prototype.onSettingsChanged = function(e) {
    var goal, goalID, goalIndex, i, index, j, key, len, len1, ref, ref1, ref2, results, terrain;
    $('.level-title').text(this.settingsTreema.data.name);
    ref = this.editableSettings;
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      this.level.set(key, this.settingsTreema.data[key]);
    }
    if ((terrain = this.settingsTreema.data.terrain) !== this.lastTerrain) {
      this.lastTerrain = terrain;
      Backbone.Mediator.publish('editor:terrain-changed', {
        terrain: terrain
      });
    }
    ref2 = (ref1 = this.settingsTreema.data.goals) != null ? ref1 : [];
    results = [];
    for (index = j = 0, len1 = ref2.length; j < len1; index = ++j) {
      goal = ref2[index];
      if (goal.id) {
        continue;
      }
      goalIndex = index;
      goalID = "goal-" + goalIndex;
      while (_.find(this.settingsTreema.get("goals"), {
          id: goalID
        })) {
        goalID = "goal-" + (++goalIndex);
      }
      this.settingsTreema.disableTracking();
      this.settingsTreema.set("/goals/" + index + "/id", goalID);
      this.settingsTreema.set("/goals/" + index + "/name", _.string.humanize(goalID));
      results.push(this.settingsTreema.enableTracking());
    }
    return results;
  };

  SettingsTabView.prototype.onThangsEdited = function(e) {
    var ref;
    if ((ref = this.thangIDs) != null) {
      ref.splice.apply(ref, [0, this.thangIDs.length].concat(slice.call(this.getThangIDs())));
    }
    return this.settingsTreema.solutions = this.level.getSolutions();
  };

  SettingsTabView.prototype.onRandomTerrainGenerated = function(e) {
    return this.settingsTreema.set('/terrain', e.terrain);
  };

  SettingsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.settingsTreema) != null) {
      ref.destroy();
    }
    return SettingsTabView.__super__.destroy.call(this);
  };

  return SettingsTabView;

})(CocoView);

SettingsNode = (function(superClass) {
  extend(SettingsNode, superClass);

  function SettingsNode() {
    return SettingsNode.__super__.constructor.apply(this, arguments);
  }

  SettingsNode.prototype.nodeDescription = 'Settings';

  return SettingsNode;

})(TreemaObjectNode);

SolutionGearNode = (function(superClass) {
  extend(SolutionGearNode, superClass);

  function SolutionGearNode() {
    return SolutionGearNode.__super__.constructor.apply(this, arguments);
  }

  SolutionGearNode.prototype.select = function() {
    var button, description, i, len, match, prop, propertiesUsed, ref, ref1, solution;
    SolutionGearNode.__super__.select.call(this);
    if (!(solution = _.find(this.getRoot().solutions, {
      succeeds: true,
      language: 'javascript'
    }))) {
      return;
    }
    propertiesUsed = [];
    ref1 = ((ref = solution.source) != null ? ref : '').match(/hero\.([a-z][A-Za-z0-9]*)/g);
    for (i = 0, len = ref1.length; i < len; i++) {
      match = ref1[i];
      prop = match.split('.')[1];
      if (indexOf.call(propertiesUsed, prop) < 0) {
        propertiesUsed.push(prop);
      }
    }
    if (!propertiesUsed.length) {
      return;
    }
    if (_.isEqual(this.data, propertiesUsed)) {
      this.$el.find('.treema-description').html('Solution uses exactly these required properties.');
      return;
    }
    description = 'Solution used properties: ' + [
      (function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = propertiesUsed.length; j < len1; j++) {
          prop = propertiesUsed[j];
          results.push("<code>" + prop + "</code>");
        }
        return results;
      })()
    ].join(' ');
    button = $('<button class="btn btn-sm">Use</button>');
    $(button).on('click', (function(_this) {
      return function() {
        _this.set('', propertiesUsed);
        return _.defer(function() {
          _this.open();
          return _this.select();
        });
      };
    })(this));
    return this.$el.find('.treema-description').html(description).append(button);
  };

  return SolutionGearNode;

})(TreemaArrayNode);

SolutionStatsNode = (function(superClass) {
  extend(SolutionStatsNode, superClass);

  function SolutionStatsNode() {
    return SolutionStatsNode.__super__.constructor.apply(this, arguments);
  }

  SolutionStatsNode.prototype.select = function() {
    var solution;
    SolutionStatsNode.__super__.select.call(this);
    if (!(solution = _.find(this.getRoot().solutions, {
      succeeds: true,
      language: 'javascript'
    }))) {
      return;
    }
    return ThangType.calculateStatsForHeroConfig(solution.heroConfig, (function(_this) {
      return function(stats) {
        var button, description, key, val;
        for (key in stats) {
          val = stats[key];
          if (parseInt(val) !== val) {
            stats[key] = val.toFixed(2);
          }
        }
        description = "Solution had stats: <code>" + (JSON.stringify(stats)) + "</code>";
        button = $('<button class="btn btn-sm">Use health</button>');
        $(button).on('click', function() {
          _this.set('', stats.health);
          return _.defer(function() {
            _this.open();
            return _this.select();
          });
        });
        return _this.$el.find('.treema-description').html(description).append(button);
      };
    })(this));
  };

  return SolutionStatsNode;

})(TreemaNode.nodeMap.number);

ConceptNode = (function(superClass) {
  extend(ConceptNode, superClass);

  function ConceptNode() {
    return ConceptNode.__super__.constructor.apply(this, arguments);
  }

  ConceptNode.prototype.buildValueForDisplay = function(valEl, data) {
    var concept, description;
    ConceptNode.__super__.buildValueForDisplay.call(this, valEl, data);
    if (!data) {
      return;
    }
    if (!(concept = _.find(concepts, {
      concept: this.data
    }))) {
      return console.error("Couldn't find concept " + this.data);
    }
    description = concept.name + " -- " + concept.description;
    if (concept.deprecated) {
      description = description + " (Deprecated)";
    }
    if (concept.automatic) {
      description = "AUTO | " + description;
    }
    this.$el.find('.treema-row').css('float', 'left');
    if (concept.automatic) {
      this.$el.addClass('concept-automatic');
    }
    if (concept.deprecated) {
      this.$el.addClass('concept-deprecated');
    }
    this.$el.find('.treema-description').remove();
    return this.$el.append($("<span class='treema-description'>" + description + "</span>").show());
  };

  ConceptNode.prototype.limitChoices = function(options) {
    var o;
    if (this.parent.keyForParent === 'concepts') {
      options = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          o = options[i];
          if (_.find(concepts, function(c) {
            return c.concept === o && !c.automatic && !c.deprecated;
          })) {
            results.push(o);
          }
        }
        return results;
      })();
    } else {
      options = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = options.length; i < len; i++) {
          o = options[i];
          if (_.find(concepts, function(c) {
            return c.concept === o && !c.deprecated;
          })) {
            results.push(o);
          }
        }
        return results;
      })();
    }
    return ConceptNode.__super__.limitChoices.call(this, options);
  };

  ConceptNode.prototype.onClick = function(e) {
    if (this.$el.hasClass('concept-automatic')) {
      return;
    }
    return ConceptNode.__super__.onClick.call(this, e);
  };

  return ConceptNode;

})(TreemaNode.nodeMap.string);

ConceptsListNode = (function(superClass) {
  extend(ConceptsListNode, superClass);

  function ConceptsListNode() {
    return ConceptsListNode.__super__.constructor.apply(this, arguments);
  }

  ConceptsListNode.prototype.sort = true;

  ConceptsListNode.prototype.sortFunction = function(a, b) {
    var aAutomatic, bAutomatic;
    aAutomatic = _.find(concepts, function(c) {
      return c.concept === a && c.automatic;
    });
    bAutomatic = _.find(concepts, function(c) {
      return c.concept === b && c.automatic;
    });
    if (bAutomatic && !aAutomatic) {
      return 1;
    }
    if (aAutomatic && !bAutomatic) {
      return -1;
    }
    if (!aAutomatic && !bAutomatic) {
      return 0;
    }
    return ConceptsListNode.__super__.sortFunction.call(this, a, b);
  };

  return ConceptsListNode;

})(TreemaNode.nodeMap.array);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/settings/SettingsTabView.js.map