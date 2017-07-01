require.register("views/editor/level/scripts/ScriptsTabView", function(exports, require, module) {
var ChannelNode, CocoView, EventPrereqNode, EventPrereqsNode, EventPropsNode, Level, PropertiesNode, ScriptNode, ScriptsNode, ScriptsTabView, Surface, defaultScripts, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/scripts_tab');

Level = require('models/Level');

Surface = require('lib/surface/Surface');

nodes = require('./../treema_nodes');

defaultScripts = require('lib/DefaultScripts');

require('vendor/treema');

module.exports = ScriptsTabView = (function(superClass) {
  extend(ScriptsTabView, superClass);

  ScriptsTabView.prototype.id = 'editor-level-scripts-tab-view';

  ScriptsTabView.prototype.template = template;

  ScriptsTabView.prototype.className = 'tab-pane';

  ScriptsTabView.prototype.subscriptions = {
    'editor:level-loaded': 'onLevelLoaded',
    'editor:thangs-edited': 'onThangsEdited'
  };

  function ScriptsTabView(options) {
    this.onWindowResize = bind(this.onWindowResize, this);
    this.onScriptChanged = bind(this.onScriptChanged, this);
    this.onScriptDeleted = bind(this.onScriptDeleted, this);
    this.onNewScriptAdded = bind(this.onNewScriptAdded, this);
    this.onScriptSelected = bind(this.onScriptSelected, this);
    this.onScriptsChanged = bind(this.onScriptsChanged, this);
    ScriptsTabView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.files = options.files;
    $(window).on('resize', this.onWindowResize);
  }

  ScriptsTabView.prototype.destroy = function() {
    var ref, ref1;
    if ((ref = this.scriptTreema) != null) {
      ref.destroy();
    }
    if ((ref1 = this.scriptTreemas) != null) {
      ref1.destroy();
    }
    $(window).off('resize', this.onWindowResize);
    return ScriptsTabView.__super__.destroy.call(this);
  };

  ScriptsTabView.prototype.onLoaded = function() {};

  ScriptsTabView.prototype.onLevelLoaded = function(e) {
    var ref, scripts, treemaOptions;
    this.level = e.level;
    this.dimensions = this.level.dimensions();
    scripts = $.extend(true, [], (ref = this.level.get('scripts')) != null ? ref : []);
    if (scripts.length === 0) {
      scripts = $.extend(true, [], defaultScripts);
    }
    treemaOptions = {
      schema: Level.schema.properties.scripts,
      data: scripts,
      callbacks: {
        change: this.onScriptsChanged,
        select: this.onScriptSelected,
        addChild: this.onNewScriptAdded,
        removeChild: this.onScriptDeleted
      },
      nodeClasses: {
        array: ScriptsNode,
        object: ScriptNode
      },
      view: this
    };
    this.scriptsTreema = this.$el.find('#scripts-treema').treema(treemaOptions);
    this.scriptsTreema.build();
    if (this.scriptsTreema.childrenTreemas[0] != null) {
      this.scriptsTreema.childrenTreemas[0].select();
      return this.scriptsTreema.childrenTreemas[0].broadcastChanges();
    }
  };

  ScriptsTabView.prototype.onScriptsChanged = function(e) {
    return this.level.set('scripts', this.scriptsTreema.data);
  };

  ScriptsTabView.prototype.onScriptSelected = function(e, selected) {
    var newPath, ref, ref1, treemaOptions;
    selected = selected.length > 1 ? selected[0].getLastSelectedTreema() : selected[0];
    if (!selected) {
      this.$el.find('#script-treema').replaceWith($('<div id="script-treema"></div>'));
      this.selectedScriptPath = null;
      return;
    }
    this.thangIDs = this.getThangIDs();
    treemaOptions = {
      world: this.world,
      filePath: "db/level/" + (this.level.get('original')),
      files: this.files,
      view: this,
      schema: Level.schema.properties.scripts.items,
      data: selected.data,
      thangIDs: this.thangIDs,
      dimensions: this.dimensions,
      supermodel: this.supermodel,
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.onScriptChanged
      },
      nodeClasses: {
        object: PropertiesNode,
        'event-value-chain': EventPropsNode,
        'event-prereqs': EventPrereqsNode,
        'event-prereq': EventPrereqNode,
        'event-channel': ChannelNode,
        'thang': nodes.ThangNode,
        'milliseconds': nodes.MillisecondsNode,
        'seconds': nodes.SecondsNode,
        'point2d': nodes.WorldPointNode,
        'viewport': nodes.WorldViewportNode,
        'bounds': nodes.WorldBoundsNode
      }
    };
    newPath = selected.getPath();
    if (newPath === this.selectedScriptPath) {
      return;
    }
    this.scriptTreema = this.$el.find('#script-treema').treema(treemaOptions);
    this.scriptTreema.build();
    if ((ref = this.scriptTreema.childrenTreemas) != null) {
      if ((ref1 = ref.noteChain) != null) {
        ref1.open(5);
      }
    }
    return this.selectedScriptPath = newPath;
  };

  ScriptsTabView.prototype.getThangIDs = function() {
    var i, len, ref, ref1, results, t;
    ref1 = (ref = this.level.get('thangs')) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      t = ref1[i];
      results.push(t.id);
    }
    return results;
  };

  ScriptsTabView.prototype.onNewScriptAdded = function(scriptNode) {
    if (!scriptNode) {
      return;
    }
    if (scriptNode.data.id === void 0) {
      scriptNode.disableTracking();
      scriptNode.set('/id', 'Script-' + this.scriptsTreema.data.length);
      return scriptNode.enableTracking();
    }
  };

  ScriptsTabView.prototype.onScriptDeleted = function() {
    var existingKey, key, ref, results, treema;
    ref = this.scriptsTreema.childrenTreemas;
    results = [];
    for (key in ref) {
      treema = ref[key];
      key = parseInt(key);
      treema.disableTracking();
      if (/Script-[0-9]*/.test(treema.data.id)) {
        existingKey = parseInt(treema.data.id.substr(7));
        if (existingKey !== key + 1) {
          treema.set('id', 'Script-' + (key + 1));
        }
      }
      results.push(treema.enableTracking());
    }
    return results;
  };

  ScriptsTabView.prototype.onScriptChanged = function() {
    if (!this.selectedScriptPath) {
      return;
    }
    return this.scriptsTreema.set(this.selectedScriptPath, this.scriptTreema.data);
  };

  ScriptsTabView.prototype.onThangsEdited = function(e) {
    var ref;
    return (ref = this.thangIDs) != null ? ref.splice.apply(ref, [0, this.thangIDs.length].concat(slice.call(this.getThangIDs()))) : void 0;
  };

  ScriptsTabView.prototype.onWindowResize = function(e) {
    if ($('body').width() > 800) {
      return this.$el.find('#scripts-treema').collapse('show');
    }
  };

  return ScriptsTabView;

})(CocoView);

