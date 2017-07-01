require.register("templates/courses/choose-language-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"text-center\"><h2 data-i18n=\"courses.greetings\" class=\"modal-title\"></h2><h3 data-i18n=\"choose_hero.programming_language_description\"></h3></div></div><div class=\"modal-body\"><div id=\"choice-area\" class=\"text-center\"><button data-language=\"python\" class=\"lang-choice-btn btn btn-success btn-lg\"><img src=\"/images/common/code_languages/python_small.png\"/><span class=\"spl\">Python</span></button><p data-i18n=\"choose_hero.python_blurb\"></p><button data-language=\"javascript\" class=\"lang-choice-btn btn btn-default\"><img src=\"/images/common/code_languages/javascript_small.png\"/><span class=\"spl\">JavaScript</span></button><p data-i18n=\"choose_hero.javascript_blurb\"></p></div><div id=\"saving-progress\" class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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

;require.register("views/courses/ChooseLanguageModal", function(exports, require, module) {
var ChooseLanguageModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/choose-language-modal');

module.exports = ChooseLanguageModal = (function(superClass) {
  extend(ChooseLanguageModal, superClass);

  function ChooseLanguageModal() {
    return ChooseLanguageModal.__super__.constructor.apply(this, arguments);
  }

  ChooseLanguageModal.prototype.id = 'choose-language-modal';

  ChooseLanguageModal.prototype.template = template;

  ChooseLanguageModal.prototype.events = {
    'click .lang-choice-btn': 'onClickLanguageChoiceButton'
  };

  ChooseLanguageModal.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.logoutFirst = options.logoutFirst;
  };

  ChooseLanguageModal.prototype.onClickLanguageChoiceButton = function(e) {
    this.chosenLanguage = $(e.target).closest('.lang-choice-btn').data('language');
    if (this.logoutFirst) {
      return this.logoutUser();
    } else {
      return this.saveLanguageSetting();
    }
  };

  ChooseLanguageModal.prototype.logoutUser = function() {
    return $.ajax({
      method: 'POST',
      url: '/auth/logout',
      context: this,
      success: this.onUserLoggedOut
    });
  };

  ChooseLanguageModal.prototype.onUserLoggedOut = function() {
    me.clear();
    me.fetch({
      url: '/auth/whoami'
    });
    return this.listenToOnce(me, 'sync', this.saveLanguageSetting);
  };

  ChooseLanguageModal.prototype.saveLanguageSetting = function() {
    var aceConfig, res;
    aceConfig = _.clone(me.get('aceConfig') || {});
    aceConfig.language = this.chosenLanguage;
    me.set('aceConfig', aceConfig);
    res = me.patch();
    if (res) {
      this.$('#choice-area').hide();
      this.$('#saving-progress').removeClass('hide');
      return this.listenToOnce(me, 'sync', this.onLanguageSettingSaved);
    } else {
      return this.onLanguageSettingSaved();
    }
  };

  ChooseLanguageModal.prototype.onLanguageSettingSaved = function() {
    var ref;
    this.trigger('set-language');
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Chose language', {
        category: 'Courses',
        label: this.chosenLanguage
      });
    }
    return this.hide();
  };

  return ChooseLanguageModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/ChooseLanguageModal.js.map