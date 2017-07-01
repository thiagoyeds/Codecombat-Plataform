require.register("views/editor/level/treema_nodes", function(exports, require, module) {
var AccelerationNode, CocoCollection, ItemThangTypeNode, KilogramsNode, LevelComponent, MetersNode, MillisecondsNode, RadiansNode, SecondsNode, SpeedNode, SuperteamNode, TeamNode, ThangNode, ThangType, ThangTypeNode, WIDTH, WorldBoundsNode, WorldPointNode, WorldRegionNode, WorldSelectModal, WorldViewportNode, makeButton, shorten,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

WorldSelectModal = require('./modals/WorldSelectModal');

ThangType = require('/models/ThangType');

LevelComponent = require('models/LevelComponent');

CocoCollection = require('collections/CocoCollection');

require('vendor/treema');

makeButton = function() {
  return $('<a class="btn btn-primary btn-xs treema-map-button"><span class="glyphicon glyphicon-screenshot"></span></a>');
};

shorten = function(f) {
  return parseFloat(f.toFixed(1));
};

WIDTH = 924;

module.exports.WorldPointNode = WorldPointNode = (function(superClass) {
  extend(WorldPointNode, superClass);

  function WorldPointNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldPointNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Point Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Point Treema node needs a RootView included in the settings.');
    }
  }

  WorldPointNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldPointNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldPointNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldPointNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldPointNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldPointNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldPointNode.prototype.openMap = function() {
    var modal;
    modal = new WorldSelectModal({
      world: this.settings.world,
      dataType: 'point',
      "default": this.getData(),
      supermodel: this.settings.supermodel
    });
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldPointNode.prototype.callback = function(e) {
    if ((e != null ? e.point : void 0) == null) {
      return;
    }
    this.data.x = shorten(e.point.x);
    this.data.y = shorten(e.point.y);
    return this.refreshDisplay();
  };

  return WorldPointNode;

})(TreemaNode.nodeMap.point2d);

WorldRegionNode = (function(superClass) {
  extend(WorldRegionNode, superClass);

  function WorldRegionNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldRegionNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Region Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Region Treema node needs a RootView included in the settings.');
    }
  }

  WorldRegionNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldRegionNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldRegionNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldRegionNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldRegionNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldRegionNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldRegionNode.prototype.openMap = function() {
    var modal;
    modal = new WorldSelectModal({
      world: this.settings.world,
      dataType: 'region',
      "default": this.createWorldBounds(),
      supermodel: this.settings.supermodel
    });
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldRegionNode.prototype.callback = function(e) {
    var x, y;
    x = Math.min(e.points[0].x, e.points[1].x);
    y = Math.min(e.points[0].y, e.points[1].y);
    this.data.pos = {
      x: x,
      y: y,
      z: 0
    };
    this.data.width = Math.abs(e.points[0].x - e.points[1].x);
    this.data.height = Math.min(e.points[0].y - e.points[1].y);
    return this.refreshDisplay();
  };

  WorldRegionNode.prototype.createWorldBounds = function() {};

  return WorldRegionNode;

})(TreemaNode.nodeMap.object);

module.exports.WorldViewportNode = WorldViewportNode = (function(superClass) {
  extend(WorldViewportNode, superClass);

  function WorldViewportNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldViewportNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Viewport Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Viewport Treema node needs a RootView included in the settings.');
    }
  }

  WorldViewportNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldViewportNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldViewportNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldViewportNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldViewportNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldViewportNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldViewportNode.prototype.openMap = function() {
    var data, modal, options, ref;
    options = {
      world: this.settings.world,
      dataType: 'ratio-region'
    };
    data = this.getData();
    if ((data != null ? (ref = data.target) != null ? ref.x : void 0 : void 0) != null) {
      options.defaultFromZoom = data;
    }
    options.supermodel = this.settings.supermodel;
    modal = new WorldSelectModal(options);
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldViewportNode.prototype.callback = function(e) {
    var bounds, target;
    if (!e) {
      return;
    }
    target = {
      x: shorten((e.points[0].x + e.points[1].x) / 2),
      y: shorten((e.points[0].y + e.points[1].y) / 2)
    };
    this.set('target', target);
    bounds = e.camera.normalizeBounds(e.points);
    this.set('zoom', shorten(WIDTH / bounds.width));
    return this.refreshDisplay();
  };

  return WorldViewportNode;

})(TreemaNode.nodeMap.object);

