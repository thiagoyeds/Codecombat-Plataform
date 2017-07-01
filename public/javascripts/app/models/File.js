require.register("models/File", function(exports, require, module) {
var CocoModel, File,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = File = (function(superClass) {
  extend(File, superClass);

  function File() {
    return File.__super__.constructor.apply(this, arguments);
  }

  File.className = 'File';

  File.schema = {};

  File.prototype.urlRoot = '/db/file';

  return File;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/File.js.map