require.register("views/PrivacyView", function(exports, require, module) {
var PrivacyView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/privacy');

module.exports = PrivacyView = (function(superClass) {
  extend(PrivacyView, superClass);

  function PrivacyView() {
    return PrivacyView.__super__.constructor.apply(this, arguments);
  }

  PrivacyView.prototype.id = 'privacy-view';

  PrivacyView.prototype.template = template;

  return PrivacyView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/PrivacyView.js.map