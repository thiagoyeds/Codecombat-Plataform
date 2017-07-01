require.register("views/AboutView", function(exports, require, module) {
var AboutView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/about');

module.exports = AboutView = (function(superClass) {
  extend(AboutView, superClass);

  function AboutView() {
    return AboutView.__super__.constructor.apply(this, arguments);
  }

  AboutView.prototype.id = 'about-view';

  AboutView.prototype.template = template;

  AboutView.prototype.logoutRedirectURL = false;

  AboutView.prototype.events = {
    'click #fixed-nav a': 'onClickFixedNavLink',
    'click .screen-thumbnail': 'onClickScreenThumbnail',
    'click #carousel-left': 'onLeftPressed',
    'click #carousel-right': 'onRightPressed'
  };

  AboutView.prototype.shortcuts = {
    'right': 'onRightPressed',
    'left': 'onLeftPressed',
    'esc': 'onEscapePressed'
  };

  AboutView.prototype.getTitle = function() {
    return $.i18n.t('nav.about');
  };

  AboutView.prototype.afterRender = function() {
    AboutView.__super__.afterRender.apply(this, arguments);
    this.$('#fixed-nav').affix({
      offset: {
        top: function() {
          return $('#nav-container').offset().top;
        }
      }
    });
    $('body').scrollspy({
      target: '#nav-container',
      offset: 150
    });
    this.$('#screenshot-lightbox').modal();
    return this.$('#screenshot-carousel').carousel({
      interval: 0,
      keyboard: false
    });
  };

  AboutView.prototype.afterInsert = function() {
    var f;
    f = (function(_this) {
      return function() {
        var link;
        if (_this.destroyed) {
          return;
        }
        link = $(document.location.hash);
        if (link.length) {
          return _this.scrollToLink(document.location.hash, 0);
        }
      };
    })(this);
    return _.delay(f, 100);
  };

  AboutView.prototype.onClickFixedNavLink = function(event) {
    var link, target;
    event.preventDefault();
    link = $(event.target).closest('a');
    target = link.attr('href');
    history.replaceState(null, null, "about" + target);
    return this.scrollToLink(target);
  };

  AboutView.prototype.onRightPressed = function(event) {
    var ref;
    if (event.type === 'keydown' && $(document.activeElement).is('.carousel-control')) {
      return;
    }
    if ((ref = $('#screenshot-lightbox').data('bs.modal')) != null ? ref.isShown : void 0) {
      event.preventDefault();
      return $('#screenshot-carousel').carousel('next');
    }
  };

  AboutView.prototype.onLeftPressed = function(event) {
    var ref;
    if (event.type === 'keydown' && $(document.activeElement).is('.carousel-control')) {
      return;
    }
    if ((ref = $('#screenshot-lightbox').data('bs.modal')) != null ? ref.isShown : void 0) {
      event.preventDefault();
      return $('#screenshot-carousel').carousel('prev');
    }
  };

  AboutView.prototype.onEscapePressed = function(event) {
    var ref;
    if ((ref = $('#screenshot-lightbox').data('bs.modal')) != null ? ref.isShown : void 0) {
      event.preventDefault();
      return $('#screenshot-lightbox').modal('hide');
    }
  };

  AboutView.prototype.onClickScreenThumbnail = function(event) {
    var ref;
    if (!((ref = $('#screenshot-lightbox').data('bs.modal')) != null ? ref.isShown : void 0)) {
      event.preventDefault();
      return $('#screenshot-carousel').carousel($(event.currentTarget).data("index"));
    }
  };

  return AboutView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/AboutView.js.map