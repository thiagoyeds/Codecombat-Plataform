require.register("views/NotFoundView", function(exports, require, module) {
var NotFoundView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/core/not-found');

module.exports = NotFoundView = (function(superClass) {
  extend(NotFoundView, superClass);

  function NotFoundView() {
    return NotFoundView.__super__.constructor.apply(this, arguments);
  }

  NotFoundView.prototype.id = 'not-found-view';

  NotFoundView.prototype.template = template;

  return NotFoundView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/NotFoundView.js.map