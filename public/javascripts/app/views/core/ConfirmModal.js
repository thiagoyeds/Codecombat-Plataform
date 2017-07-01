require.register("templates/core/confirm-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,closeOnConfirm = locals_.closeOnConfirm;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>" + (jade.escape(null == (jade.interp = view.title) ? "" : jade.interp)) + "</h3></div><div class=\"modal-body\"><p>" + (null == (jade.interp = view.body) ? "" : jade.interp) + "</p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"decline-button\" type=\"button\" data-dismiss=\"modal\" class=\"btn btn-secondary\">" + (jade.escape(null == (jade.interp = view.decline) ? "" : jade.interp)) + "</button><button" + (jade.attrs({ 'id':('confirm-button'), 'type':("button"), 'data-dismiss':(closeOnConfirm === true ? "modal" : undefined), "class": [('btn'),('btn-primary')] }, {"type":true,"data-dismiss":true})) + ">" + (jade.escape(null == (jade.interp = view.confirm) ? "" : jade.interp)) + "</button></div></div></div>");;return buf.join("");
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

;require.register("views/core/ConfirmModal", function(exports, require, module) {
var ConfirmModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('./ModalView');

template = require('templates/core/confirm-modal');

module.exports = ConfirmModal = (function(superClass) {
  extend(ConfirmModal, superClass);

  function ConfirmModal() {
    return ConfirmModal.__super__.constructor.apply(this, arguments);
  }

  ConfirmModal.prototype.id = 'confirm-modal';

  ConfirmModal.prototype.template = template;

  ConfirmModal.prototype.closeButton = true;

  ConfirmModal.prototype.closeOnConfirm = true;

  ConfirmModal.prototype.events = {
    'click #decline-button': 'onClickDecline',
    'click #confirm-button': 'onClickConfirm'
  };

  ConfirmModal.prototype.initialize = function(options) {
    return _.assign(this, _.pick(options, 'title', 'body', 'decline', 'confirm', 'closeOnConfirm', 'closeButton'));
  };

  ConfirmModal.prototype.onClickDecline = function() {
    return this.trigger('decline');
  };

  ConfirmModal.prototype.onClickConfirm = function() {
    return this.trigger('confirm');
  };

  return ConfirmModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/ConfirmModal.js.map