require.register("models/State", function(exports, require, module) {
var CocoModel, State, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/poll.schema');

module.exports = State = (function(superClass) {
  extend(State, superClass);

  function State() {
    return State.__super__.constructor.apply(this, arguments);
  }

  State.className = 'State';

  return State;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/State.js.map