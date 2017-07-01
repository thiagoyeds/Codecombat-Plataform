require.register("views/editor/level/systems/SystemVersionsModal", function(exports, require, module) {
var SystemVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = SystemVersionsModal = (function(superClass) {
  extend(SystemVersionsModal, superClass);

  SystemVersionsModal.prototype.id = 'editor-system-versions-view';

  SystemVersionsModal.prototype.url = '/db/level.system/';

  SystemVersionsModal.prototype.page = 'system';

  function SystemVersionsModal(options, ID) {
    this.ID = ID;
    SystemVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/LevelSystem'));
  }

  return SystemVersionsModal;

})(VersionsModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/systems/SystemVersionsModal.js.map