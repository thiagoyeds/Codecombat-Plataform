require.register("views/contribute/AdventurerView", function(exports, require, module) {
var AdventurerView, ContributeClassView, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContributeClassView = require('./ContributeClassView');

template = require('templates/contribute/adventurer');

me = require('core/auth').me;

module.exports = AdventurerView = (function(superClass) {
  extend(AdventurerView, superClass);

  function AdventurerView() {
    return AdventurerView.__super__.constructor.apply(this, arguments);
  }

  AdventurerView.prototype.id = 'adventurer-view';

  AdventurerView.prototype.template = template;

  AdventurerView.prototype.initialize = function() {
    return this.contributorClassName = 'adventurer';
  };

  return AdventurerView;

})(ContributeClassView);
});

;
//# sourceMappingURL=/javascripts/app/views/contribute/AdventurerView.js.map