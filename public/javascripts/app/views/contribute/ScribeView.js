require.register("views/contribute/ScribeView", function(exports, require, module) {
var ContributeClassView, ScribeView, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContributeClassView = require('./ContributeClassView');

template = require('templates/contribute/scribe');

me = require('core/auth').me;

module.exports = ScribeView = (function(superClass) {
  extend(ScribeView, superClass);

  function ScribeView() {
    return ScribeView.__super__.constructor.apply(this, arguments);
  }

  ScribeView.prototype.id = 'scribe-view';

  ScribeView.prototype.template = template;

  ScribeView.prototype.initialize = function() {
    return this.contributorClassName = 'scribe';
  };

  ScribeView.prototype.contributors = [
    {
      name: 'Ryan Faidley'
    }, {
      name: 'Mischa Lewis-Norelle',
      github: 'mlewisno'
    }, {
      name: 'Tavio'
    }, {
      name: 'Ronnie Cheng',
      github: 'rhc2104'
    }, {
      name: 'engstrom'
    }, {
      name: 'Dman19993'
    }, {
      name: 'mattinsler'
    }
  ];

  return ScribeView;

})(ContributeClassView);
});

;
//# sourceMappingURL=/javascripts/app/views/contribute/ScribeView.js.map