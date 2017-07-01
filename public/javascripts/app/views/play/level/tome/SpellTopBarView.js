require.register("templates/play/level/tome/spell-top-bar-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,maximizeShortcutVerbose = locals_.maximizeShortcutVerbose,codeLanguage = locals_.codeLanguage,beautifyShortcutVerbose = locals_.beautifyShortcutVerbose,view = locals_.view,i18nName = locals_.i18nName,translate = locals_.translate;if ( features.codePlay)
{
buf.push("<img id=\"codeplay-powered-by-banner\" src=\"/images/common/codeplay/CodePlay.png\"/>");
}
buf.push("<div class=\"hinge hinge-0\"></div><div class=\"hinge hinge-1\"></div><div class=\"hinge hinge-2\"></div><div class=\"hinge hinge-3\"></div><div class=\"spell-tool-buttons\"><div data-i18n=\"[title]play_level.tome_reload_method\" class=\"btn btn-small btn-illustrated btn-warning reload-code\"><div class=\"glyphicon glyphicon-repeat\"></div>");
if ( !features.codePlay)
{
buf.push("<span data-i18n=\"play_level.restart\" class=\"spl\"></span>");
}
buf.push("</div>");
if ( me.level() >= 15)
{
buf.push("<div" + (jade.attrs({ 'title':(maximizeShortcutVerbose), "class": [('btn'),('btn-small'),('btn-illustrated'),('fullscreen-code')] }, {"title":true})) + "><div class=\"glyphicon glyphicon-fullscreen\"></div><div class=\"glyphicon glyphicon-resize-small\"></div></div>");
}
if ( codeLanguage === 'javascript' && me.level() >= 15)
{
buf.push("<div" + (jade.attrs({ 'title':(beautifyShortcutVerbose), "class": [('btn'),('btn-small'),('btn-illustrated'),('beautify-code')] }, {"title":true})) + "><div class=\"glyphicon glyphicon-magnet\"></div></div>");
}
if ( view.hintsState && view.hintsState.get('total') > 0)
{
buf.push("<div class=\"btn btn-small btn-illustrated hints-button\"><span data-i18n=\"play_level.hints\"></span></div>");
}
if ( view.options.level.isType('web-dev'))
{
buf.push("<div class=\"btn btn-small btn-illustrated image-gallery-button\"><span data-i18n=\"web_dev.image_gallery_title\"></span></div>");
}
if ( view.options.level.get('shareable'))
{
i18nName = view.options.level.isType('game-dev') ? 'sharing.game' : 'sharing.webpage'
if ( view.options.session.isFake())
{
buf.push("<button" + (jade.attrs({ 'data-i18n':(i18nName), 'data-toggle':("popover"), 'data-placement':("bottom"), 'data-content':(translate('sharing.your_students_preview')), 'data-trigger':("hover"), "class": [('btn'),('btn-small'),('btn-illustrated')] }, {"data-i18n":true,"data-toggle":true,"data-placement":true,"data-content":true,"data-trigger":true})) + "></button>");
}
else
{
var url = '/play/' + view.options.level.get('type') + '-level/' + view.options.level.get('slug') + '/' + view.options.session.id;
if (view.options.courseID) url += '?course=' + view.options.courseID;
buf.push("<a" + (jade.attrs({ 'href':(url), 'data-i18n':(i18nName), "class": [('btn'),('btn-small'),('btn-illustrated')] }, {"href":true,"data-i18n":true})) + "></a>");
}
}
buf.push("<div class=\"clearfix\"></div></div>");;return buf.join("");
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

;require.register("views/play/level/tome/SpellTopBarView", function(exports, require, module) {
var CocoView, ImageGalleryModal, ReloadLevelModal, SpellTopBarView, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

template = require('templates/play/level/tome/spell-top-bar-view');

ReloadLevelModal = require('views/play/level/modal/ReloadLevelModal');

CocoView = require('views/core/CocoView');

ImageGalleryModal = require('views/play/level/modal/ImageGalleryModal');

module.exports = SpellTopBarView = (function(superClass) {
  extend(SpellTopBarView, superClass);

  SpellTopBarView.prototype.template = template;

  SpellTopBarView.prototype.id = 'spell-top-bar-view';

  SpellTopBarView.prototype.controlsEnabled = true;

  SpellTopBarView.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'tome:spell-loaded': 'onSpellLoaded',
    'tome:spell-changed': 'onSpellChanged',
    'tome:spell-changed-language': 'onSpellChangedLanguage',
    'tome:toggle-maximize': 'onToggleMaximize'
  };

  SpellTopBarView.prototype.events = {
    'click .reload-code': 'onCodeReload',
    'click .beautify-code': 'onBeautifyClick',
    'click .fullscreen-code': 'onToggleMaximize',
    'click .hints-button': 'onClickHintsButton',
    'click .image-gallery-button': 'onClickImageGalleryButton'
  };

  function SpellTopBarView(options) {
    this.attachTransitionEventListener = bind(this.attachTransitionEventListener, this);
    this.hintsState = options.hintsState;
    this.spell = options.spell;
    SpellTopBarView.__super__.constructor.call(this, options);
  }

  SpellTopBarView.prototype.getRenderData = function(context) {
    var ctrl, shift;
    if (context == null) {
      context = {};
    }
    context = SpellTopBarView.__super__.getRenderData.call(this, context);
    ctrl = this.isMac() ? 'Cmd' : 'Ctrl';
    shift = $.i18n.t('keyboard_shortcuts.shift');
    context.beautifyShortcutVerbose = ctrl + "+" + shift + "+B: " + ($.i18n.t('keyboard_shortcuts.beautify'));
    context.maximizeShortcutVerbose = ctrl + "+" + shift + "+M: " + ($.i18n.t('keyboard_shortcuts.maximize_editor'));
    context.codeLanguage = this.options.codeLanguage;
    return context;
  };

  SpellTopBarView.prototype.afterRender = function() {
    SpellTopBarView.__super__.afterRender.call(this);
    this.attachTransitionEventListener();
    return this.$('[data-toggle="popover"]').popover();
  };

  SpellTopBarView.prototype.onDisableControls = function(e) {
    return this.toggleControls(e, false);
  };

  SpellTopBarView.prototype.onEnableControls = function(e) {
    return this.toggleControls(e, true);
  };

  SpellTopBarView.prototype.onClickImageGalleryButton = function(e) {
    return this.openModalView(new ImageGalleryModal());
  };

  SpellTopBarView.prototype.onClickHintsButton = function() {
    var ref, ref1, ref2;
    if (this.hintsState == null) {
      return;
    }
    this.hintsState.set('hidden', !this.hintsState.get('hidden'));
    return (ref = window.tracker) != null ? ref.trackEvent('Hints Clicked', {
      category: 'Students',
      levelSlug: this.options.level.get('slug'),
      hintCount: (ref1 = (ref2 = this.hintsState.get('hints')) != null ? ref2.length : void 0) != null ? ref1 : 0
    }, []) : void 0;
  };

  SpellTopBarView.prototype.onCodeReload = function(e) {
    if (key.shift) {
      return Backbone.Mediator.publish('level:restart', {});
    } else {
      return this.openModalView(new ReloadLevelModal());
    }
  };

  SpellTopBarView.prototype.onBeautifyClick = function(e) {
    if (!this.controlsEnabled) {
      return;
    }
    return Backbone.Mediator.publish('tome:spell-beautify', {
      spell: this.spell
    });
  };

  SpellTopBarView.prototype.onToggleMaximize = function(e) {
    var $codearea;
    $codearea = $('html');
    if (!$codearea.hasClass('fullscreen-editor')) {
      $('#code-area').css('z-index', 20);
    }
    $('html').toggleClass('fullscreen-editor');
    $('.fullscreen-code').toggleClass('maximized');
    return Backbone.Mediator.publish('tome:maximize-toggled', {});
  };

  SpellTopBarView.prototype.updateReloadButton = function() {
    var changed;
    changed = this.spell.hasChanged(null, this.spell.getSource());
    return this.$el.find('.reload-code').css('display', changed ? 'inline-block' : 'none');
  };

  SpellTopBarView.prototype.onSpellLoaded = function(e) {
    if (e.spell !== this.spell) {
      return;
    }
    return this.updateReloadButton();
  };

  SpellTopBarView.prototype.onSpellChanged = function(e) {
    if (e.spell !== this.spell) {
      return;
    }
    return this.updateReloadButton();
  };

  SpellTopBarView.prototype.onSpellChangedLanguage = function(e) {
    if (e.spell !== this.spell) {
      return;
    }
    this.options.codeLanguage = e.language;
    this.render();
    return this.updateReloadButton();
  };

  SpellTopBarView.prototype.toggleControls = function(e, enabled) {
    if (e.controls && !(indexOf.call(e.controls, 'editor') >= 0)) {
      return;
    }
    if (enabled === this.controlsEnabled) {
      return;
    }
    this.controlsEnabled = enabled;
    return this.$el.toggleClass('read-only', !enabled);
  };

  SpellTopBarView.prototype.attachTransitionEventListener = function() {
    var $codearea, testEl, transition, transitionEvent, transitionListener, transitions;
    transitionListener = '';
    testEl = document.createElement('fakeelement');
    transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (transition in transitions) {
      transitionEvent = transitions[transition];
      if (testEl.style[transition] !== void 0) {
        transitionListener = transitionEvent;
        break;
      }
    }
    $codearea = $('#code-area');
    return $codearea.on(transitionListener, (function(_this) {
      return function() {
        if (!$('html').hasClass('fullscreen-editor')) {
          return $codearea.css('z-index', 2);
        }
      };
    })(this));
  };

  SpellTopBarView.prototype.destroy = function() {
    return SpellTopBarView.__super__.destroy.call(this);
  };

  return SpellTopBarView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellTopBarView.js.map