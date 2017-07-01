require.register("templates/courses/hero-select-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h3 data-i18n=\"courses.select_your_hero\"></h3><h4 data-i18n=\"courses.select_your_hero_description\"></h4></div></div><div class=\"modal-body\"><div id=\"hero-select-view\"></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"select-hero-btn btn btn-lg btn-forest\"><span data-i18n=\"courses.select_this_hero\"></span></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/courses/HeroSelectModal", function(exports, require, module) {
var Classroom, HeroSelectModal, HeroSelectView, ModalView, State, ThangType, ThangTypes, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

HeroSelectView = require('views/core/HeroSelectView');

template = require('templates/courses/hero-select-modal');

Classroom = require('models/Classroom');

ThangTypes = require('collections/ThangTypes');

State = require('models/State');

ThangType = require('models/ThangType');

User = require('models/User');

module.exports = HeroSelectModal = (function(superClass) {
  extend(HeroSelectModal, superClass);

  function HeroSelectModal() {
    return HeroSelectModal.__super__.constructor.apply(this, arguments);
  }

  HeroSelectModal.prototype.id = 'hero-select-modal';

  HeroSelectModal.prototype.template = template;

  HeroSelectModal.prototype.retainSubviews = true;

  HeroSelectModal.prototype.events = {
    'click .select-hero-btn': 'onClickSelectHeroButton'
  };

  HeroSelectModal.prototype.initialize = function() {
    return this.listenTo(this.insertSubView(new HeroSelectView({
      showCurrentHero: true
    })), 'hero-select:success', function(hero) {
      return this.trigger('hero-select:success', hero);
    });
  };

  HeroSelectModal.prototype.onClickSelectHeroButton = function() {
    return this.hide();
  };

  return HeroSelectModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/HeroSelectModal.js.map