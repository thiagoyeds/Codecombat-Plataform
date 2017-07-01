require.register("views/editor/level/systems/AddLevelSystemModal", function(exports, require, module) {
var AddLevelSystemModal, CocoCollection, LevelSystem, LevelSystemSearchCollection, ModalView, availableSystemTemplate, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/system/add');

availableSystemTemplate = require('templates/editor/level/system/available_system');

LevelSystem = require('models/LevelSystem');

CocoCollection = require('collections/CocoCollection');

LevelSystemSearchCollection = (function(superClass) {
  extend(LevelSystemSearchCollection, superClass);

  function LevelSystemSearchCollection() {
    return LevelSystemSearchCollection.__super__.constructor.apply(this, arguments);
  }

  LevelSystemSearchCollection.prototype.url = '/db/level.system';

  LevelSystemSearchCollection.prototype.model = LevelSystem;

  return LevelSystemSearchCollection;

})(CocoCollection);

module.exports = AddLevelSystemModal = (function(superClass) {
  extend(AddLevelSystemModal, superClass);

  AddLevelSystemModal.prototype.id = 'editor-level-system-add-modal';

  AddLevelSystemModal.prototype.template = template;

  AddLevelSystemModal.prototype.instant = true;

  AddLevelSystemModal.prototype.events = {
    'click .available-systems-list li': 'onAddSystem'
  };

  function AddLevelSystemModal(options) {
    var ref;
    AddLevelSystemModal.__super__.constructor.call(this, options);
    this.extantSystems = (ref = options.extantSystems) != null ? ref : [];
    this.systems = this.supermodel.loadCollection(new LevelSystemSearchCollection(), 'systems').model;
  }

  AddLevelSystemModal.prototype.afterRender = function() {
    AddLevelSystemModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    return this.renderAvailableSystems();
  };

  AddLevelSystemModal.prototype.renderAvailableSystems = function() {
    var i, len, m, results, system, systems, ul;
    ul = this.$el.find('ul.available-systems-list').empty();
    systems = (function() {
      var i, len, ref, results;
      ref = this.systems.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        results.push(m.attributes);
      }
      return results;
    }).call(this);
    _.remove(systems, (function(_this) {
      return function(system) {
        return _.find(_this.extantSystems, {
          original: system.original
        });
      };
    })(this));
    systems = _.sortBy(systems, 'name');
    results = [];
    for (i = 0, len = systems.length; i < len; i++) {
      system = systems[i];
      results.push(ul.append($(availableSystemTemplate({
        system: system
      }))));
    }
    return results;
  };

  AddLevelSystemModal.prototype.onAddSystem = function(e) {
    var i, id, len, levelSystem, ref, ref1, ref2, s, system, toAdd;
    id = $(e.currentTarget).data('system-id');
    system = _.find(this.systems.models, {
      id: id
    });
    if (!system) {
      return console.error('Couldn\'t find system for id', id, 'out of', this.systems.models);
    }
    toAdd = system.getDependencies(this.systems.models);
    _.remove(toAdd, (function(_this) {
      return function(s1) {
        return _.find(_this.extantSystems, {
          original: s1.get('original')
        });
      };
    })(this));
    ref = toAdd.concat([system]);
    for (i = 0, len = ref.length; i < len; i++) {
      s = ref[i];
      levelSystem = {
        original: (ref1 = s.get('original')) != null ? ref1 : id,
        majorVersion: (ref2 = s.get('version').major) != null ? ref2 : 0
      };
      this.extantSystems.push(levelSystem);
      Backbone.Mediator.publish('editor:level-system-added', {
        system: levelSystem
      });
    }
    return this.renderAvailableSystems();
  };

  return AddLevelSystemModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/systems/AddLevelSystemModal.js.map