ScriptsNode = (function(superClass) {
  extend(ScriptsNode, superClass);

  function ScriptsNode() {
    return ScriptsNode.__super__.constructor.apply(this, arguments);
  }

  ScriptsNode.prototype.nodeDescription = 'Script';

  ScriptsNode.prototype.addNewChild = function() {
    var newTreema;
    newTreema = ScriptsNode.__super__.addNewChild.call(this);
    if (this.callbacks.addChild) {
      this.callbacks.addChild(newTreema);
    }
    return newTreema;
  };

  return ScriptsNode;

})(TreemaArrayNode);

ScriptNode = (function(superClass) {
  extend(ScriptNode, superClass);

  function ScriptNode() {
    return ScriptNode.__super__.constructor.apply(this, arguments);
  }

  ScriptNode.prototype.valueClass = 'treema-script';

  ScriptNode.prototype.collection = false;

  ScriptNode.prototype.buildValueForDisplay = function(valEl, data) {
    var s, val;
    val = data.id || data.channel;
    s = "" + val;
    return this.buildValueForDisplaySimply(valEl, s);
  };

  ScriptNode.prototype.onTabPressed = function(e) {
    this.tabToCurrentScript();
    return e.preventDefault();
  };

  ScriptNode.prototype.onDeletePressed = function(e) {
    var returnVal;
    returnVal = ScriptNode.__super__.onDeletePressed.call(this, e);
    if (this.callbacks.removeChild) {
      this.callbacks.removeChild();
    }
    return returnVal;
  };

  ScriptNode.prototype.onRightArrowPressed = function() {
    return this.tabToCurrentScript();
  };

  ScriptNode.prototype.tabToCurrentScript = function() {
    var firstRow, ref, ref1;
    if ((ref = this.settings.view.scriptTreema) != null) {
      ref.keepFocus();
    }
    firstRow = (ref1 = this.settings.view.scriptTreema) != null ? ref1.$el.find('.treema-node:visible').data('instance') : void 0;
    if (firstRow == null) {
      return;
    }
    return firstRow.select();
  };

  return ScriptNode;

})(TreemaObjectNode);

