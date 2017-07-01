require.register("models/UserCodeProblem", function(exports, require, module) {
var CocoModel, UserCodeProblem,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = UserCodeProblem = (function(superClass) {
  extend(UserCodeProblem, superClass);

  function UserCodeProblem() {
    return UserCodeProblem.__super__.constructor.apply(this, arguments);
  }

  UserCodeProblem.className = 'UserCodeProblem';

  UserCodeProblem.schema = require('schemas/models/user_code_problem');

  UserCodeProblem.prototype.urlRoot = '/db/user.code.problem';

  return UserCodeProblem;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/UserCodeProblem.js.map