require.register("views/CareersView", function(exports, require, module) {
var CareersView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/careers');

module.exports = CareersView = (function(superClass) {
  extend(CareersView, superClass);

  CareersView.prototype.id = 'careers-view';

  CareersView.prototype.template = template;

  function CareersView(options, position) {
    this.position = position;
    CareersView.__super__.constructor.call(this, options);
  }

  return CareersView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/CareersView.js.map