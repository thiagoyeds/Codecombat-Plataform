require.register("templates/play/modal/play-settings-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"play.settings\">Settings</h3></div><div class=\"modal-body\"><p>TODO: show all dem settings</p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/play/modal/PlaySettingsModal", function(exports, require, module) {
var ModalView, PlaySettingsModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/play-settings-modal');

module.exports = PlaySettingsModal = (function(superClass) {
  extend(PlaySettingsModal, superClass);

  PlaySettingsModal.prototype.className = 'modal fade play-modal';

  PlaySettingsModal.prototype.template = template;

  PlaySettingsModal.prototype.modalWidthPercent = 90;

  PlaySettingsModal.prototype.id = 'play-settings-modal';

  function PlaySettingsModal(options) {
    PlaySettingsModal.__super__.constructor.call(this, options);
  }

  PlaySettingsModal.prototype.afterRender = function() {
    PlaySettingsModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    return this.playSound('game-menu-open');
  };

  PlaySettingsModal.prototype.onHidden = function() {
    PlaySettingsModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  return PlaySettingsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/PlaySettingsModal.js.map