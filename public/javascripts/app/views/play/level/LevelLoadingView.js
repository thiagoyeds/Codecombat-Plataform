require.register("views/play/level/LevelLoadingView", function(exports, require, module) {
var CocoView, LevelLoadingView, SubscribeModal, ace, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/level_loading');

ace = require('ace');

utils = require('core/utils');

SubscribeModal = require('views/core/SubscribeModal');

module.exports = LevelLoadingView = (function(superClass) {
  extend(LevelLoadingView, superClass);

  function LevelLoadingView() {
    this.onWindowResize = bind(this.onWindowResize, this);
    this.onUnveilEnded = bind(this.onUnveilEnded, this);
    this.unveilIntro = bind(this.unveilIntro, this);
    this.onClickStartLevel = bind(this.onClickStartLevel, this);
    this.finishShowingReady = bind(this.finishShowingReady, this);
    return LevelLoadingView.__super__.constructor.apply(this, arguments);
  }

  LevelLoadingView.prototype.id = 'level-loading-view';

  LevelLoadingView.prototype.template = template;

  LevelLoadingView.prototype.events = {
    'mousedown .start-level-button': 'startUnveiling',
    'click .start-level-button': 'onClickStartLevel',
    'click .start-subscription-button': 'onClickStartSubscription'
  };

  LevelLoadingView.prototype.subscriptions = {
    'level:loaded': 'onLevelLoaded',
    'level:session-loaded': 'onSessionLoaded',
    'level:subscription-required': 'onSubscriptionRequired',
    'level:course-membership-required': 'onCourseMembershipRequired',
    'subscribe-modal:subscribed': 'onSubscribed'
  };

  LevelLoadingView.prototype.shortcuts = {
    'enter': 'onEnterPressed'
  };

  LevelLoadingView.prototype.afterRender = function() {
    var ref, ref1, tip, tips;
    LevelLoadingView.__super__.afterRender.call(this);
    if (!((ref = this.level) != null ? ref.get('loadingTip') : void 0)) {
      if (_.random(1, 10) < 9) {
        this.$el.find('.tip.rare').remove();
      }
      tips = this.$el.find('.tip').addClass('to-remove');
      tip = _.sample(tips);
      $(tip).removeClass('to-remove').addClass('secret');
      this.$el.find('.to-remove').remove();
    }
    if ((ref1 = this.options.level) != null ? ref1.get('goals') : void 0) {
      this.onLevelLoaded({
        level: this.options.level
      });
    }
    return this.configureACEEditors();
  };

  LevelLoadingView.prototype.configureACEEditors = function() {
    var aceEditors, codeLanguage, i, len, oldEditor, ref, ref1, ref2, ref3;
    codeLanguage = ((ref = this.session) != null ? ref.get('codeLanguage') : void 0) || ((ref1 = me.get('aceConfig')) != null ? ref1.language : void 0) || 'python';
    ref3 = (ref2 = this.aceEditors) != null ? ref2 : [];
    for (i = 0, len = ref3.length; i < len; i++) {
      oldEditor = ref3[i];
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

  LevelLoadingView.prototype.afterInsert = function() {
    return LevelLoadingView.__super__.afterInsert.call(this);
  };

  LevelLoadingView.prototype.onLevelLoaded = function(e) {
    if (this.level) {
      return;
    }
    this.level = e.level;
    this.prepareGoals(e);
    this.prepareTip();
    return this.prepareIntro();
  };

  LevelLoadingView.prototype.onSessionLoaded = function(e) {
    if (this.session) {
      return;
    }
    if (e.session.get('creator') === me.id) {
      return this.session = e.session;
    }
  };

  LevelLoadingView.prototype.prepareGoals = function(e) {
    var goal, goalContainer, goalCount, goalID, goalList, name, ref;
    goalContainer = this.$el.find('.level-loading-goals');
    goalList = goalContainer.find('ul');
    goalCount = 0;
    ref = this.level.get('goals');
    for (goalID in ref) {
      goal = ref[goalID];
      if (!((!goal.team || goal.team === (e.team || 'humans')) && !goal.hiddenGoal)) {
        continue;
      }
      if (goal.optional && this.level.isType('course')) {
        continue;
      }
      name = utils.i18n(goal, 'name');
      goalList.append($('<li>').text(name));
      ++goalCount;
    }
    if (goalCount) {
      goalContainer.removeClass('secret');
      if (goalCount === 1) {
        return goalContainer.find('.panel-heading').text($.i18n.t('play_level.goal'));
      }
    }
  };

  LevelLoadingView.prototype.prepareTip = function() {
    var loadingTip, tip;
    tip = this.$el.find('.tip');
    if (this.level.get('loadingTip')) {
      loadingTip = utils.i18n(this.level.attributes, 'loadingTip');
      loadingTip = marked(loadingTip);
      tip.html(loadingTip).removeAttr('data-i18n');
    }
    return tip.removeClass('secret');
  };

  LevelLoadingView.prototype.prepareIntro = function() {
    var ref, specific;
    this.docs = (ref = this.level.get('documentation')) != null ? ref : {};
    specific = this.docs.specificArticles || [];
    this.intro = _.find(specific, {
      name: 'Intro'
    });
    if (window.serverConfig.picoCTF) {
      return this.intro != null ? this.intro : this.intro = {
        body: ''
      };
    }
  };

  LevelLoadingView.prototype.showReady = function() {
    if (this.shownReady) {
      return;
    }
    this.shownReady = true;
    return _.delay(this.finishShowingReady, 100);
  };

  LevelLoadingView.prototype.finishShowingReady = function() {
    var autoUnveil, ref, showIntro;
    if (this.destroyed) {
      return;
    }
    showIntro = this.getQueryVariable('intro');
    autoUnveil = !showIntro && (this.options.autoUnveil || ((ref = this.session) != null ? ref.get('state').complete : void 0));
    if (autoUnveil) {
      this.startUnveiling();
      return this.unveil(true);
    } else {
      this.playSound('level_loaded', 0.75);
      this.$el.find('.progress').hide();
      this.$el.find('.start-level-button').show();
      return this.unveil(false);
    }
  };

  LevelLoadingView.prototype.startUnveiling = function(e) {
    this.playSound('menu-button-click');
    this.unveiling = true;
    Backbone.Mediator.publish('level:loading-view-unveiling', {});
    return _.delay(this.onClickStartLevel, 1000);
  };

  LevelLoadingView.prototype.onClickStartLevel = function(e) {
    if (this.destroyed) {
      return;
    }
    return this.unveil(true);
  };

  LevelLoadingView.prototype.onEnterPressed = function(e) {
    if (!(this.shownReady && !this.unveiled)) {
      return;
    }
    this.startUnveiling();
    return this.onClickStartLevel();
  };

  LevelLoadingView.prototype.unveil = function(full) {
    var duration;
    if (this.destroyed || this.unveiled) {
      return;
    }
    this.unveiled = full;
    this.$loadingDetails = this.$el.find('#loading-details');
    duration = parseFloat(this.$loadingDetails.css('transition-duration')) * 1000;
    if (!this.$el.hasClass('unveiled')) {
      this.$el.addClass('unveiled');
      this.unveilWings(duration);
    }
    if (full) {
      this.unveilLoadingFull();
      return _.delay(this.onUnveilEnded, duration);
    } else {
      return this.unveilLoadingPreview(duration);
    }
  };

  LevelLoadingView.prototype.unveilLoadingFull = function() {
    if (!this.unveiling) {
      Backbone.Mediator.publish('level:loading-view-unveiling', {});
      this.unveiling = true;
    }
    if (this.$el.hasClass('preview-screen')) {
      this.$loadingDetails.css('right', -this.$loadingDetails.outerWidth(true));
    } else {
      this.$loadingDetails.css('top', -this.$loadingDetails.outerHeight(true));
    }
    this.$el.removeClass('preview-screen');
    return $('#canvas-wrapper').removeClass('preview-overlay');
  };

  LevelLoadingView.prototype.unveilLoadingPreview = function(duration) {
    if (this.$el.hasClass('preview-screen')) {
      return;
    }
    $('#canvas-wrapper').addClass('preview-overlay');
    this.$el.addClass('preview-screen');
    this.$loadingDetails.addClass('preview');
    this.resize();
    this.onWindowResize = _.debounce(this.onWindowResize, 700);
    $(window).on('resize', this.onWindowResize);
    if (this.intro) {
      this.$el.find('.progress-or-start-container').addClass('intro-footer');
      this.$el.find('#tip-wrapper').remove();
      return _.delay(this.unveilIntro, duration);
    }
  };

  LevelLoadingView.prototype.resize = function() {
    var $intro, maxHeight, minHeight;
    maxHeight = $('#page-container').outerHeight(true);
    minHeight = $('#code-area').outerHeight(true);
    minHeight -= 20;
    this.$el.css({
      height: maxHeight
    });
    this.$loadingDetails.css({
      minHeight: minHeight,
      maxHeight: maxHeight
    });
    if (this.intro) {
      $intro = this.$el.find('.intro-doc');
      $intro.css({
        height: minHeight - $intro.offset().top - this.$el.find('.progress-or-start-container').outerHeight() - 30 - 20
      });
      return _.defer(function() {
        return $intro.find('.nano').nanoScroller({
          alwaysVisible: true
        });
      });
    }
  };

  LevelLoadingView.prototype.unveilWings = function(duration) {
    var ref;
    this.playSound('loading-view-unveil', 0.5);
    this.$el.find('.left-wing').css({
      left: '-100%',
      backgroundPosition: 'right -400px top 0'
    });
    this.$el.find('.right-wing').css({
      right: '-100%',
      backgroundPosition: 'left -400px top 0'
    });
    if (!((ref = this.level) != null ? ref.isType('web-dev') : void 0)) {
      return $('#level-footer-background').detach().appendTo('#page-container').slideDown(duration);
    }
  };

  LevelLoadingView.prototype.unveilIntro = function() {
    var html, language, problem, ref;
    if (this.destroyed || !this.intro || this.unveiled) {
      return;
    }
    if (window.serverConfig.picoCTF && (problem = this.level.picoCTFProblem)) {
      html = marked("### " + problem.name + "\n\n" + this.intro.body + "\n\n" + problem.description + "\n\n" + problem.category + " - " + problem.score + " points", {
        sanitize: false
      });
    } else {
      language = (ref = this.session) != null ? ref.get('codeLanguage') : void 0;
      html = marked(utils.filterMarkdownCodeLanguages(utils.i18n(this.intro, 'body'), language));
    }
    this.$el.find('.intro-doc').removeClass('hidden').find('.intro-doc-content').html(html);
    this.resize();
    return this.configureACEEditors();
  };

  LevelLoadingView.prototype.onUnveilEnded = function() {
    if (this.destroyed) {
      return;
    }
    return Backbone.Mediator.publish('level:loading-view-unveiled', {
      view: this
    });
  };

  LevelLoadingView.prototype.onWindowResize = function(e) {
    if (this.destroyed) {
      return;
    }
    this.$loadingDetails.css({
      transition: 'none'
    });
    return this.resize();
  };

  LevelLoadingView.prototype.onSubscriptionRequired = function(e) {
    this.$el.find('.level-loading-goals, .tip, .load-progress').hide();
    return this.$el.find('.subscription-required').show();
  };

  LevelLoadingView.prototype.onCourseMembershipRequired = function(e) {
    this.$el.find('.level-loading-goals, .tip, .load-progress').hide();
    return this.$el.find('.course-membership-required').show();
  };

  LevelLoadingView.prototype.onLoadError = function(resource) {
    this.$el.find('.level-loading-goals, .tip, .load-progress').hide();
    return this.$el.find('.could-not-load').show();
  };

  LevelLoadingView.prototype.onClickStartSubscription = function(e) {
    var levelSlug, ref, ref1, ref2;
    this.openModalView(new SubscribeModal());
    levelSlug = ((ref = this.level) != null ? ref.get('slug') : void 0) || ((ref1 = this.options.level) != null ? ref1.get('slug') : void 0);
    return (ref2 = window.tracker) != null ? ref2.trackEvent('Show subscription modal', {
      category: 'Subscription',
      label: 'level loading',
      level: levelSlug,
      levelID: levelSlug
    }) : void 0;
  };

  LevelLoadingView.prototype.onSubscribed = function() {
    return document.location.reload();
  };

  LevelLoadingView.prototype.destroy = function() {
    $(window).off('resize', this.onWindowResize);
    return LevelLoadingView.__super__.destroy.call(this);
  };

  return LevelLoadingView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelLoadingView.js.map