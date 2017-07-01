require.register("views/admin/BaseView", function(exports, require, module) {
var BaseView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/base');

module.exports = BaseView = (function(superClass) {
  extend(BaseView, superClass);

  function BaseView() {
    return BaseView.__super__.constructor.apply(this, arguments);
  }

  BaseView.prototype.id = 'base-view';

  BaseView.prototype.template = template;

  BaseView.prototype.usesSocialMedia = true;

  return BaseView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/admin/BaseView.js.map