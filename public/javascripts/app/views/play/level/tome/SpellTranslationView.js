require.register("views/play/level/tome/SpellTranslationView", function(exports, require, module) {
var CocoView, LevelComponent, Range, SpellTranslationView, TokenIterator, ace, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

LevelComponent = require('models/LevelComponent');

template = require('templates/play/level/tome/spell_translation');

ace = require('ace');

Range = ace.require('ace/range').Range;

TokenIterator = ace.require('ace/token_iterator').TokenIterator;

utils = require('core/utils');

module.exports = SpellTranslationView = (function(superClass) {
  extend(SpellTranslationView, superClass);

  SpellTranslationView.prototype.className = 'spell-translation-view';

  SpellTranslationView.prototype.template = template;

  SpellTranslationView.prototype.events = {
    'mousemove': function() {
      return this.$el.hide();
    }
  };

  function SpellTranslationView(options) {
    this.onMouseMove = bind(this.onMouseMove, this);
    this.setTooltipText = bind(this.setTooltipText, this);
    var levelComponents;
    SpellTranslationView.__super__.constructor.call(this, options);
    this.ace = options.ace;
    levelComponents = this.supermodel.getModels(LevelComponent);
    this.componentTranslations = levelComponents.reduce(function(acc, lc) {
      var doc, i, len, ref, ref1, translated;
      ref1 = (ref = lc.get('propertyDocumentation')) != null ? ref : [];
      for (i = 0, len = ref1.length; i < len; i++) {
        doc = ref1[i];
        translated = utils.i18n(doc, 'name', null, false);
        if (translated !== doc.name) {
          acc[doc.name] = translated;
        }
      }
      return acc;
    }, {});
    this.onMouseMove = _.throttle(this.onMouseMove, 25);
  }

  SpellTranslationView.prototype.afterRender = function() {
    SpellTranslationView.__super__.afterRender.call(this);
    return this.ace.on('mousemove', this.onMouseMove);
  };

  SpellTranslationView.prototype.setTooltipText = function(text) {
    this.$el.find('code').text(text);
    return this.$el.show().css(this.pos);
  };

  SpellTranslationView.prototype.isIdentifier = function(t) {
    return t && (_.any([/identifier/, /keyword/], function(regex) {
      return regex.test(t.type);
    }) || t.value === 'this');
  };

  SpellTranslationView.prototype.onMouseMove = function(e) {
    var end, endOfLine, error, error1, it, pos, ref, start, token;
    if (this.destroyed) {
      return;
    }
    pos = e.getDocumentPosition();
    it = new TokenIterator(e.editor.session, pos.row, pos.column);
    endOfLine = ((ref = it.getCurrentToken()) != null ? ref.index : void 0) === it.$rowTokens.length - 1;
    while (it.getCurrentTokenRow() === pos.row && !this.isIdentifier(token = it.getCurrentToken())) {
      if (endOfLine || !token) {
        break;
      }
      it.stepBackward();
    }
    if (!this.isIdentifier(token)) {
      this.word = null;
      this.update();
      return;
    }
    try {
      start = it.getCurrentTokenColumn();
    } catch (error1) {
      error = error1;
      start = 0;
    }
    end = start + token.value.length;
    if (this.isIdentifier(token)) {
      this.word = token.value;
      this.markerRange = new Range(pos.row, start, pos.row, end);
      this.reposition(e.domEvent);
    }
    return this.update();
  };

  SpellTranslationView.prototype.reposition = function(e) {
    var offsetX, offsetY, ref, ref1, w;
    offsetX = (ref = e.offsetX) != null ? ref : e.clientX - $(e.target).offset().left;
    offsetY = (ref1 = e.offsetY) != null ? ref1 : e.clientY - $(e.target).offset().top;
    w = $(document).width() - 20;
    if (e.clientX + this.$el.width() > w) {
      offsetX = w - $(e.target).offset().left - this.$el.width();
    }
    this.pos = {
      left: offsetX + 80,
      top: offsetY - 20
    };
    return this.$el.css(this.pos);
  };

  SpellTranslationView.prototype.onMouseOut = function() {
    this.word = null;
    this.markerRange = null;
    return this.update();
  };

  SpellTranslationView.prototype.update = function() {
    var i18nKey, translation;
    i18nKey = 'code.' + this.word;
    translation = this.componentTranslations[this.word] || $.t(i18nKey);
    if (this.word && translation && (translation !== i18nKey && translation !== this.word)) {
      return this.setTooltipText(translation);
    } else {
      return this.$el.hide();
    }
  };

  SpellTranslationView.prototype.destroy = function() {
    var ref;
    if ((ref = this.ace) != null) {
      ref.removeEventListener('mousemove', this.onMouseMove);
    }
    return SpellTranslationView.__super__.destroy.call(this);
  };

  return SpellTranslationView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellTranslationView.js.map