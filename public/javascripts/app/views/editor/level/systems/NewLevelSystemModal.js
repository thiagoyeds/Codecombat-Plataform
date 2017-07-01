require.register("views/editor/level/systems/NewLevelSystemModal", function(exports, require, module) {
var LevelSystem, ModalView, NewLevelSystemModal, forms, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/system/new');

LevelSystem = require('models/LevelSystem');

forms = require('core/forms');

me = require('core/auth').me;

module.exports = NewLevelSystemModal = (function(superClass) {
  extend(NewLevelSystemModal, superClass);

  function NewLevelSystemModal() {
    return NewLevelSystemModal.__super__.constructor.apply(this, arguments);
  }

  NewLevelSystemModal.prototype.id = 'editor-level-system-new-modal';

  NewLevelSystemModal.prototype.template = template;

  NewLevelSystemModal.prototype.instant = false;

  NewLevelSystemModal.prototype.modalWidthPercent = 60;

  NewLevelSystemModal.prototype.events = {
    'click #new-level-system-submit': 'makeNewLevelSystem',
    'submit form': 'makeNewLevelSystem'
  };

  NewLevelSystemModal.prototype.makeNewLevelSystem = function(e) {
    var name, res, system;
    e.preventDefault();
    system = this.$el.find('#level-system-system').val();
    name = this.$el.find('#level-system-name').val();
    system = new LevelSystem();
    system.set('name', name);
    system.set('code', system.get('code', true).replace(/Jitter/g, name));
    system.set('permissions', [
      {
        access: 'owner',
        target: me.id
      }
    ]);
    res = system.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    this.showLoading();
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        console.log('Got errors:', JSON.parse(res.responseText));
        return forms.applyErrorsToForm(_this.$el, JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.supermodel.registerModel(system);
        Backbone.Mediator.publish('editor:edit-level-system', {
          original: system.get('_id'),
          majorVersion: 0
        });
        return _this.hide();
      };
    })(this));
  };

  return NewLevelSystemModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/systems/NewLevelSystemModal.js.map