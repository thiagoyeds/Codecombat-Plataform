require.register("views/contribute/AmbassadorView", function(exports, require, module) {
var AmbassadorView, ContributeClassView, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContributeClassView = require('./ContributeClassView');

template = require('templates/contribute/ambassador');

me = require('core/auth').me;

module.exports = AmbassadorView = (function(superClass) {
  extend(AmbassadorView, superClass);

  function AmbassadorView() {
    return AmbassadorView.__super__.constructor.apply(this, arguments);
  }

  AmbassadorView.prototype.id = 'ambassador-view';

  AmbassadorView.prototype.template = template;

  AmbassadorView.prototype.initialize = function() {
    return this.contributorClassName = 'ambassador';
  };

  return AmbassadorView;

})(ContributeClassView);
});

;
//# sourceMappingURL=/javascripts/app/views/contribute/AmbassadorView.js.map