PropertiesNode = (function(superClass) {
  extend(PropertiesNode, superClass);

  function PropertiesNode() {
    return PropertiesNode.__super__.constructor.apply(this, arguments);
  }

  PropertiesNode.prototype.nodeDescription = 'Script Property';

  return PropertiesNode;

})(TreemaObjectNode);

EventPropsNode = (function(superClass) {
  extend(EventPropsNode, superClass);

  function EventPropsNode() {
    return EventPropsNode.__super__.constructor.apply(this, arguments);
  }

  EventPropsNode.prototype.valueClass = 'treema-event-props';

  EventPropsNode.prototype.arrayToString = function() {
    return (this.getData() || []).join('.');
  };

  EventPropsNode.prototype.buildValueForDisplay = function(valEl, data) {
    var joined;
    joined = this.arrayToString();
    if (!joined.length) {
      joined = '(unset)';
    }
    return this.buildValueForDisplaySimply(valEl, joined);
  };

  EventPropsNode.prototype.buildValueForEditing = function(valEl, data) {
    var autocompleteValues, channel, channelSchema, key, ref, val;
    EventPropsNode.__super__.buildValueForEditing.call(this, valEl, data);
    channel = this.getRoot().data.channel;
    channelSchema = Backbone.Mediator.channelSchemas[channel];
    autocompleteValues = [];
    ref = channelSchema != null ? channelSchema.properties : void 0;
    for (key in ref) {
      val = ref[key];
      autocompleteValues.push(key);
    }
    valEl.find('input').autocomplete({
      source: autocompleteValues,
      minLength: 0,
      delay: 0,
      autoFocus: true
    }).autocomplete('search');
    return valEl;
  };

  EventPropsNode.prototype.saveChanges = function(valEl) {
    var s;
    return this.data = (function() {
      var i, len, ref, results;
      ref = $('input', valEl).val().split('.');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.length) {
          results.push(s);
        }
      }
      return results;
    })();
  };

  return EventPropsNode;

})(TreemaNode.nodeMap.string);

EventPrereqsNode = (function(superClass) {
  extend(EventPrereqsNode, superClass);

  function EventPrereqsNode() {
    return EventPrereqsNode.__super__.constructor.apply(this, arguments);
  }

  EventPrereqsNode.prototype.open = function(depth) {
    if (depth == null) {
      depth = 2;
    }
    return EventPrereqsNode.__super__.open.call(this, depth);
  };

  EventPrereqsNode.prototype.addNewChild = function() {
    var newTreema, ref;
    newTreema = EventPrereqsNode.__super__.addNewChild.call(this, arguments);
    if (newTreema == null) {
      return;
    }
    newTreema.open();
    return (ref = newTreema.childrenTreemas.eventProps) != null ? ref.edit() : void 0;
  };

  return EventPrereqsNode;

})(TreemaNode.nodeMap.array);

EventPrereqNode = (function(superClass) {
  extend(EventPrereqNode, superClass);

  function EventPrereqNode() {
    return EventPrereqNode.__super__.constructor.apply(this, arguments);
  }

  EventPrereqNode.prototype.buildValueForDisplay = function(valEl, data) {
    var comparison, eventProp, key, s, statements, value;
    eventProp = (data.eventProps || []).join('.');
    if (!eventProp.length) {
      eventProp = '(unset)';
    }
    statements = [];
    for (key in data) {
      value = data[key];
      if (key === 'eventProps') {
        continue;
      }
      comparison = this.workingSchema.properties[key].title;
      value = value.toString();
      statements.push(comparison + " " + value);
    }
    statements = statements.join(', ');
    s = eventProp + " " + statements;
    return this.buildValueForDisplaySimply(valEl, s);
  };

  return EventPrereqNode;

})(TreemaNode.nodeMap.object);

ChannelNode = (function(superClass) {
  extend(ChannelNode, superClass);

  function ChannelNode() {
    return ChannelNode.__super__.constructor.apply(this, arguments);
  }

  ChannelNode.prototype.buildValueForEditing = function(valEl, data) {
    var autocompleteValues, key, val;
    ChannelNode.__super__.buildValueForEditing.call(this, valEl, data);
    autocompleteValues = (function() {
      var ref, results;
      ref = Backbone.Mediator.channelSchemas;
      results = [];
      for (key in ref) {
        val = ref[key];
        results.push({
          label: (val != null ? val.title : void 0) || key,
          value: key
        });
      }
      return results;
    })();
    valEl.find('input').autocomplete({
      source: autocompleteValues,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return ChannelNode;

})(TreemaNode.nodeMap.string);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/scripts/ScriptsTabView.js.map