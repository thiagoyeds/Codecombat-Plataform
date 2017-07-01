require.register("templates/editor/modal/new-model-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3" + (jade.attrs({ 'data-i18n':("" + (view.newModelTitle) + "") }, {"data-i18n":true})) + ">Create New " + (jade.escape((jade.interp = view.modelLabel) == null ? '' : jade.interp)) + "</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.create\" class=\"btn btn-primary new-model-submit\">Create</button></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"play_level.tip_reticulating\">Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("views/editor/modal/NewModelModal", function(exports, require, module) {
var ModalView, NewModelModal, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/modal/new-model-modal');

forms = require('core/forms');

module.exports = NewModelModal = (function(superClass) {
  extend(NewModelModal, superClass);

  NewModelModal.prototype.id = 'new-model-modal';

  NewModelModal.prototype.template = template;

  NewModelModal.prototype.plain = false;

  NewModelModal.prototype.events = {
    'click button.new-model-submit': 'onModelSubmitted',
    'submit form': 'onModelSubmitted'
  };

  function NewModelModal(options) {
    NewModelModal.__super__.constructor.call(this, options);
    this.modelClass = options.model;
    this.modelLabel = options.modelLabel;
    this.newModelTitle = "editor.new_" + (_.string.slugify(this.modelLabel)) + "_title";
    this.properties = options.properties;
  }

  NewModelModal.prototype.makeNewModel = function() {
    var key, model, name, prop, ref;
    model = new this.modelClass;
    name = this.$el.find('#name').val();
    model.set('name', name);
    if (this.modelClass.name === 'Level') {
      model.set('tasks', this.modelClass.schema["default"].tasks);
    }
    if (model.schema().properties.permissions) {
      model.set('permissions', [
        {
          access: 'owner',
          target: me.id
        }
      ]);
    }
    if (this.properties != null) {
      ref = this.properties;
      for (key in ref) {
        prop = ref[key];
        model.set(key, prop);
      }
    }
    return model;
  };

  NewModelModal.prototype.onModelSubmitted = function(e) {
    var model, res;
    e.preventDefault();
    model = this.makeNewModel();
    res = model.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    forms.clearFormAlerts(this.$el);
    this.showLoading(this.$el.find('.modal-body'));
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        return forms.applyErrorsToForm(_this.$el, JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.$el.modal('hide');
        return _this.trigger('model-created', model);
      };
    })(this));
  };

  NewModelModal.prototype.afterInsert = function() {
    NewModelModal.__super__.afterInsert.call(this);
    return _.delay(((function(_this) {
      return function() {
        var ref;
        return (ref = _this.$el) != null ? ref.find('#name').focus() : void 0;
      };
    })(this)), 500);
  };

  return NewModelModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/modal/NewModelModal.js.map