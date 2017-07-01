require.register("collections/DocumentFiles", function(exports, require, module) {
var CocoCollection, File, ModelFiles,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

File = require('models/File');

module.exports = ModelFiles = (function(superClass) {
  extend(ModelFiles, superClass);

  ModelFiles.prototype.model = File;

  function ModelFiles(model) {
    var url;
    ModelFiles.__super__.constructor.call(this);
    url = model.constructor.prototype.urlRoot;
    url += "/" + (model.get('original') || model.id) + "/files";
    this.url = url;
  }

  return ModelFiles;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/DocumentFiles.js.map