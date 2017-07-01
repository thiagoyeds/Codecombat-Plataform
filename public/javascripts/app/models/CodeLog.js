require.register("models/CodeLog", function(exports, require, module) {
var CocoModel, CodeLog,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = CodeLog = (function(superClass) {
  extend(CodeLog, superClass);

  function CodeLog() {
    return CodeLog.__super__.constructor.apply(this, arguments);
  }

  CodeLog.className = 'CodeLog';

  CodeLog.schema = require('schemas/models/codelog.schema');

  CodeLog.prototype.urlRoot = '/db/codelogs';

  return CodeLog;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/CodeLog.js.map