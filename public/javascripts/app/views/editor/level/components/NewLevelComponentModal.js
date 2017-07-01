require.register("views/editor/level/components/NewLevelComponentModal", function(exports, require, module) {
var LevelComponent, ModalView, NewLevelComponentModal, forms, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/component/new');

LevelComponent = require('models/LevelComponent');

forms = require('core/forms');

me = require('core/auth').me;

module.exports = NewLevelComponentModal = (function(superClass) {
  extend(NewLevelComponentModal, superClass);

  NewLevelComponentModal.prototype.id = 'editor-level-component-new-modal';

  NewLevelComponentModal.prototype.template = template;

  NewLevelComponentModal.prototype.instant = false;

  NewLevelComponentModal.prototype.modalWidthPercent = 60;

  NewLevelComponentModal.prototype.events = {
    'click #new-level-component-submit': 'makeNewLevelComponent',
    'submit form': 'makeNewLevelComponent'
  };

  function NewLevelComponentModal(options) {
    NewLevelComponentModal.__super__.constructor.call(this, options);
    this.systems = LevelComponent.schema.properties.system["enum"];
  }

  NewLevelComponentModal.prototype.makeNewLevelComponent = function(e) {
    var component, name, res, system;
    e.preventDefault();
    system = this.$el.find('#level-component-system').val();
    name = this.$el.find('#level-component-name').val();
    component = new LevelComponent();
    component.set('system', system);
    component.set('name', name);
    component.set('code', component.get('code', true).replace(/AttacksSelf/g, name));
    component.set('permissions', [
      {
        access: 'owner',
        target: me.id
      }
    ]);
    res = component.save(null, {
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
        _this.supermodel.registerModel(component);
        return _this.hide();
      };
    })(this));
  };

  return NewLevelComponentModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/components/NewLevelComponentModal.js.map