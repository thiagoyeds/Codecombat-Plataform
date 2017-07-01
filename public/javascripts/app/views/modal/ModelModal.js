require.register("templates/modal/model-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-body\">");
// iterate view.models
;(function(){
  var $$obj = view.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-container')] }, {"data-model-id":true})) + "><h3>" + (jade.escape(null == (jade.interp = model.type() + ': ' + model.id) ? "" : jade.interp)) + "</h3><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-treema')] }, {"data-model-id":true})) + "></div><btn data-i18n=\"common.save\" class=\"btn btn-success save-model\">Save</btn></div><hr/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-container')] }, {"data-model-id":true})) + "><h3>" + (jade.escape(null == (jade.interp = model.type() + ': ' + model.id) ? "" : jade.interp)) + "</h3><div" + (jade.attrs({ 'data-model-id':(model.id), "class": [('model-treema')] }, {"data-model-id":true})) + "></div><btn data-i18n=\"common.save\" class=\"btn btn-success save-model\">Save</btn></div><hr/>");
    }

  }
}).call(this);

buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/modal/ModelModal", function(exports, require, module) {
var ModalView, ModelModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/modal/model-modal');

require('vendor/treema');

module.exports = ModelModal = (function(superClass) {
  extend(ModelModal, superClass);

  ModelModal.prototype.id = 'model-modal';

  ModelModal.prototype.template = template;

  ModelModal.prototype.plain = true;

  ModelModal.prototype.events = {
    'click .save-model': 'onSaveModel'
  };

  function ModelModal(options) {
    var i, len, model, ref;
    ModelModal.__super__.constructor.call(this, options);
    this.models = options.models;
    ref = this.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      if (!(!model.loaded)) {
        continue;
      }
      this.supermodel.loadModel(model);
      model.fetch({
        cache: false
      });
    }
  }

  ModelModal.prototype.afterRender = function() {
    var data, i, len, model, modelTreema, ref, results, schema, treemaOptions;
    if (!this.supermodel.finished()) {
      return;
    }
    this.modelTreemas = {};
    ref = this.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      data = $.extend(true, {}, model.attributes);
      schema = $.extend(true, {}, model.schema());
      treemaOptions = {
        schema: schema,
        data: data,
        readOnly: false
      };
      modelTreema = this.$el.find(".model-treema[data-model-id='" + model.id + "']").treema(treemaOptions);
      if (modelTreema != null) {
        modelTreema.build();
      }
      if (modelTreema != null) {
        modelTreema.open();
      }
      this.openTastyTreemas(modelTreema, model);
      results.push(this.modelTreemas[model.id] = modelTreema);
    }
    return results;
  };

  ModelModal.prototype.openTastyTreemas = function(modelTreema, model) {
    var child, delicacies, dessert, desserts, dish, i, len, results, team;
    delicacies = ['code'];
    results = [];
    for (i = 0, len = delicacies.length; i < len; i++) {
      dish = delicacies[i];
      child = modelTreema.childrenTreemas[dish];
      if (child != null) {
        child.open();
      }
      if (child && dish === 'code' && model.type() === 'LevelSession' && (team = modelTreema.get('team'))) {
        desserts = {
          humans: ['programmable-tharin', 'programmable-librarian'],
          ogres: ['programmable-brawler', 'programmable-shaman']
        }[team];
        results.push((function() {
          var j, len1, ref, results1;
          results1 = [];
          for (j = 0, len1 = desserts.length; j < len1; j++) {
            dessert = desserts[j];
            results1.push((ref = child.childrenTreemas[dessert]) != null ? ref.open() : void 0);
          }
          return results1;
        })());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ModelModal.prototype.onSaveModel = function(e) {
    var container, errors, key, model, ref, ref1, res, treema, val;
    container = $(e.target).closest('.model-container');
    model = _.find(this.models, {
      id: container.data('model-id')
    });
    treema = this.modelTreemas[model.id];
    ref = treema.data;
    for (key in ref) {
      val = ref[key];
      if (!(!_.isEqual(val, model.get(key)))) {
        continue;
      }
      console.log('Updating', key, 'from', model.get(key), 'to', val);
      model.set(key, val);
    }
    ref1 = model.attributes;
    for (key in ref1) {
      val = ref1[key];
      if (treema.get(key) === void 0 && !_.string.startsWith(key, '_')) {
        console.log('Deleting', key, 'which was', val, 'but man, that ain\'t going to work, now is it?');
      }
    }
    if (errors = model.validate()) {
      return console.warn(model, 'failed validation with errors:', errors);
    }
    if (!(res = model.patch())) {
      return;
    }
    res.error((function(_this) {
      return function() {
        if (_this.destroyed) {
          return;
        }
        return console.error(model, 'failed to save with error:', res.responseText);
      };
    })(this));
    return res.success((function(_this) {
      return function(model, response, options) {
        if (_this.destroyed) {
          return;
        }
        return _this.hide();
      };
    })(this));
  };

  ModelModal.prototype.destroy = function() {
    var model;
    for (model in this.modelTreemas) {
      this.modelTreemas[model].destroy();
    }
    return ModelModal.__super__.destroy.call(this);
  };

  return ModelModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/modal/ModelModal.js.map