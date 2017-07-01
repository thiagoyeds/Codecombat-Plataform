require.register("views/editor/level/components/ComponentsTabView", function(exports, require, module) {
var CocoView, ComponentsTabView, LevelComponent, LevelComponentCollection, LevelComponentEditView, LevelComponentNewView, LevelComponentNode, ThangType, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/components_tab');

ThangType = require('models/ThangType');

LevelComponent = require('models/LevelComponent');

LevelComponentEditView = require('./LevelComponentEditView');

LevelComponentNewView = require('./NewLevelComponentModal');

require('vendor/treema');

LevelComponentCollection = (function(superClass) {
  extend(LevelComponentCollection, superClass);

  function LevelComponentCollection() {
    return LevelComponentCollection.__super__.constructor.apply(this, arguments);
  }

  LevelComponentCollection.prototype.url = '/db/level.component';

  LevelComponentCollection.prototype.model = LevelComponent;

  return LevelComponentCollection;

})(Backbone.Collection);

module.exports = ComponentsTabView = (function(superClass) {
  extend(ComponentsTabView, superClass);

  function ComponentsTabView() {
    this.onTreemaComponentSelected = bind(this.onTreemaComponentSelected, this);
    return ComponentsTabView.__super__.constructor.apply(this, arguments);
  }

  ComponentsTabView.prototype.id = 'editor-level-components-tab-view';

  ComponentsTabView.prototype.template = template;

  ComponentsTabView.prototype.className = 'tab-pane';

  ComponentsTabView.prototype.subscriptions = {
    'editor:level-component-editing-ended': 'onLevelComponentEditingEnded'
  };

  ComponentsTabView.prototype.events = {
    'click #create-new-component-button': 'createNewLevelComponent',
    'click #create-new-component-button-no-select': 'createNewLevelComponent'
  };

  ComponentsTabView.prototype.onLoaded = function() {};

  ComponentsTabView.prototype.refreshLevelThangsTreema = function(thangsData) {
    var c, comp, component, componentMap, componentModelMap, componentModels, components, haveThisComponent, i, j, k, key, l, len, len1, len2, len3, len4, n, name1, o, presentComponents, ref, ref1, ref2, ref3, ref4, ref5, res, thang, thangType, treemaData, treemaOptions, value;
    presentComponents = {};
    for (i = 0, len = thangsData.length; i < len; i++) {
      thang = thangsData[i];
      componentMap = {};
      thangType = this.supermodel.getModelByOriginal(ThangType, thang.thangType);
      ref1 = (ref = thangType.get('components')) != null ? ref : [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        component = ref1[j];
        componentMap[component.original] = component;
      }
      ref2 = thang.components;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        component = ref2[k];
        componentMap[component.original] = component;
      }
      ref3 = _.values(componentMap);
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        component = ref3[l];
        haveThisComponent = (presentComponents[name1 = component.original + '.' + ((ref4 = component.majorVersion) != null ? ref4 : 0)] != null ? presentComponents[name1] : presentComponents[name1] = []);
        if (haveThisComponent.length < 100) {
          haveThisComponent.push(thang.id);
        }
      }
    }
    if (_.isEqual(presentComponents, this.presentComponents)) {
      return;
    }
    this.presentComponents = presentComponents;
    componentModels = this.supermodel.getModels(LevelComponent);
    componentModelMap = {};
    for (n = 0, len4 = componentModels.length; n < len4; n++) {
      comp = componentModels[n];
      componentModelMap[comp.get('original')] = comp;
    }
    components = (function() {
      var ref5, results;
      ref5 = this.presentComponents;
      results = [];
      for (key in ref5) {
        value = ref5[key];
        results.push({
          original: key.split('.')[0],
          majorVersion: parseInt(key.split('.')[1], 10),
          thangs: value,
          count: value.length
        });
      }
      return results;
    }).call(this);
    components = components.concat((function() {
      var len5, o, results;
      results = [];
      for (o = 0, len5 = componentModels.length; o < len5; o++) {
        c = componentModels[o];
        if (!this.presentComponents[c.get('original') + '.' + c.get('version').major]) {
          results.push({
            original: c.get('original'),
            majorVersion: c.get('version').major,
            thangs: [],
            count: 0
          });
        }
      }
      return results;
    }).call(this));
    treemaData = _.sortBy(components, (function(_this) {
      return function(comp) {
        var res;
        component = componentModelMap[comp.original];
        res = [(comp.count ? 0 : 1), component.get('system'), component.get('name')];
        return res;
      };
    })(this));
    res = {};
    for (key = o = 0, ref5 = treemaData.length; 0 <= ref5 ? o < ref5 : o > ref5; key = 0 <= ref5 ? ++o : --o) {
      res[treemaData[key].original] = treemaData[key];
    }
    treemaData = (function() {
      var results;
      results = [];
      for (key in res) {
        value = res[key];
        results.push(value);
      }
      return results;
    })();
    treemaOptions = {
      supermodel: this.supermodel,
      schema: {
        type: 'array',
        items: {
          type: 'object',
          format: 'level-component'
        }
      },
      data: treemaData,
      callbacks: {
        select: this.onTreemaComponentSelected
      },
      readOnly: true,
      nodeClasses: {
        'level-component': LevelComponentNode
      }
    };
    this.componentsTreema = this.$el.find('#components-treema').treema(treemaOptions);
    this.componentsTreema.build();
    return this.componentsTreema.open();
  };

  ComponentsTabView.prototype.onTreemaComponentSelected = function(e, selected) {
    selected = selected.length > 1 ? selected[0].getLastSelectedTreema() : selected[0];
    if (!selected) {
      this.removeSubView(this.levelComponentEditView);
      this.levelComponentEditView = null;
      return;
    }
    return this.editLevelComponent({
      original: selected.data.original,
      majorVersion: selected.data.majorVersion
    });
  };

  ComponentsTabView.prototype.createNewLevelComponent = function(e) {
    var levelComponentNewView;
    levelComponentNewView = new LevelComponentNewView({
      supermodel: this.supermodel
    });
    this.openModalView(levelComponentNewView);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  ComponentsTabView.prototype.editLevelComponent = function(e) {
    return this.levelComponentEditView = this.insertSubView(new LevelComponentEditView({
      original: e.original,
      majorVersion: e.majorVersion,
      supermodel: this.supermodel
    }));
  };

  ComponentsTabView.prototype.onLevelComponentEditingEnded = function(e) {
    this.removeSubView(this.levelComponentEditView);
    return this.levelComponentEditView = null;
  };

  ComponentsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.componentsTreema) != null) {
      ref.destroy();
    }
    return ComponentsTabView.__super__.destroy.call(this);
  };

  return ComponentsTabView;

})(CocoView);

LevelComponentNode = (function(superClass) {
  extend(LevelComponentNode, superClass);

  function LevelComponentNode() {
    return LevelComponentNode.__super__.constructor.apply(this, arguments);
  }

  LevelComponentNode.prototype.valueClass = 'treema-level-component';

  LevelComponentNode.prototype.collection = false;

  LevelComponentNode.prototype.buildValueForDisplay = function(valEl, data) {
    var comp, count, name, result;
    count = data.count === 1 ? data.thangs[0] : (data.count >= 100 ? '100+' : data.count) + ' Thangs';
    if (data.original.match(':')) {
      name = 'Old: ' + data.original.replace('systems/', '');
    } else {
      comp = _.find(this.settings.supermodel.getModels(LevelComponent), (function(_this) {
        return function(m) {
          return m.get('original') === data.original && m.get('version').major === data.majorVersion;
        };
      })(this));
      name = (comp.get('system')) + "." + (comp.get('name')) + " v" + (comp.get('version').major);
    }
    result = this.buildValueForDisplaySimply(valEl, name + " (" + count + ")");
    if (!data.count) {
      result.addClass('not-present');
    }
    return result;
  };

  return LevelComponentNode;

})(TreemaObjectNode);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/components/ComponentsTabView.js.map