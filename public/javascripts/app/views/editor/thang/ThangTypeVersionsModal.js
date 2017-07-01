require.register("views/editor/thang/ThangTypeVersionsModal", function(exports, require, module) {
var ThangTypeVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = ThangTypeVersionsModal = (function(superClass) {
  extend(ThangTypeVersionsModal, superClass);

  ThangTypeVersionsModal.prototype.id = 'editor-thang-versions-view';

  ThangTypeVersionsModal.prototype.url = '/db/thang.type/';

  ThangTypeVersionsModal.prototype.page = 'thang';

  function ThangTypeVersionsModal(options, ID) {
    this.ID = ID;
    ThangTypeVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/ThangType'));
  }

  return ThangTypeVersionsModal;

})(VersionsModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/thang/ThangTypeVersionsModal.js.map