module.exports.WorldBoundsNode = WorldBoundsNode = (function(superClass) {
  extend(WorldBoundsNode, superClass);

  WorldBoundsNode.prototype.dataType = 'region';

  function WorldBoundsNode() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.callback = bind(this.callback, this);
    WorldBoundsNode.__super__.constructor.apply(this, args);
    if (this.settings.world == null) {
      console.error('Bounds Treema node needs a World included in the settings.');
    }
    if (this.settings.view == null) {
      console.error('Bounds Treema node needs a RootView included in the settings.');
    }
  }

  WorldBoundsNode.prototype.buildValueForDisplay = function(valEl, data) {
    WorldBoundsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldBoundsNode.prototype.buildValueForEditing = function(valEl, data) {
    WorldBoundsNode.__super__.buildValueForEditing.call(this, valEl, data);
    return valEl.find('.treema-shortened').prepend(makeButton());
  };

  WorldBoundsNode.prototype.onClick = function(e) {
    var btn;
    btn = $(e.target).closest('.treema-map-button');
    if (btn.length) {
      return this.openMap();
    } else {
      return WorldBoundsNode.__super__.onClick.apply(this, arguments);
    }
  };

  WorldBoundsNode.prototype.openMap = function() {
    var bounds, modal;
    bounds = this.getData() || [
      {
        x: 0,
        y: 0
      }, {
        x: 100,
        y: 80
      }
    ];
    modal = new WorldSelectModal({
      world: this.settings.world,
      dataType: 'region',
      "default": bounds,
      supermodel: this.settings.supermodel
    });
    modal.callback = this.callback;
    return this.settings.view.openModalView(modal);
  };

  WorldBoundsNode.prototype.callback = function(e) {
    if (!e) {
      return;
    }
    this.set('/0', {
      x: shorten(e.points[0].x),
      y: shorten(e.points[0].y)
    });
    return this.set('/1', {
      x: shorten(e.points[1].x),
      y: shorten(e.points[1].y)
    });
  };

  return WorldBoundsNode;

})(TreemaNode.nodeMap.array);

module.exports.ThangNode = ThangNode = (function(superClass) {
  extend(ThangNode, superClass);

  function ThangNode() {
    return ThangNode.__super__.constructor.apply(this, arguments);
  }

  ThangNode.prototype.buildValueForDisplay = function(valEl, data) {
    ThangNode.__super__.buildValueForDisplay.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: this.settings.thangIDs,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return ThangNode;

})(TreemaNode.nodeMap.string);

module.exports.TeamNode = TeamNode = (function(superClass) {
  extend(TeamNode, superClass);

  function TeamNode() {
    return TeamNode.__super__.constructor.apply(this, arguments);
  }

  TeamNode.prototype.buildValueForDisplay = function(valEl, data) {
    TeamNode.__super__.buildValueForDisplay.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: this.settings.teams,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return TeamNode;

})(TreemaNode.nodeMap.string);

module.exports.SuperteamNode = SuperteamNode = (function(superClass) {
  extend(SuperteamNode, superClass);

  function SuperteamNode() {
    return SuperteamNode.__super__.constructor.apply(this, arguments);
  }

  SuperteamNode.prototype.buildValueForEditing = function(valEl, data) {
    SuperteamNode.__super__.buildValueForEditing.call(this, valEl, data);
    valEl.find('input').autocomplete({
      source: this.settings.superteams,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    return valEl;
  };

  return SuperteamNode;

})(TreemaNode.nodeMap.string);

module.exports.RadiansNode = RadiansNode = (function(superClass) {
  extend(RadiansNode, superClass);

  function RadiansNode() {
    return RadiansNode.__super__.constructor.apply(this, arguments);
  }

  RadiansNode.prototype.buildValueForDisplay = function(valEl, data) {
    var deg;
    RadiansNode.__super__.buildValueForDisplay.call(this, valEl, data);
    deg = data / Math.PI * 180;
    return valEl.text(valEl.text() + ("rad (" + (deg.toFixed(0)) + "˚)"));
  };

  return RadiansNode;

})(TreemaNode.nodeMap.number);

module.exports.MetersNode = MetersNode = (function(superClass) {
  extend(MetersNode, superClass);

  function MetersNode() {
    return MetersNode.__super__.constructor.apply(this, arguments);
  }

  MetersNode.prototype.buildValueForDisplay = function(valEl, data) {
    MetersNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'm');
  };

  return MetersNode;

})(TreemaNode.nodeMap.number);

module.exports.KilogramsNode = KilogramsNode = (function(superClass) {
  extend(KilogramsNode, superClass);

  function KilogramsNode() {
    return KilogramsNode.__super__.constructor.apply(this, arguments);
  }

  KilogramsNode.prototype.buildValueForDisplay = function(valEl, data) {
    KilogramsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'kg');
  };

  return KilogramsNode;

})(TreemaNode.nodeMap.number);

module.exports.SecondsNode = SecondsNode = (function(superClass) {
  extend(SecondsNode, superClass);

  function SecondsNode() {
    return SecondsNode.__super__.constructor.apply(this, arguments);
  }

  SecondsNode.prototype.buildValueForDisplay = function(valEl, data) {
    SecondsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 's');
  };

  return SecondsNode;

})(TreemaNode.nodeMap.number);

module.exports.MillisecondsNode = MillisecondsNode = (function(superClass) {
  extend(MillisecondsNode, superClass);

  function MillisecondsNode() {
    return MillisecondsNode.__super__.constructor.apply(this, arguments);
  }

  MillisecondsNode.prototype.buildValueForDisplay = function(valEl, data) {
    MillisecondsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'ms');
  };

  return MillisecondsNode;

})(TreemaNode.nodeMap.number);

