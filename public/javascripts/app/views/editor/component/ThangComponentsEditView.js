require.register("templates/editor/component/thang-components-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"thang-components-column\" class=\"column\"><h3 data-i18n=\"editor.level_tab_components\">Components</h3><button id=\"add-components-button\" data-i18n=\"editor.add_components\" class=\"btn\">Add Components</button><div class=\"treema\"></div></div><div id=\"thang-components-config-column\" class=\"column\"><h3 data-i18n=\"editor.component_configs\">Component Configurations</h3><div id=\"thang-component-configs\"></div></div>");;return buf.join("");
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

;require.register("views/editor/component/ThangComponentsEditView", function(exports, require, module) {
var AddThangComponentsModal, CocoCollection, CocoView, DEFAULT_COMPONENTS, LC, Level, LevelComponent, LevelComponents, LevelSystem, ThangComponentConfigView, ThangComponentsEditView, ThangComponentsObjectNode, ThangType, nodes, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/editor/component/thang-components-edit-view');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

LevelComponents = require('collections/LevelComponents');

ThangComponentConfigView = require('./ThangComponentConfigView');

AddThangComponentsModal = require('./AddThangComponentsModal');

nodes = require('../level/treema_nodes');

require('vendor/treema');

ThangType = require('models/ThangType');

CocoCollection = require('collections/CocoCollection');

LC = function(componentName, config) {
  return {
    original: LevelComponent[componentName + 'ID'],
    majorVersion: 0,
    config: config
  };
};

DEFAULT_COMPONENTS = {
  Unit: [LC('Equips'), LC('FindsPaths')],
  Hero: [LC('Equips'), LC('FindsPaths')],
  Floor: [
    LC('Exists', {
      stateless: true
    }), LC('Physical', {
      width: 20,
      height: 17,
      depth: 2,
      shape: 'sheet',
      pos: {
        x: 10,
        y: 8.5,
        z: 1
      }
    }), LC('Land')
  ],
  Wall: [
    LC('Exists', {
      stateless: true
    }), LC('Physical', {
      width: 4,
      height: 4,
      depth: 12,
      shape: 'box',
      pos: {
        x: 2,
        y: 2,
        z: 6
      }
    }), LC('Collides', {
      collisionType: 'static',
      collisionCategory: 'obstacles',
      mass: 1000,
      fixedRotation: true,
      restitution: 1
    })
  ],
  Doodad: [
    LC('Exists', {
      stateless: true
    }), LC('Physical'), LC('Collides', {
      collisionType: 'static',
      fixedRotation: true
    })
  ],
  Misc: [LC('Exists'), LC('Physical')],
  Mark: [],
  Item: [LC('Item')],
  Missile: [LC('Missile')]
};

module.exports = ThangComponentsEditView = (function(superClass) {
  extend(ThangComponentsEditView, superClass);

  ThangComponentsEditView.prototype.id = 'thang-components-edit-view';

  ThangComponentsEditView.prototype.template = template;

  ThangComponentsEditView.prototype.subscriptions = {
    'editor:thang-type-kind-changed': 'onThangTypeKindChanged'
  };

  ThangComponentsEditView.prototype.events = {
    'click #add-components-button': 'onAddComponentsButtonClicked'
  };

  function ThangComponentsEditView(options) {
    this.onChangeExtantComponents = bind(this.onChangeExtantComponents, this);
    this.onSelectComponent = bind(this.onSelectComponent, this);
    this.onComponentsChanged = bind(this.onComponentsChanged, this);
    this.onComponentsTreemaChanged = bind(this.onComponentsTreemaChanged, this);
    ThangComponentsEditView.__super__.constructor.call(this, options);
    this.originalsLoaded = {};
    this.components = options.components || [];
    this.components = $.extend(true, [], this.components);
    this.setThangType(options.thangType);
    this.lastComponentLength = this.components.length;
    this.world = options.world;
    this.level = options.level;
    this.loadComponents(this.components);
  }

  ThangComponentsEditView.prototype.setThangType = function(thangType) {
    var componentRefs, ref;
    this.thangType = thangType;
    if (!(componentRefs = (ref = this.thangType) != null ? ref.get('components') : void 0)) {
      return;
    }
    return this.loadComponents(componentRefs);
  };

  ThangComponentsEditView.prototype.loadComponents = function(components) {
    var componentRef, i, len, levelComponent, resource, results, url;
    results = [];
    for (i = 0, len = components.length; i < len; i++) {
      componentRef = components[i];
      if (this.originalsLoaded[componentRef.original]) {
        continue;
      }
      this.originalsLoaded[componentRef.original] = componentRef.original;
      levelComponent = new LevelComponent(componentRef);
      url = "/db/level.component/" + componentRef.original + "/version/" + componentRef.majorVersion;
      levelComponent.setURL(url);
      resource = this.supermodel.loadModel(levelComponent);
      if (!resource.isLoading) {
        continue;
      }
      results.push(this.listenToOnce(resource, 'loaded', function() {
        if (this.handlingChange) {
          return;
        }
        this.handlingChange = true;
        this.onComponentsAdded();
        return this.handlingChange = false;
      }));
    }
    return results;
  };

  ThangComponentsEditView.prototype.afterRender = function() {
    ThangComponentsEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.buildComponentsTreema();
    return this.addThangComponentConfigViews();
  };

  ThangComponentsEditView.prototype.buildComponentsTreema = function() {
    var c, components, defaultValue, ref, thangTypeComponents, treemaOptions;
    components = _.zipObject((function() {
      var i, len, ref, results;
      ref = this.components;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(c.original);
      }
      return results;
    }).call(this), this.components);
    defaultValue = void 0;
    if (thangTypeComponents = (ref = this.thangType) != null ? ref.get('components', true) : void 0) {
      defaultValue = _.zipObject((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = thangTypeComponents.length; i < len; i++) {
          c = thangTypeComponents[i];
          results.push(c.original);
        }
        return results;
      })(), thangTypeComponents);
    }
    treemaOptions = {
      supermodel: this.supermodel,
      schema: {
        type: 'object',
        "default": defaultValue,
        additionalProperties: Level.schema.properties.thangs.items.properties.components.items
      },
      data: $.extend(true, {}, components),
      callbacks: {
        select: this.onSelectComponent,
        change: this.onComponentsTreemaChanged
      },
      nodeClasses: {
        'object': ThangComponentsObjectNode
      }
    };
    this.componentsTreema = this.$el.find('#thang-components-column .treema').treema(treemaOptions);
    return this.componentsTreema.build();
  };

  ThangComponentsEditView.prototype.onComponentsTreemaChanged = function() {
    var component, componentMap, i, j, len, len1, newComponentsList, ref, ref1;
    if (this.handlingChange) {
      return;
    }
    this.handlingChange = true;
    componentMap = {};
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      componentMap[component.original] = component;
    }
    newComponentsList = [];
    ref1 = _.values(this.componentsTreema.data);
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      component = ref1[j];
      newComponentsList.push(componentMap[component.original] || component);
    }
    this.components = newComponentsList;
    this.onComponentsChanged();
    return this.handlingChange = false;
  };

  ThangComponentsEditView.prototype.onComponentsChanged = function() {
    if (this.components.length < this.lastComponentLength) {
      this.onComponentsRemoved();
    }
    return this.onComponentsAdded();
  };

  ThangComponentsEditView.prototype.onComponentsRemoved = function() {
    var component, componentMap, componentModel, componentRef, dependency, i, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, removedSomething, subview, thangComponentMap, thangTypeComponent, thangTypeComponents;
    componentMap = {};
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      componentMap[component.original] = component;
    }
    thangComponentMap = {};
    if (thangTypeComponents = (ref1 = this.thangType) != null ? ref1.get('components') : void 0) {
      for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
        thangTypeComponent = thangTypeComponents[j];
        thangComponentMap[thangTypeComponent.original] = thangTypeComponent;
      }
    }
    while (true) {
      removedSomething = false;
      ref2 = _.values(componentMap);
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        componentRef = ref2[k];
        componentModel = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, componentRef.original, componentRef.majorVersion);
        ref3 = componentModel.get('dependencies') || [];
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          dependency = ref3[l];
          if (!(componentMap[dependency.original] || thangComponentMap[dependency.original])) {
            delete componentMap[componentRef.original];
            component = this.supermodel.getModelByOriginal(LevelComponent, componentRef.original);
            noty({
              text: "Removed dependent component: " + (component.get('name')),
              layout: 'topCenter',
              timeout: 5000,
              type: 'information'
            });
            removedSomething = true;
          }
        }
        if (removedSomething) {
          break;
        }
      }
      if (!removedSomething) {
        break;
      }
    }
    this.components = _.values(componentMap);
    ref4 = _.values(this.subviews);
    for (m = 0, len4 = ref4.length; m < len4; m++) {
      subview = ref4[m];
      if (!(subview instanceof ThangComponentConfigView)) {
        continue;
      }
      if (!(componentMap[subview.component.get('original')] || thangComponentMap[subview.component.get('original')])) {
        this.removeSubView(subview);
      }
    }
    this.updateComponentsList();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.updateComponentsList = function() {
    return this.buildComponentsTreema();
  };

  ThangComponentsEditView.prototype.onComponentsAdded = function() {
    var addedSomething, component, componentMap, componentModel, componentRef, dependency, i, j, k, l, len, len1, len2, len3, ref, ref1, ref2, ref3, thangTypeComponent, thangTypeComponents;
    if (!this.componentsTreema) {
      return;
    }
    componentMap = {};
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      component = ref[i];
      componentMap[component.original] = component;
    }
    if (thangTypeComponents = (ref1 = this.thangType) != null ? ref1.get('components') : void 0) {
      for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
        thangTypeComponent = thangTypeComponents[j];
        componentMap[thangTypeComponent.original] = thangTypeComponent;
      }
    }
    while (true) {
      addedSomething = false;
      ref2 = _.values(componentMap);
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        componentRef = ref2[k];
        componentModel = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, componentRef.original, componentRef.majorVersion);
        if (!(componentModel != null ? componentModel.loaded : void 0)) {
          this.loadComponents([componentRef]);
          continue;
        }
        ref3 = (componentModel != null ? componentModel.get('dependencies') : void 0) || [];
        for (l = 0, len3 = ref3.length; l < len3; l++) {
          dependency = ref3[l];
          if (!componentMap[dependency.original]) {
            component = this.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, dependency.original, dependency.majorVersion);
            if (!(component != null ? component.loaded : void 0)) {
              this.loadComponents([dependency]);
            } else {
              addedSomething = true;
              noty({
                text: "Added dependency: " + (component.get('name')),
                layout: 'topCenter',
                timeout: 5000,
                type: 'information'
              });
              componentMap[dependency.original] = dependency;
              this.components.push(dependency);
            }
          }
        }
      }
      if (!addedSomething) {
        break;
      }
    }
    this.updateComponentsList();
    this.addThangComponentConfigViews();
    this.checkForMissingSystems();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.addThangComponentConfigViews = function() {
    var c, componentConfigViews, componentRef, componentRefs, configsEl, i, j, k, len, len1, len2, modifiedRef, ref, ref1, ref2, results, subview, thangComponentRefs, thangTypeComponent, thangTypeComponents;
    componentConfigViews = {};
    ref = _.values(this.subviews);
    for (i = 0, len = ref.length; i < len; i++) {
      subview = ref[i];
      if (!(subview instanceof ThangComponentConfigView)) {
        continue;
      }
      componentConfigViews[subview.component.get('original')] = subview;
      subview.$el.detach();
    }
    configsEl = this.$el.find('#thang-component-configs');
    componentRefs = _.merge({}, this.componentsTreema.data);
    if (thangTypeComponents = (ref1 = this.thangType) != null ? ref1.get('components') : void 0) {
      thangComponentRefs = _.zipObject((function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
          c = thangTypeComponents[j];
          results.push(c.original);
        }
        return results;
      })(), thangTypeComponents);
      for (j = 0, len1 = thangTypeComponents.length; j < len1; j++) {
        thangTypeComponent = thangTypeComponents[j];
        if (componentRef = componentRefs[thangTypeComponent.original]) {
          componentRef.additionalDefaults = thangTypeComponent.config;
        } else {
          modifiedRef = _.merge({}, thangTypeComponent);
          modifiedRef.additionalDefaults = modifiedRef.config;
          delete modifiedRef.config;
          componentRefs[thangTypeComponent.original] = modifiedRef;
        }
      }
    }
    ref2 = _.values(componentRefs);
    results = [];
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      componentRef = ref2[k];
      subview = componentConfigViews[componentRef.original];
      if (!subview) {
        subview = this.makeThangComponentConfigView(componentRef);
        if (!subview) {
          continue;
        }
        this.registerSubView(subview);
      }
      subview.setIsDefaultComponent(!this.componentsTreema.data[componentRef.original]);
      results.push(configsEl.append(subview.$el));
    }
    return results;
  };

  ThangComponentsEditView.prototype.makeThangComponentConfigView = function(thangComponent) {
    var component, config, configView, ref;
    component = this.supermodel.getModelByOriginal(LevelComponent, thangComponent.original);
    if (!(component != null ? component.loaded : void 0)) {
      return;
    }
    config = (ref = thangComponent.config) != null ? ref : {};
    configView = new ThangComponentConfigView({
      supermodel: this.supermodel,
      level: this.level,
      world: this.world,
      config: config,
      component: component,
      additionalDefaults: thangComponent.additionalDefaults
    });
    configView.render();
    this.listenTo(configView, 'changed', this.onConfigChanged);
    return configView;
  };

  ThangComponentsEditView.prototype.onConfigChanged = function(e) {
    var foundComponent, i, j, len, len1, ref, ref1, subview, thangComponent;
    foundComponent = false;
    ref = this.components;
    for (i = 0, len = ref.length; i < len; i++) {
      thangComponent = ref[i];
      if (thangComponent.original === e.component.get('original')) {
        thangComponent.config = e.config;
        foundComponent = true;
        break;
      }
    }
    if (!foundComponent) {
      this.components.push({
        original: e.component.get('original'),
        majorVersion: e.component.get('version').major,
        config: e.config
      });
      ref1 = _.values(this.subviews);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        subview = ref1[j];
        if (!(subview instanceof ThangComponentConfigView)) {
          continue;
        }
        if (subview.component.get('original') === e.component.get('original')) {
          _.defer(function() {
            return subview.setIsDefaultComponent(false);
          });
          break;
        }
      }
    }
    this.updateComponentsList();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.onSelectComponent = function(e, nodes) {
    var child, componentOriginal, componentsToCheck, dependency, dependents, i, j, k, l, len, len1, len2, len3, otherComponent, otherComponentRef, ref, ref1, ref2, ref3, results, subview;
    this.componentsTreema.$el.find('.dependent').removeClass('dependent');
    this.$el.find('.selected-component').removeClass('selected-component');
    if (nodes.length !== 1) {
      return;
    }
    dependents = {};
    dependents[nodes[0].getData().original] = true;
    componentsToCheck = [nodes[0].getData().original];
    while (componentsToCheck.length) {
      componentOriginal = componentsToCheck.pop();
      ref = this.components;
      for (i = 0, len = ref.length; i < len; i++) {
        otherComponentRef = ref[i];
        if (otherComponentRef.original === componentOriginal) {
          continue;
        }
        if (dependents[otherComponentRef.original]) {
          continue;
        }
        otherComponent = this.supermodel.getModelByOriginal(LevelComponent, otherComponentRef.original);
        ref1 = otherComponent.get('dependencies', true);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          dependency = ref1[j];
          if (dependents[dependency.original]) {
            dependents[otherComponentRef.original] = true;
            componentsToCheck.push(otherComponentRef.original);
          }
        }
      }
    }
    ref2 = _.values(this.componentsTreema.childrenTreemas);
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      child = ref2[k];
      if (dependents[child.getData().original]) {
        child.$el.addClass('dependent');
      }
    }
    ref3 = _.values(this.subviews);
    results = [];
    for (l = 0, len3 = ref3.length; l < len3; l++) {
      subview = ref3[l];
      if (!(subview instanceof ThangComponentConfigView)) {
        continue;
      }
      if (subview.component.get('original') === nodes[0].getData().original) {
        subview.$el[0].scrollIntoView();
        subview.$el.addClass('selected-component');
        break;
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangComponentsEditView.prototype.onChangeExtantComponents = function() {
    this.buildAddComponentTreema();
    return this.reportChanges();
  };

  ThangComponentsEditView.prototype.checkForMissingSystems = function() {
    var c, componentModels, componentSystems, extantSystems, i, idx, len, results, s, sn, system;
    if (!this.level) {
      return;
    }
    extantSystems = (function() {
      var ref, results;
      ref = this.level.get('systems');
      results = [];
      for (idx in ref) {
        sn = ref[idx];
        results.push((this.supermodel.getModelByOriginalAndMajorVersion(LevelSystem, sn.original, sn.majorVersion)).attributes.name.toLowerCase());
      }
      return results;
    }).call(this);
    componentModels = (function() {
      var i, len, ref, results;
      ref = this.components;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push(this.supermodel.getModelByOriginal(LevelComponent, c.original));
      }
      return results;
    }).call(this);
    componentSystems = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = componentModels.length; i < len; i++) {
        c = componentModels[i];
        if (c) {
          results.push(c.get('system'));
        }
      }
      return results;
    })();
    results = [];
    for (i = 0, len = componentSystems.length; i < len; i++) {
      system = componentSystems[i];
      if (system !== 'misc' && indexOf.call(extantSystems, system) < 0) {
        s = "Component requires system <strong>" + system + "</strong> which is currently not included in this level.";
        results.push(noty({
          text: s,
          layout: 'bottomLeft',
          type: 'warning'
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangComponentsEditView.prototype.reportChanges = function() {
    this.lastComponentLength = this.components.length;
    return this.trigger('components-changed', $.extend(true, [], this.components));
  };

  ThangComponentsEditView.prototype.undo = function() {
    return this.componentsTreema.undo();
  };

  ThangComponentsEditView.prototype.redo = function() {
    return this.componentsTreema.redo();
  };

  ThangComponentsEditView.prototype.onAddComponentsButtonClicked = function() {
    var c, modal;
    modal = new AddThangComponentsModal({
      skipOriginals: (function() {
        var i, len, ref, results;
        ref = this.components;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          results.push(c.original);
        }
        return results;
      }).call(this)
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hidden', function() {
      var componentsToAdd, sparseComponents;
      componentsToAdd = modal.getSelectedComponents();
      sparseComponents = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = componentsToAdd.length; i < len; i++) {
          c = componentsToAdd[i];
          results.push({
            original: c.get('original'),
            majorVersion: c.get('version').major
          });
        }
        return results;
      })();
      this.loadComponents(sparseComponents);
      this.components = this.components.concat(sparseComponents);
      return this.onComponentsChanged();
    });
  };

  ThangComponentsEditView.prototype.onThangTypeKindChanged = function(e) {
    var component, defaultComponents, i, len, results;
    if (!(defaultComponents = DEFAULT_COMPONENTS[e.kind])) {
      return;
    }
    results = [];
    for (i = 0, len = defaultComponents.length; i < len; i++) {
      component = defaultComponents[i];
      if (!(!_.find(this.components, {
        original: component.original
      }))) {
        continue;
      }
      this.components.push(component);
      results.push(this.onComponentsAdded());
    }
    return results;
  };

  ThangComponentsEditView.prototype.destroy = function() {
    var ref;
    if ((ref = this.componentsTreema) != null) {
      ref.destroy();
    }
    return ThangComponentsEditView.__super__.destroy.call(this);
  };

  return ThangComponentsEditView;

})(CocoView);

