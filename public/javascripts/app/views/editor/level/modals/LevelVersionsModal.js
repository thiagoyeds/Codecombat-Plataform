require.register("views/editor/level/modals/LevelVersionsModal", function(exports, require, module) {
var LevelVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = LevelVersionsModal = (function(superClass) {
  extend(LevelVersionsModal, superClass);

  LevelVersionsModal.prototype.id = 'editor-level-versions-view';

  LevelVersionsModal.prototype.url = '/db/level/';

  LevelVersionsModal.prototype.page = 'level';

  function LevelVersionsModal(options, ID) {
    this.ID = ID;
    LevelVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/Level'));
  }

  return LevelVersionsModal;

})(VersionsModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/LevelVersionsModal.js.map