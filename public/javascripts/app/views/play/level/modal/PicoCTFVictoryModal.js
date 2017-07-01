require.register("views/play/level/modal/PicoCTFVictoryModal", function(exports, require, module) {
var Level, ModalView, PicoCTFVictoryModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/level/modal/picoctf-victory-modal');

Level = require('models/Level');

module.exports = PicoCTFVictoryModal = (function(superClass) {
  extend(PicoCTFVictoryModal, superClass);

  function PicoCTFVictoryModal() {
    return PicoCTFVictoryModal.__super__.constructor.apply(this, arguments);
  }

  PicoCTFVictoryModal.prototype.id = 'picoctf-victory-modal';

  PicoCTFVictoryModal.prototype.template = template;

  PicoCTFVictoryModal.prototype.closesOnClickOutside = false;

  PicoCTFVictoryModal.prototype.initialize = function(options) {
    var form, nextLevel;
    this.session = options.session;
    this.level = options.level;
    form = {
      flag: options.world.picoCTFFlag,
      pid: this.level.picoCTFProblem.pid
    };
    this.supermodel.addRequestResource({
      url: '/picoctf/submit',
      method: 'POST',
      data: form,
      success: (function(_this) {
        return function(response) {
          return console.log('submitted', form, 'and got response', response);
        };
      })(this)
    }).load();
    if (nextLevel = this.level.get('nextLevel')) {
      this.nextLevel = new Level().setURL("/db/level/" + nextLevel.original + "/version/" + nextLevel.majorVersion);
      this.nextLevel = this.supermodel.loadModel(this.nextLevel).model;
    }
    return this.playSound('victory');
  };

  PicoCTFVictoryModal.prototype.onLoaded = function() {
    return PicoCTFVictoryModal.__super__.onLoaded.call(this);
  };

  return PicoCTFVictoryModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/PicoCTFVictoryModal.js.map