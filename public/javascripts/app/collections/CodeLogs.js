require.register("collections/CodeLogs", function(exports, require, module) {
var CocoCollection, CodeLog, CodeLogCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

CodeLog = require('models/CodeLog');

module.exports = CodeLogCollection = (function(superClass) {
  extend(CodeLogCollection, superClass);

  function CodeLogCollection() {
    return CodeLogCollection.__super__.constructor.apply(this, arguments);
  }

  CodeLogCollection.prototype.url = '/db/codelogs';

  CodeLogCollection.prototype.model = CodeLog;

  CodeLogCollection.prototype.fetchByUserID = function(userID, options) {
    if (options == null) {
      options = {};
    }
    options.url = '/db/codelogs?filter[userID]="' + userID + '"';
    return this.fetch(options);
  };

  CodeLogCollection.prototype.fetchBySlug = function(slug, options) {
    if (options == null) {
      options = {};
    }
    options.url = '/db/codelogs?filter[levelSlug]="' + slug + '"';
    return this.fetch(options);
  };

  CodeLogCollection.prototype.fetchLatest = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = '/db/codelogs?conditions[sort]="-created"';
    return this.fetch(options);
  };

  return CodeLogCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/CodeLogs.js.map