require.register("templates/play/level/hints-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<button class=\"close-hint-btn btn btn-illustrated btn-danger\"><span class=\"glyphicon glyphicon-remove\"></span></button><h1 class=\"text-center hint-title\"><span>" + (jade.escape(null == (jade.interp = view.state.get('hintsTitle')) ? "" : jade.interp)) + "</span></h1><div class=\"hint-body\">" + (null == (jade.interp = view.getProcessedHint()) ? "" : jade.interp) + "</div><div class=\"row btn-area\"><div class=\"col-md-4\">");
if ( view.state.get('hintIndex') > 0)
{
buf.push("<button data-i18n=\"about.previous\" class=\"previous-btn btn btn-illustrated pull-left\"></button>");
}
buf.push("</div><div class=\"col-md-4\"><h2 class=\"text-center hint-pagination\">" + (jade.escape((jade.interp = view.state.get('hintIndex')+1) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = view.hintsState.get('total')) == null ? '' : jade.interp)) + "</h2></div><div class=\"col-md-4\">");
if ( view.state.get('hintIndex') < view.hintsState.get('total') - 1)
{
buf.push("<button data-i18n=\"play.next\" class=\"next-btn btn btn-illustrated pull-right\"></button>");
}
buf.push("</div></div><div class=\"clearfix\"></div>");;return buf.join("");
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

