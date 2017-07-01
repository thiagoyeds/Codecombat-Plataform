require.register("templates/editor/fork-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.fork_title\">Fork New Version</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"model-name\" data-i18n=\"general.name\">Name</label><input id=\"fork-model-name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"editor.fork_creating\">Creating Fork...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button id=\"fork-model-confirm-button\" data-i18n=\"common.save\" class=\"btn btn-primary\">Save</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/editor/ForkModal", function(exports, require, module) {
var ForkModal, ModalView, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/fork-modal');

forms = require('core/forms');

module.exports = ForkModal = (function(superClass) {
  extend(ForkModal, superClass);

  ForkModal.prototype.id = 'fork-modal';

  ForkModal.prototype.template = template;

  ForkModal.prototype.instant = false;

  ForkModal.prototype.events = {
    'click #fork-model-confirm-button': 'forkModel',
    'submit form': 'forkModel'
  };

  function ForkModal(options) {
    ForkModal.__super__.constructor.call(this, options);
    this.editorPath = options.editorPath;
    this.model = options.model;
    this.modelClass = this.model.constructor;
  }

  ForkModal.prototype.forkModel = function(e) {
    var newModel, newPathPrefix, res;
    e.preventDefault();
    this.showLoading();
    forms.clearFormAlerts(this.$el);
    newModel = new this.modelClass($.extend(true, {}, this.model.attributes));
    newModel.unset('_id');
    newModel.unset('version');
    newModel.unset('creator');
    newModel.unset('created');
    newModel.unset('original');
    newModel.unset('parent');
    newModel.unset('i18n');
    newModel.unset('i18nCoverage');
    newModel.set('commitMessage', "Forked from " + (this.model.get('name')));
    newModel.set('name', this.$el.find('#fork-model-name').val());
    if (this.model.schema().properties.permissions) {
      newModel.set('permissions', [
        {
          access: 'owner',
          target: me.id
        }
      ]);
    }
    newPathPrefix = "editor/" + this.editorPath + "/";
    res = newModel.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    res.error((function(_this) {
      return function() {
        _this.hideLoading();
        return forms.applyErrorsToForm(_this.$el.find('form'), JSON.parse(res.responseText));
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        _this.hide();
        return application.router.navigate(newPathPrefix + newModel.get('slug'), {
          trigger: true
        });
      };
    })(this));
  };

  return ForkModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/ForkModal.js.map