require.register("views/editor/component/ComponentVersionsModal", function(exports, require, module) {
var ComponentVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = ComponentVersionsModal = (function(superClass) {
  extend(ComponentVersionsModal, superClass);

  ComponentVersionsModal.prototype.id = 'editor-component-versions-view';

  ComponentVersionsModal.prototype.url = '/db/level.component/';

  ComponentVersionsModal.prototype.page = 'component';

  function ComponentVersionsModal(options, ID) {
    this.ID = ID;
    ComponentVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/LevelComponent'));
  }

  return ComponentVersionsModal;

})(VersionsModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/component/ComponentVersionsModal.js.map