module.exports.SpeedNode = SpeedNode = (function(superClass) {
  extend(SpeedNode, superClass);

  function SpeedNode() {
    return SpeedNode.__super__.constructor.apply(this, arguments);
  }

  SpeedNode.prototype.buildValueForDisplay = function(valEl, data) {
    SpeedNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'm/s');
  };

  return SpeedNode;

})(TreemaNode.nodeMap.number);

module.exports.AccelerationNode = AccelerationNode = (function(superClass) {
  extend(AccelerationNode, superClass);

  function AccelerationNode() {
    return AccelerationNode.__super__.constructor.apply(this, arguments);
  }

  AccelerationNode.prototype.buildValueForDisplay = function(valEl, data) {
    AccelerationNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return valEl.text(valEl.text() + 'm/s^2');
  };

  return AccelerationNode;

})(TreemaNode.nodeMap.number);

module.exports.ThangTypeNode = ThangTypeNode = (function(superClass) {
  extend(ThangTypeNode, superClass);

  ThangTypeNode.prototype.valueClass = 'treema-thang-type';

  ThangTypeNode.thangTypes = null;

  ThangTypeNode.thangTypesCollection = null;

  function ThangTypeNode() {
    var args, data;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ThangTypeNode.__super__.constructor.apply(this, args);
    data = this.getData();
    this.thangType = _.find(this.settings.supermodel.getModels(ThangType), (function(_this) {
      return function(m) {
        if (data) {
          return m.get('original') === data;
        }
      };
    })(this));
  }

  ThangTypeNode.prototype.buildValueForDisplay = function(valEl) {
    var ref;
    return this.buildValueForDisplaySimply(valEl, ((ref = this.thangType) != null ? ref.get('name') : void 0) || 'None');
  };

  ThangTypeNode.prototype.buildValueForEditing = function(valEl, data) {
    var input, m, ref, thangTypeNames;
    ThangTypeNode.__super__.buildValueForEditing.call(this, valEl, data);
    thangTypeNames = (function() {
      var i, len, ref, results;
      ref = this.settings.supermodel.getModels(ThangType);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        results.push(m.get('name'));
      }
      return results;
    }).call(this);
    input = valEl.find('input').autocomplete({
      source: thangTypeNames,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    input.val(((ref = this.thangType) != null ? ref.get('name') : void 0) || 'None');
    return valEl;
  };

  ThangTypeNode.prototype.saveChanges = function() {
    var thangTypeName;
    thangTypeName = this.$el.find('input').val();
    this.thangType = _.find(this.settings.supermodel.getModels(ThangType), function(m) {
      return m.get('name') === thangTypeName;
    });
    if (this.thangType) {
      return this.data = this.thangType.get('original');
    } else {
      return this.data = null;
    }
  };

  return ThangTypeNode;

})(TreemaNode.nodeMap.string);

module.exports.ThangTypeNode = ThangTypeNode = ThangTypeNode = (function(superClass) {
  extend(ThangTypeNode, superClass);

  ThangTypeNode.prototype.valueClass = 'treema-thang-type';

  ThangTypeNode.thangTypesCollection = null;

  ThangTypeNode.thangTypes = null;

  function ThangTypeNode() {
    var f;
    ThangTypeNode.__super__.constructor.apply(this, arguments);
    this.getThangTypes();
    if (!ThangTypeNode.thangTypesCollection.loaded) {
      f = function() {
        if (!this.isEditing()) {
          this.refreshDisplay();
        }
        return this.getThangTypes();
      };
      ThangTypeNode.thangTypesCollection.once('sync', f, this);
    }
  }

  ThangTypeNode.prototype.buildValueForDisplay = function(valEl, data) {
    this.buildValueForDisplaySimply(valEl, this.getCurrentThangType() || '');
    return valEl;
  };

  ThangTypeNode.prototype.buildValueForEditing = function(valEl, data) {
    var input, source;
    ThangTypeNode.__super__.buildValueForEditing.call(this, valEl, data);
    input = valEl.find('input');
    source = (function(_this) {
      return function(req, res) {
        var term, thangType;
        term = req.term;
        term = term.toLowerCase();
        if (!_this.constructor.thangTypes) {
          return res([]);
        }
        return res((function() {
          var i, len, ref, results;
          ref = this.constructor.thangTypes;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            thangType = ref[i];
            if (_.string.contains(thangType.name.toLowerCase(), term)) {
              results.push(thangType.name);
            }
          }
          return results;
        }).call(_this));
      };
    })(this);
    input.autocomplete({
      source: source,
      minLength: 0,
      delay: 0,
      autoFocus: true
    });
    input.val(this.getCurrentThangType() || '');
    return valEl;
  };

  ThangTypeNode.prototype.filterThangType = function(thangType) {
    return true;
  };

  ThangTypeNode.prototype.getCurrentThangType = function() {
    var original, thangType;
    if (!this.constructor.thangTypes) {
      return null;
    }
    if (!(original = this.getData())) {
      return null;
    }
    thangType = _.find(this.constructor.thangTypes, {
      original: original
    });
    return (thangType != null ? thangType.name : void 0) || '...';
  };

  ThangTypeNode.prototype.getThangTypes = function() {
    var res;
    if (ThangTypeNode.thangTypesCollection) {
      if (!this.constructor.thangTypes) {
        this.processThangTypes(ThangTypeNode.thangTypesCollection);
      }
      return;
    }
    ThangTypeNode.thangTypesCollection = new CocoCollection([], {
      url: '/db/thang.type',
      project: ['name', 'components', 'original'],
      model: ThangType
    });
    res = ThangTypeNode.thangTypesCollection.fetch();
    return ThangTypeNode.thangTypesCollection.once('sync', (function(_this) {
      return function() {
        return _this.processThangTypes(ThangTypeNode.thangTypesCollection);
      };
    })(this));
  };

  ThangTypeNode.prototype.processThangTypes = function(thangTypeCollection) {
    var i, len, ref, results, thangType;
    this.constructor.thangTypes = [];
    ref = thangTypeCollection.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      thangType = ref[i];
      results.push(this.processThangType(thangType));
    }
    return results;
  };

  ThangTypeNode.prototype.processThangType = function(thangType) {
    return this.constructor.thangTypes.push({
      name: thangType.get('name'),
      original: thangType.get('original')
    });
  };

  ThangTypeNode.prototype.saveChanges = function() {
    var thangType, thangTypeName;
    thangTypeName = this.$el.find('input').val();
    thangType = _.find(this.constructor.thangTypes, {
      name: thangTypeName
    });
    if (!thangType) {
      return this.remove();
    }
    return this.data = thangType.original;
  };

  return ThangTypeNode;

})(TreemaNode.nodeMap.string);

module.exports.ItemThangTypeNode = ItemThangTypeNode = ItemThangTypeNode = (function(superClass) {
  extend(ItemThangTypeNode, superClass);

  function ItemThangTypeNode() {
    return ItemThangTypeNode.__super__.constructor.apply(this, arguments);
  }

  ItemThangTypeNode.prototype.valueClass = 'treema-item-thang-type';

  ItemThangTypeNode.prototype.filterThangType = function(thangType) {
    var ref;
    return ref = this.keyForParent, indexOf.call(thangType.slots, ref) >= 0;
  };

  ItemThangTypeNode.prototype.processThangType = function(thangType) {
    var itemComponent, ref, ref1;
    if (!(itemComponent = _.find(thangType.get('components'), {
      original: LevelComponent.ItemID
    }))) {
      return;
    }
    return this.constructor.thangTypes.push({
      name: thangType.get('name'),
      original: thangType.get('original'),
      slots: (ref = (ref1 = itemComponent.config) != null ? ref1.slots : void 0) != null ? ref : ['right-hand']
    });
  };

  return ItemThangTypeNode;

})(ThangTypeNode);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/treema_nodes.js.map