ThangComponentsObjectNode = (function(superClass) {
  extend(ThangComponentsObjectNode, superClass);

  function ThangComponentsObjectNode() {
    this.sortFunction = bind(this.sortFunction, this);
    return ThangComponentsObjectNode.__super__.constructor.apply(this, arguments);
  }

  ThangComponentsObjectNode.prototype.addNewChild = function() {
    return this.addNewChildForKey('');
  };

  ThangComponentsObjectNode.prototype.getChildren = function() {
    var children;
    children = ThangComponentsObjectNode.__super__.getChildren.apply(this, arguments);
    return children.sort(this.sortFunction);
  };

  ThangComponentsObjectNode.prototype.sortFunction = function(a, b) {
    var ref, ref1;
    a = (ref = a.value) != null ? ref : a.defaultData;
    b = (ref1 = b.value) != null ? ref1 : b.defaultData;
    a = this.settings.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, a.original, a.majorVersion);
    b = this.settings.supermodel.getModelByOriginalAndMajorVersion(LevelComponent, b.original, b.majorVersion);
    if (!(a || b)) {
      return 0;
    }
    if (!b) {
      return 1;
    }
    if (!a) {
      return -1;
    }
    if (a.get('system') > b.get('system')) {
      return 1;
    }
    if (a.get('system') < b.get('system')) {
      return -1;
    }
    if (a.get('name') > b.get('name')) {
      return 1;
    }
    if (a.get('name') < b.get('name')) {
      return -1;
    }
    return 0;
  };

  return ThangComponentsObjectNode;

})(TreemaObjectNode);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/component/ThangComponentsEditView.js.map