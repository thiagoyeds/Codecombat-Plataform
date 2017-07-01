require.register("views/contribute/MainContributeView", function(exports, require, module) {
var ContributeClassView, MainContributeView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContributeClassView = require('views/contribute/ContributeClassView');

template = require('templates/contribute/contribute');

module.exports = MainContributeView = (function(superClass) {
  extend(MainContributeView, superClass);

  function MainContributeView() {
    return MainContributeView.__super__.constructor.apply(this, arguments);
  }

  MainContributeView.prototype.id = 'contribute-view';

  MainContributeView.prototype.template = template;

  MainContributeView.prototype.events = {
    'change input[type="checkbox"]': 'onCheckboxChanged'
  };

  return MainContributeView;

})(ContributeClassView);
});

;
//# sourceMappingURL=/javascripts/app/views/contribute/MainContributeView.js.map