;require.register("views/play/level/HintsView", function(exports, require, module) {
var CocoView, HintsView, State, ace, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

State = require('models/State');

ace = require('ace');

utils = require('core/utils');

module.exports = HintsView = (function(superClass) {
  extend(HintsView, superClass);

  function HintsView() {
    this.incrementHintViewTime = bind(this.incrementHintViewTime, this);
    return HintsView.__super__.constructor.apply(this, arguments);
  }

  HintsView.prototype.template = require('templates/play/level/hints-view');

  HintsView.prototype.className = 'hints-view';

  HintsView.prototype.hintUsedThresholdSeconds = 10;

  HintsView.prototype.events = {
    'click .next-btn': 'onClickNextButton',
    'click .previous-btn': 'onClickPreviousButton',
    'click .close-hint-btn': 'hideView'
  };

  HintsView.prototype.subscriptions = {
    'level:show-victory': 'hideView',
    'tome:manual-cast': 'hideView'
  };

  HintsView.prototype.initialize = function(options) {
    var debouncedRender;
    this.level = options.level, this.session = options.session, this.hintsState = options.hintsState;
    this.state = new State({
      hintIndex: 0,
      hintsViewTime: {},
      hintsUsed: {}
    });
    this.updateHint();
    debouncedRender = _.debounce(this.render);
    this.listenTo(this.state, 'change', debouncedRender);
    this.listenTo(this.hintsState, 'change', debouncedRender);
    this.listenTo(this.state, 'change:hintIndex', this.updateHint);
    return this.listenTo(this.hintsState, 'change:hidden', this.visibilityChanged);
  };

  HintsView.prototype.destroy = function() {
    clearInterval(this.timerIntervalID);
    return HintsView.__super__.destroy.call(this);
  };

  HintsView.prototype.afterRender = function() {
    var aceEditors, codeLanguage, i, len, oldEditor, ref, ref1, ref2;
    this.$el.toggleClass('hide', this.hintsState.get('hidden'));
    HintsView.__super__.afterRender.call(this);
    this.playSound('game-menu-open');
    this.$('a').attr('target', '_blank');
    codeLanguage = this.options.session.get('codeLanguage') || ((ref = me.get('aceConfig')) != null ? ref.language : void 0) || 'python';
    ref2 = (ref1 = this.aceEditors) != null ? ref1 : [];
    for (i = 0, len = ref2.length; i < len; i++) {
      oldEditor = ref2[i];
      oldEditor.destroy();
    }
    this.aceEditors = [];
    aceEditors = this.aceEditors;
    return this.$el.find('pre:has(code[class*="lang-"])').each(function() {
      var aceEditor;
      aceEditor = utils.initializeACE(this, codeLanguage);
      return aceEditors.push(aceEditor);
    });
  };

  HintsView.prototype.getProcessedHint = function() {
    var filtered, hint, language, markedUp, translated;
    language = this.session.get('codeLanguage');
    hint = this.state.get('hint');
    if (!hint) {
      return;
    }
    translated = utils.i18n(hint, 'body');
    filtered = utils.filterMarkdownCodeLanguages(translated, language);
    markedUp = marked(filtered);
    return markedUp;
  };

  HintsView.prototype.updateHint = function() {
    var hintsTitle, index;
    index = this.state.get('hintIndex');
    hintsTitle = $.i18n.t('play_level.hints_title').replace('{{number}}', index + 1);
    return this.state.set({
      hintsTitle: hintsTitle,
      hint: this.hintsState.getHint(index)
    });
  };

  HintsView.prototype.onClickNextButton = function() {
    var max, ref, ref1, ref2;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Hints Next Clicked', {
        category: 'Students',
        levelSlug: this.level.get('slug'),
        hintCount: (ref1 = (ref2 = this.hintsState.get('hints')) != null ? ref2.length : void 0) != null ? ref1 : 0,
        hintCurrent: this.state.get('hintIndex')
      }, []);
    }
    max = this.hintsState.get('total') - 1;
    this.state.set('hintIndex', Math.min(this.state.get('hintIndex') + 1, max));
    this.playSound('menu-button-click');
    return this.updateHintTimer();
  };

  HintsView.prototype.onClickPreviousButton = function() {
    var ref, ref1, ref2;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Hints Previous Clicked', {
        category: 'Students',
        levelSlug: this.level.get('slug'),
        hintCount: (ref1 = (ref2 = this.hintsState.get('hints')) != null ? ref2.length : void 0) != null ? ref1 : 0,
        hintCurrent: this.state.get('hintIndex')
      }, []);
    }
    this.state.set('hintIndex', Math.max(this.state.get('hintIndex') - 1, 0));
    this.playSound('menu-button-click');
    return this.updateHintTimer();
  };

  HintsView.prototype.hideView = function() {
    var ref;
    if ((ref = this.hintsState) != null) {
      ref.set('hidden', true);
    }
    return this.playSound('game-menu-close');
  };

  HintsView.prototype.visibilityChanged = function(e) {
    return this.updateHintTimer();
  };

  HintsView.prototype.updateHintTimer = function() {
    var ref;
    clearInterval(this.timerIntervalID);
    if (!(this.hintsState.get('hidden') || ((ref = this.state.get('hintsUsed')) != null ? ref[this.state.get('hintIndex')] : void 0))) {
      return this.timerIntervalID = setInterval(this.incrementHintViewTime, 1000);
    }
  };

  HintsView.prototype.incrementHintViewTime = function() {
    var hintIndex, hintsUsed, hintsViewTime, ref, ref1, ref2;
    hintIndex = this.state.get('hintIndex');
    hintsViewTime = this.state.get('hintsViewTime');
    if (hintsViewTime[hintIndex] == null) {
      hintsViewTime[hintIndex] = 0;
    }
    hintsViewTime[hintIndex]++;
    hintsUsed = this.state.get('hintsUsed');
    if (hintsViewTime[hintIndex] > this.hintUsedThresholdSeconds && !hintsUsed[hintIndex]) {
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Hint Used', {
          category: 'Students',
          levelSlug: this.level.get('slug'),
          hintCount: (ref1 = (ref2 = this.hintsState.get('hints')) != null ? ref2.length : void 0) != null ? ref1 : 0,
          hintCurrent: hintIndex
        }, []);
      }
      hintsUsed[hintIndex] = true;
      this.state.set('hintsUsed', hintsUsed);
      clearInterval(this.timerIntervalID);
    }
    return this.state.set('hintsViewTime', hintsViewTime);
  };

  return HintsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/HintsView.js.map