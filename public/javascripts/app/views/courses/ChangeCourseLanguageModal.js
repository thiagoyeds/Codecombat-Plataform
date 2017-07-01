require.register("templates/courses/change-course-language-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"courses.change_language\"></h3><div class=\"clearfix\"></div></div><div class=\"modal-body\"><div id=\"choice-area\" class=\"text-center\">");
var currentLanguage = (me.get('aceConfig') || {}).language || 'python';
buf.push("<button data-language=\"python\" class=\"lang-choice-btn btn btn-success btn-lg\">");
if ( currentLanguage === 'python')
{
buf.push("<span data-i18n=\"courses.keep_using\" class=\"spr\"></span><span>Python</span>");
}
else
{
buf.push("<span data-i18n=\"courses.switch_to\" class=\"spr\"></span><span>Python</span>");
}
buf.push("</button><p><span class=\"spr\">-</span><span data-i18n=\"general.or\" class=\"text-uppercase\"></span><span class=\"spl\">-</span></p><button data-language=\"javascript\" class=\"lang-choice-btn btn btn-default\">");
if ( currentLanguage === 'javascript')
{
buf.push("<span data-i18n=\"courses.keep_using\" class=\"spr\"></span><span>JavaScript</span>");
}
else
{
buf.push("<span data-i18n=\"courses.switch_to\" class=\"spr\"></span><span>JavaScript</span>");
}
buf.push("</button></div><div id=\"saving-progress\" class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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

;require.register("views/courses/ChangeCourseLanguageModal", function(exports, require, module) {
var ChangeCourseLanguageModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/change-course-language-modal');

module.exports = ChangeCourseLanguageModal = (function(superClass) {
  extend(ChangeCourseLanguageModal, superClass);

  function ChangeCourseLanguageModal() {
    return ChangeCourseLanguageModal.__super__.constructor.apply(this, arguments);
  }

  ChangeCourseLanguageModal.prototype.id = 'change-course-language-modal';

  ChangeCourseLanguageModal.prototype.template = template;

  ChangeCourseLanguageModal.prototype.events = {
    'click .lang-choice-btn': 'onClickLanguageChoiceButton'
  };

  ChangeCourseLanguageModal.prototype.onClickLanguageChoiceButton = function(e) {
    var aceConfig, res;
    this.chosenLanguage = $(e.target).closest('.lang-choice-btn').data('language');
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

  ChangeCourseLanguageModal.prototype.onLanguageSettingSaved = function() {
    var ref;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Student changed language', {
        category: 'Courses',
        label: this.chosenLanguage
      });
    }
    this.trigger('set-language');
    return this.hide();
  };

  return ChangeCourseLanguageModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/ChangeCourseLanguageModal.js.map