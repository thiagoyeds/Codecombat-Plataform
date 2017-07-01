require.register("templates/modal/revert-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,models = locals_.models;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.revert_models\">Revert Models</h3></div><div class=\"modal-body\"><table id=\"changed-models\" class=\"table table-striped\">");
// iterate models
;(function(){
  var $$obj = models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var model = $$obj[$index];

buf.push("<tr><td>" + (jade.escape((jade.interp = model.type()) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = model.get('name')) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'value':(model.id), 'data-i18n':("editor.revert") }, {"value":true,"data-i18n":true})) + ">Revert</button></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var model = $$obj[$index];

buf.push("<tr><td>" + (jade.escape((jade.interp = model.type()) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = model.get('name')) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'value':(model.id), 'data-i18n':("editor.revert") }, {"value":true,"data-i18n":true})) + ">Revert</button></td></tr>");
    }

  }
}).call(this);

buf.push("</table></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/modal/RevertModal", function(exports, require, module) {
var CocoModel, ModalView, RevertModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/modal/revert-modal');

CocoModel = require('models/CocoModel');

module.exports = RevertModal = (function(superClass) {
  extend(RevertModal, superClass);

  function RevertModal() {
    return RevertModal.__super__.constructor.apply(this, arguments);
  }

  RevertModal.prototype.id = 'revert-modal';

  RevertModal.prototype.template = template;

  RevertModal.prototype.events = {
    'click #changed-models button': 'onRevertModel'
  };

  RevertModal.prototype.onRevertModel = function(e) {
    var id;
    id = $(e.target).val();
    CocoModel.backedUp[id].revert();
    $(e.target).closest('tr').remove();
    return this.reloadOnClose = true;
  };

  RevertModal.prototype.getRenderData = function() {
    var c, m, models;
    c = RevertModal.__super__.getRenderData.call(this);
    models = _.values(CocoModel.backedUp);
    models = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = models.length; i < len; i++) {
        m = models[i];
        if (m.hasLocalChanges()) {
          results.push(m);
        }
      }
      return results;
    })();
    c.models = models;
    return c;
  };

  RevertModal.prototype.onHidden = function() {
    if (this.reloadOnClose) {
      return location.reload();
    }
  };

  return RevertModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/modal/RevertModal.js.map