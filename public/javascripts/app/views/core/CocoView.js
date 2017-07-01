require.register("views/core/CocoView", function(exports, require, module) {
var CocoClass, CocoView, SuperModel, ViewLoadTimer, auth, classCount, doNothing, lastToggleModalCall, loadingErrorTemplate, loadingScreenTemplate, makeScopeName, mobileRELong, mobileREShort, utils, visibleModal, waitingModal,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SuperModel = require('models/SuperModel');

utils = require('core/utils');

CocoClass = require('core/CocoClass');

loadingScreenTemplate = require('templates/core/loading');

loadingErrorTemplate = require('templates/core/loading-error');

auth = require('core/auth');

lastToggleModalCall = 0;

visibleModal = null;

waitingModal = null;

classCount = 0;

makeScopeName = function() {
  return "view-scope-" + (classCount++);
};

doNothing = function() {};

ViewLoadTimer = require('core/ViewLoadTimer');

module.exports = CocoView = (function(superClass) {
  extend(CocoView, superClass);

  CocoView.prototype.cache = false;

  CocoView.prototype.retainSubviews = false;

  CocoView.prototype.template = function() {
    return '';
  };

  CocoView.prototype.events = {
    'click #loading-error .login-btn': 'onClickLoadingErrorLoginButton',
    'click #loading-error #create-account-btn': 'onClickLoadingErrorCreateAccountButton',
    'click #loading-error #logout-btn': 'onClickLoadingErrorLogoutButton',
    'click .contact-modal': 'onClickContactModal'
  };

  CocoView.prototype.subscriptions = {};

  CocoView.prototype.shortcuts = {};

  CocoView.prototype.loadProgress = {
    progress: 0
  };

  function CocoView(options) {
    this.animatePointer = bind(this.animatePointer, this);
    this.modalClosed = bind(this.modalClosed, this);
    this.updateProgressBar = bind(this.updateProgressBar, this);
    var listenedSupermodel;
    this.loadProgress = _.cloneDeep(this.loadProgress);
    if (this.supermodel == null) {
      this.supermodel = new SuperModel();
    }
    this.options = options;
    if (options != null ? options.supermodel : void 0) {
      this.supermodel.models = options.supermodel.models;
      this.supermodel.collections = options.supermodel.collections;
      this.supermodel.shouldSaveBackups = options.supermodel.shouldSaveBackups;
    }
    this.subscriptions = utils.combineAncestralObject(this, 'subscriptions');
    this.events = utils.combineAncestralObject(this, 'events');
    this.scope = makeScopeName();
    this.shortcuts = utils.combineAncestralObject(this, 'shortcuts');
    this.subviews = {};
    this.listenToShortcuts();
    this.updateProgressBar = _.debounce(this.updateProgressBar, 100);
    this.listenTo(this.supermodel, 'loaded-all', this.onLoaded);
    this.listenTo(this.supermodel, 'update-progress', this.updateProgress);
    this.listenTo(this.supermodel, 'failed', this.onResourceLoadFailed);
    this.warnConnectionError = _.throttle(this.warnConnectionError, 3000);
    listenedSupermodel = this.supermodel;
    _.defer((function(_this) {
      return function() {
        var ref, ref1;
        if (listenedSupermodel !== _this.supermodel && !_this.destroyed) {
          throw new Error(((ref = (ref1 = _this.constructor) != null ? ref1.name : void 0) != null ? ref : _this) + ": Supermodel listeners not hooked up! Don't reassign @supermodel; CocoView does that for you.");
        }
      };
    })(this));
    CocoView.__super__.constructor.apply(this, arguments);
  }

  CocoView.prototype.destroy = function() {
    var id, key, ref, value, view;
    this.stopListening();
    this.off();
    this.stopListeningToShortcuts();
    this.undelegateEvents();
    ref = this.subviews;
    for (id in ref) {
      view = ref[id];
      view.destroy();
    }
    $('#modal-wrapper .modal').off('hidden.bs.modal', this.modalClosed);
    this.$el.find('.has-tooltip, [data-original-title]').tooltip('destroy');
    this.endHighlight();
    this.getPointer(false).remove();
    for (key in this) {
      value = this[key];
      this[key] = void 0;
    }
    this.destroyed = true;
    this.off = doNothing;
    this.destroy = doNothing;
    return $.noty.closeAll();
  };

  CocoView.prototype.destroyAceEditor = function(editor) {
    var session;
    if (!editor) {
      return;
    }
    session = editor.getSession();
    session.setMode('');
    return editor.destroy();
  };

  CocoView.prototype.afterInsert = function() {};

  CocoView.prototype.willDisappear = function() {
    var id, ref, view;
    this.undelegateEvents();
    this.hidden = true;
    this.stopListeningToShortcuts();
    ref = this.subviews;
    for (id in ref) {
      view = ref[id];
      view.willDisappear();
    }
    return $.noty.closeAll();
  };

  CocoView.prototype.didReappear = function() {
    var id, ref, results, view, wasHidden;
    this.delegateEvents();
    wasHidden = this.hidden;
    this.hidden = false;
    if (wasHidden) {
      this.listenToShortcuts();
    }
    ref = this.subviews;
    results = [];
    for (id in ref) {
      view = ref[id];
      results.push(view.didReappear());
    }
    return results;
  };

  CocoView.prototype.renderSelectors = function() {
    var elPair, i, j, k, len, len1, newTemplate, ref, selector, selectors;
    selectors = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    newTemplate = $(this.template(this.getRenderData()));
    for (i = j = 0, len = selectors.length; j < len; i = ++j) {
      selector = selectors[i];
      ref = _.zip(this.$el.find(selector), newTemplate.find(selector));
      for (k = 0, len1 = ref.length; k < len1; k++) {
        elPair = ref[k];
        $(elPair[0]).replaceWith($(elPair[1]));
      }
    }
    this.delegateEvents();
    return this.$el.i18n();
  };

  CocoView.prototype.render = function() {
    var id, j, len, oldSubviews, ref, view;
    if (!me) {
      return this;
    }
    if (this.retainSubviews) {
      oldSubviews = _.values(this.subviews);
    } else {
      ref = this.subviews;
      for (id in ref) {
        view = ref[id];
        view.destroy();
      }
    }
    this.subviews = {};
    CocoView.__super__.render.call(this);
    if (_.isString(this.template)) {
      return this.template;
    }
    this.$el.html(this.template(this.getRenderData()));
    if (this.retainSubviews) {
      for (j = 0, len = oldSubviews.length; j < len; j++) {
        view = oldSubviews[j];
        this.insertSubView(view);
      }
    }
    if (!this.supermodel.finished()) {
      this.showLoading();
    } else {
      this.hideLoading();
    }
    this.afterRender();
    this.$el.i18n();
    return this;
  };

  CocoView.prototype.getRenderData = function(context) {
    if (context == null) {
      context = {};
    }
    context.isProduction = application.isProduction();
    context.me = me;
    context.pathname = document.location.pathname;
    context.fbRef = context.pathname.replace(/[^a-zA-Z0-9+\/=\-.:_]/g, '').slice(0, 40) || 'home';
    context.isMobile = this.isMobile();
    context.isIE = this.isIE();
    context.moment = moment;
    context.translate = $.i18n.t;
    context.view = this;
    context._ = _;
    context.document = document;
    context.i18n = utils.i18n;
    context.state = this.state;
    context.serverConfig = window.serverConfig;
    context.features = window.features;
    return context;
  };

  CocoView.prototype.afterRender = function() {
    return this.renderScrollbar();
  };

  CocoView.prototype.renderScrollbar = function() {
    return _.defer((function(_this) {
      return function() {
        if (!_this.destroyed) {
          return _this.$el.find('.nano').nanoScroller();
        }
      };
    })(this));
  };

  CocoView.prototype.updateProgress = function(progress) {
    if (progress > this.loadProgress.progress) {
      this.loadProgress.progress = progress;
    }
    return this.updateProgressBar(progress);
  };

  CocoView.prototype.updateProgressBar = function(progress) {
    var prog, ref;
    prog = (parseInt(progress * 100)) + "%";
    return (ref = this.$el) != null ? ref.find('.loading-container .progress-bar').css('width', prog) : void 0;
  };

  CocoView.prototype.onLoaded = function() {
    return this.render();
  };

  CocoView.prototype.onResourceLoadFailed = function(e) {
    var r, ref;
    r = e.resource;
    this.stopListening(this.supermodel);
    if (((ref = r.jqxhr) != null ? ref.status : void 0) === 402) {
      return;
    }
    return this.showError(r.jqxhr);
  };

  CocoView.prototype.warnConnectionError = function() {
    var msg;
    msg = $.i18n.t('loading_error.connection_failure', {
      defaultValue: 'Connection failed.'
    });
    return noty({
      text: msg,
      layout: 'center',
      type: 'error',
      killer: true,
      timeout: 3000
    });
  };

  CocoView.prototype.onClickContactModal = function(e) {
    var ContactModal;
    if (me.isStudent()) {
      console.error("Student clicked contact modal.");
      return;
    }
    if (me.isTeacher()) {
      if (application.isProduction()) {
        return typeof window.Intercom === "function" ? window.Intercom('show') : void 0;
      } else {
        return alert('Teachers, Intercom widget only available in production.');
      }
    } else {
      ContactModal = require('views/core/ContactModal');
      return this.openModalView(new ContactModal());
    }
  };

  CocoView.prototype.onClickLoadingErrorLoginButton = function(e) {
    var AuthModal;
    e.stopPropagation();
    AuthModal = require('views/core/AuthModal');
    return this.openModalView(new AuthModal());
  };

  CocoView.prototype.onClickLoadingErrorCreateAccountButton = function(e) {
    var CreateAccountModal;
    e.stopPropagation();
    CreateAccountModal = require('views/core/CreateAccountModal');
    return this.openModalView(new CreateAccountModal({
      mode: 'signup'
    }));
  };

  CocoView.prototype.onClickLoadingErrorLogoutButton = function(e) {
    e.stopPropagation();
    return auth.logoutUser();
  };

  CocoView.lastToggleModalCall = 0;

  CocoView.prototype.toggleModal = function(e) {
    var Modal, elem, target;
    if ($(e.currentTarget).prop('target') === '_blank') {
      return true;
    }
    elem = $(e.target);
    if (elem.data('toggle') !== 'coco-modal') {
      return;
    }
    if (elem.attr('disabled')) {
      return;
    }
    target = elem.data('target');
    Modal = require('views/' + target);
    e.stopPropagation();
    return this.openModalView(new Modal({
      supermodel: this.supermodal
    }));
  };

  CocoView.prototype.openModalView = function(modalView, softly) {
    var modalOptions, viewLoad;
    if (softly == null) {
      softly = false;
    }
    if (waitingModal) {
      return;
    }
    if (visibleModal) {
      waitingModal = modalView;
      if (softly) {
        return;
      }
      if (visibleModal.$el.is(':visible')) {
        return visibleModal.hide();
      }
      return this.modalClosed(visibleModal);
    }
    viewLoad = new ViewLoadTimer(modalView);
    modalView.render();
    if (features.codePlay) {
      if (modalView.id === 'create-account-modal') {
        return document.location.href = '//lenovogamestate.com/register/?cocoId=' + me.id;
      }
      if (modalView.id === 'auth-modal') {
        return document.location.href = '//lenovogamestate.com/login/?cocoId=' + me.id;
      }
    }
    $('#modal-wrapper').removeClass('hide').empty().append(modalView.el);
    modalView.afterInsert();
    visibleModal = modalView;
    modalOptions = {
      show: true,
      backdrop: modalView.closesOnClickOutside ? true : 'static'
    };
    $('#modal-wrapper .modal').modal(modalOptions).on('hidden.bs.modal', this.modalClosed);
    window.currentModal = modalView;
    this.getRootView().stopListeningToShortcuts(true);
    Backbone.Mediator.publish('modal:opened', {});
    viewLoad.record();
    return modalView;
  };

  CocoView.prototype.modalClosed = function() {
    var wm;
    if (visibleModal) {
      visibleModal.willDisappear();
    }
    visibleModal.destroy();
    visibleModal = null;
    window.currentModal = null;
    $('#modal-wrapper').addClass('hide');
    if (waitingModal) {
      wm = waitingModal;
      waitingModal = null;
      return this.openModalView(wm);
    } else {
      this.getRootView().listenToShortcuts(true);
      return Backbone.Mediator.publish('modal:closed', {});
    }
  };

  CocoView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el;
    }
    $el.find('>').addClass('hidden');
    $el.append(loadingScreenTemplate()).i18n();
    return this._lastLoading = $el;
  };

  CocoView.prototype.hideLoading = function() {
    if (this._lastLoading == null) {
      return;
    }
    this._lastLoading.find('.loading-screen').remove();
    this._lastLoading.find('>').removeClass('hidden');
    return this._lastLoading = null;
  };

  CocoView.prototype.showError = function(jqxhr) {
    var context;
    if (this._lastLoading == null) {
      return;
    }
    context = {
      jqxhr: jqxhr,
      view: this,
      me: me
    };
    this._lastLoading.find('.loading-screen').replaceWith(loadingErrorTemplate(context));
    return this._lastLoading.i18n();
  };

  CocoView.prototype.forumLink = function() {
    var lang, link;
    link = 'http://discourse.codecombat.com/';
    lang = (me.get('preferredLanguage') || 'en-US').split('-')[0];
    if (lang === 'zh' || lang === 'ru' || lang === 'es' || lang === 'fr' || lang === 'pt' || lang === 'de' || lang === 'nl' || lang === 'lt') {
      link += "c/other-languages/" + lang;
    }
    return link;
  };

  CocoView.prototype.showReadOnly = function() {
    var warning;
    if (me.isAdmin() || me.isArtisan()) {
      return;
    }
    warning = $.i18n.t('editor.read_only_warning2', {
      defaultValue: 'Note: you can\'t save any edits here, because you\'re not logged in.'
    });
    return noty({
      text: warning,
      layout: 'center',
      type: 'information',
      killer: true,
      timeout: 5000
    });
  };

  CocoView.prototype.enableModalInProgress = function(modal) {
    var el;
    el = modal.find('.modal-content');
    el.find('> div', modal).hide();
    return el.find('.wait', modal).show();
  };

  CocoView.prototype.disableModalInProgress = function(modal) {
    var el;
    el = modal.find('.modal-content');
    el.find('> div', modal).show();
    return el.find('.wait', modal).hide();
  };

  CocoView.prototype.addNewSubscription = CocoClass.prototype.addNewSubscription;

  CocoView.prototype.listenToShortcuts = function(recurse) {
    var func, ref, ref1, results, shortcut, view, viewID;
    if (!key) {
      return;
    }
    ref = this.shortcuts;
    for (shortcut in ref) {
      func = ref[shortcut];
      func = utils.normalizeFunc(func, this);
      key(shortcut, this.scope, _.bind(func, this));
    }
    if (recurse) {
      ref1 = this.subviews;
      results = [];
      for (viewID in ref1) {
        view = ref1[viewID];
        results.push(view.listenToShortcuts());
      }
      return results;
    }
  };

  CocoView.prototype.stopListeningToShortcuts = function(recurse) {
    var ref, results, view, viewID;
    if (!key) {
      return;
    }
    key.deleteScope(this.scope);
    if (recurse) {
      ref = this.subviews;
      results = [];
      for (viewID in ref) {
        view = ref[viewID];
        results.push(view.stopListeningToShortcuts());
      }
      return results;
    }
  };

  CocoView.prototype.insertSubView = function(view, elToReplace) {
    var key;
    if (elToReplace == null) {
      elToReplace = null;
    }
    key = this.makeSubViewKey(view);
    if (key in this.subviews) {
      this.subviews[key].destroy();
    }
    if (elToReplace == null) {
      elToReplace = this.$el.find('#' + view.id);
    }
    if (this.retainSubviews) {
      this.registerSubView(view, key);
      if (elToReplace[0]) {
        view.setElement(elToReplace[0]);
        view.render();
        view.afterInsert();
      }
      return view;
    } else {
      elToReplace.after(view.el).remove();
      this.registerSubView(view, key);
      view.render();
      view.afterInsert();
      return view;
    }
  };

  CocoView.prototype.registerSubView = function(view, key) {
    key = this.makeSubViewKey(view);
    view.parent = this;
    view.parentKey = key;
    this.subviews[key] = view;
    return view;
  };

  CocoView.prototype.makeSubViewKey = function(view) {
    var key;
    key = view.id || (view.constructor.name + classCount++);
    key = _.string.underscored(key);
    return key;
  };

  CocoView.prototype.removeSubView = function(view) {
    view.$el.empty();
    delete this.subviews[view.parentKey];
    return view.destroy();
  };

  CocoView.prototype.highlightElement = function(selector, options) {
    var $pointer, $target, delay, initialScale, offset, ref, targetLeft, targetTop;
    this.endHighlight();
    if (options == null) {
      options = {};
    }
    if (delay = options.delay) {
      delete options.delay;
      return this.pointerDelayTimeout = _.delay(((function(_this) {
        return function() {
          return _this.highlightElement(selector, options);
        };
      })(this)), delay);
    }
    $pointer = this.getPointer();
    $target = $(selector + ':visible');
    if (parseFloat($target.css('opacity')) === 0.0) {
      return;
    }
    if (!(offset = $target.offset())) {
      return;
    }
    targetLeft = offset.left + $target.outerWidth() * 0.5;
    targetTop = offset.top + $target.outerHeight() * 0.5;
    if (options.sides) {
      if (indexOf.call(options.sides, 'left') >= 0) {
        targetLeft = offset.left;
      }
      if (indexOf.call(options.sides, 'right') >= 0) {
        targetLeft = offset.left + $target.outerWidth();
      }
      if (indexOf.call(options.sides, 'top') >= 0) {
        targetTop = offset.top;
      }
      if (indexOf.call(options.sides, 'bottom') >= 0) {
        targetTop = offset.top + $target.outerHeight();
      }
    } else {
      if (offset.left > this.$el.outerWidth() * 0.5) {
        targetLeft = offset.left;
      } else if (offset.left + $target.outerWidth() < this.$el.outerWidth() * 0.5) {
        targetLeft = offset.left + $target.outerWidth();
      }
      if (offset.top > this.$el.outerWidth() * 0.5) {
        targetTop = offset.top;
      } else if (offset.top + $target.outerHeight() < this.$el.outerHeight() * 0.5) {
        targetTop = offset.top + $target.outerHeight();
      }
    }
    if (options.offset) {
      targetLeft += options.offset.x;
      targetTop += options.offset.y;
    }
    this.pointerRadialDistance = -47;
    this.pointerRotation = (ref = options.rotation) != null ? ref : Math.atan2(this.$el.outerWidth() * 0.5 - targetLeft, targetTop - this.$el.outerHeight() * 0.5);
    initialScale = Math.max(1, 20 - me.level());
    $pointer.css({
      opacity: 1.0,
      transition: 'none',
      transform: "rotate(" + this.pointerRotation + "rad) translate(-3px, " + this.pointerRadialDistance + "px) scale(" + initialScale + ")",
      top: targetTop - 50,
      left: targetLeft - 50
    });
    _.defer((function(_this) {
      return function() {
        if (_this.destroyed) {
          return;
        }
        _this.animatePointer();
        clearInterval(_this.pointerInterval);
        return _this.pointerInterval = setInterval(_this.animatePointer, 1200);
      };
    })(this));
    if (options.duration) {
      return this.pointerDurationTimeout = _.delay(((function(_this) {
        return function() {
          if (!_this.destroyed) {
            return _this.endHighlight();
          }
        };
      })(this)), options.duration);
    }
  };

  CocoView.prototype.animatePointer = function() {
    var $pointer;
    $pointer = this.getPointer();
    $pointer.css({
      transition: 'all 0.6s ease-out',
      transform: "rotate(" + this.pointerRotation + "rad) translate(-3px, " + (this.pointerRadialDistance - 50) + "px)"
    });
    return setTimeout(((function(_this) {
      return function() {
        return $pointer.css({
          transition: 'all 0.4s ease-in',
          transform: "rotate(" + _this.pointerRotation + "rad) translate(-3px, " + _this.pointerRadialDistance + "px)"
        });
      };
    })(this)), 800);
  };

  CocoView.prototype.endHighlight = function() {
    this.getPointer(false).css({
      'opacity': 0.0,
      'transition': 'none',
      top: '-50px',
      right: '-50px'
    });
    clearInterval(this.pointerInterval);
    clearTimeout(this.pointerDelayTimeout);
    clearTimeout(this.pointerDurationTimeout);
    return this.pointerInterval = this.pointerDelayTimeout = this.pointerDurationTimeout = null;
  };

  CocoView.prototype.getPointer = function(add) {
    var $pointer;
    if (add == null) {
      add = true;
    }
    if (($pointer = $(".highlight-pointer[data-cid='" + this.cid + "']")) && ($pointer.length || !add)) {
      return $pointer;
    }
    $pointer = $("<img src='/images/level/pointer.png' class='highlight-pointer' data-cid='" + this.cid + "'>");
    if (this.$el.parents('#modal-wrapper').length) {
      $pointer.css('z-index', 1040);
    }
    $('body').append($pointer);
    return $pointer;
  };

  CocoView.prototype.getQueryVariable = function(param, defaultValue) {
    return CocoView.getQueryVariable(param, defaultValue);
  };

  CocoView.getQueryVariable = function(param, defaultValue) {
    return utils.getQueryVariable(param, defaultValue);
  };

  CocoView.prototype.getRootView = function() {
    var view;
    view = this;
    while (view.parent != null) {
      view = view.parent;
    }
    return view;
  };

  CocoView.prototype.isMobile = function() {
    var ua;
    ua = navigator.userAgent || navigator.vendor || window.opera;
    return mobileRELong.test(ua) || mobileREShort.test(ua.substr(0, 4));
  };

  CocoView.prototype.isIE = function() {
    return navigator.userAgent.indexOf('MSIE') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
  };

  CocoView.prototype.isMac = function() {
    return navigator.platform.toUpperCase().indexOf('MAC') !== -1;
  };

  CocoView.prototype.isIPadApp = function() {
    var ref;
    if (this._isIPadApp != null) {
      return this._isIPadApp;
    }
    return this._isIPadApp = ((typeof webkit !== "undefined" && webkit !== null ? webkit.messageHandlers : void 0) != null) && ((ref = navigator.userAgent) != null ? ref.indexOf('iPad') : void 0) !== -1;
  };

  CocoView.prototype.isIPadBrowser = function() {
    var ref;
    return (typeof navigator !== "undefined" && navigator !== null ? (ref = navigator.userAgent) != null ? ref.indexOf('iPad') : void 0 : void 0) !== -1;
  };

  CocoView.prototype.isFirefox = function() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  };

  CocoView.prototype.initSlider = function($el, startValue, changeCallback) {
    var slider;
    slider = $el.slider({
      animate: 'fast'
    });
    slider.slider('value', startValue);
    slider.on('slide', changeCallback);
    slider.on('slidechange', changeCallback);
    return slider;
  };

  CocoView.prototype.scrollToLink = function(link, speed) {
    var scrollTo;
    if (speed == null) {
      speed = 300;
    }
    scrollTo = $(link).offset().top;
    return $('html, body').animate({
      scrollTop: scrollTo
    }, speed);
  };

  CocoView.prototype.scrollToTop = function(speed) {
    if (speed == null) {
      speed = 300;
    }
    return $('html, body').animate({
      scrollTop: 0
    }, speed);
  };

  CocoView.prototype.toggleFullscreen = function(e) {
    var d, full, nah, req;
    full = document.fullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    d = document.documentElement;
    if (!full) {
      req = d.requestFullScreen || d.mozRequestFullScreen || d.mozRequestFullscreen || d.msRequestFullscreen || (d.webkitRequestFullscreen ? function() {
        return d.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } : null);
      if (req != null) {
        req.call(d);
      }
      if (req) {
        this.playSound('full-screen-start');
      }
    } else {
      nah = document.exitFullscreen || document.mozCancelFullScreen || document.mozCancelFullscreen || document.msExitFullscreen || document.webkitExitFullscreen;
      if (nah != null) {
        nah.call(document);
      }
      if (req) {
        this.playSound('full-screen-end');
      }
    }
  };

  CocoView.prototype.playSound = function(trigger, volume) {
    if (volume == null) {
      volume = 1;
    }
    return Backbone.Mediator.publish('audio-player:play-sound', {
      trigger: trigger,
      volume: volume
    });
  };

  CocoView.prototype.tryCopy = function() {
    var err, error, message;
    try {
      return document.execCommand('copy');
    } catch (error) {
      err = error;
      message = 'Oops, unable to copy';
      return noty({
        text: message,
        layout: 'topCenter',
        type: 'error',
        killer: false
      });
    }
  };

  CocoView.prototype.wait = function(event) {
    return new Promise((function(_this) {
      return function(resolve) {
        return _this.once(event, resolve);
      };
    })(this));
  };

  CocoView.prototype.onClickTranslatedElement = function(e) {
    var base, clickedKey, clickedSection, en, enEntries, enKey, enSection, enValue, found, githubUrl, i18nKey, lineNumber, ref, ref1, targetLanguage, translated;
    if (!((key.ctrl || key.command) && key.alt)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    i18nKey = _.last($(e.currentTarget).data('i18n').split(';')).replace(/\[.*?\]/, '');
    base = $.i18n.t(i18nKey, {
      lng: 'en'
    });
    translated = $.i18n.t(i18nKey);
    en = require('locale/en');
    ref = i18nKey.split('.'), clickedSection = ref[0], clickedKey = ref[1];
    lineNumber = 2;
    found = false;
    ref1 = en.translation;
    for (enSection in ref1) {
      enEntries = ref1[enSection];
      for (enKey in enEntries) {
        enValue = enEntries[enKey];
        ++lineNumber;
        if (clickedSection === enSection && clickedKey === enKey) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
      lineNumber += 2;
    }
    if (!found) {
      return console.log("Couldn't find " + i18nKey + " in app/locale/en.coffee.");
    }
    targetLanguage = me.get('preferredLanguage') || 'en';
    if (targetLanguage.split('-')[0] === 'en') {
      targetLanguage = 'en';
    }
    githubUrl = "https://github.com/codecombat/codecombat/blob/master/app/locale/" + targetLanguage + ".coffee#L" + lineNumber;
    return window.open(githubUrl, {
      target: '_blank'
    });
  };

  return CocoView;

})(Backbone.View);

mobileRELong = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

mobileREShort = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

module.exports = CocoView;
});

;
//# sourceMappingURL=/javascripts/app/views/core/CocoView.js.map