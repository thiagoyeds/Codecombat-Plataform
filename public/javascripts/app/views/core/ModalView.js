require.register("views/core/ModalView", function(exports, require, module) {
var CocoView, ModalView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('./CocoView');

module.exports = ModalView = (function(superClass) {
  extend(ModalView, superClass);

  ModalView.prototype.className = 'modal fade';

  ModalView.prototype.closeButton = true;

  ModalView.prototype.closesOnClickOutside = true;

  ModalView.prototype.modalWidthPercent = null;

  ModalView.prototype.plain = false;

  ModalView.prototype.instant = false;

  ModalView.prototype.template = require('templates/core/modal-base');

  ModalView.prototype.events = {
    'click a': 'toggleModal',
    'click button': 'toggleModal',
    'click li': 'toggleModal',
    'click [data-i18n]': 'onClickTranslatedElement'
  };

  ModalView.prototype.shortcuts = {
    'esc': 'hide'
  };

  function ModalView(options) {
    if ((options != null ? options.instant : void 0) || this.instant) {
      this.className = this.className.replace(' fade', '');
    }
    if ((options != null ? options.closeButton : void 0) != null) {
      this.closeButton = options.closeButton;
    }
    if (options != null ? options.modalWidthPercent : void 0) {
      this.modalWidthPercent = options.modalWidthPercent;
    }
    ModalView.__super__.constructor.apply(this, arguments);
    if (this.options == null) {
      this.options = {};
    }
  }

  ModalView.prototype.subscriptions = {};

  ModalView.prototype.afterRender = function() {
    ModalView.__super__.afterRender.call(this);
    if (Backbone.history.fragment === "employers") {
      $(this.$el).find(".background-wrapper").each(function() {
        return $(this).addClass("employer-modal-background-wrapper").removeClass("background-wrapper");
      });
    }
    if (this.modalWidthPercent) {
      this.$el.find('.modal-dialog').css({
        width: this.modalWidthPercent + "%"
      });
    }
    this.$el.on('hide.bs.modal', (function(_this) {
      return function() {
        if (!_this.hidden) {
          _this.onHidden();
        }
        return _this.hidden = true;
      };
    })(this));
    if (this.plain) {
      return this.$el.find('.background-wrapper').addClass('plain');
    }
  };

  ModalView.prototype.afterInsert = function() {
    ModalView.__super__.afterInsert.call(this);
    return $(document.activeElement).blur();
  };

  ModalView.prototype.showLoading = function($el) {
    if (!$el) {
      $el = this.$el.find('.modal-body');
    }
    return ModalView.__super__.showLoading.call(this, $el);
  };

  ModalView.prototype.hide = function() {
    this.trigger('hide');
    if (!this.destroyed) {
      return this.$el.removeClass('fade').modal('hide');
    }
  };

  ModalView.prototype.onHidden = function() {
    return this.trigger('hidden');
  };

  ModalView.prototype.destroy = function() {
    if (!this.hidden) {
      this.hide();
    }
    this.$el.off('hide.bs.modal');
    return ModalView.__super__.destroy.call(this);
  };

  return ModalView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/ModalView.js.map