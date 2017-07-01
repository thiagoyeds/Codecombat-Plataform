require.register("views/play/level/modal/VictoryModal", function(exports, require, module) {
var CreateAccountModal, LadderSubmissionView, LevelFeedback, ModalView, VictoryModal, me, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

CreateAccountModal = require('views/core/CreateAccountModal');

template = require('templates/play/level/modal/victory');

me = require('core/auth').me;

LadderSubmissionView = require('views/play/common/LadderSubmissionView');

LevelFeedback = require('models/LevelFeedback');

utils = require('core/utils');

module.exports = VictoryModal = (function(superClass) {
  extend(VictoryModal, superClass);

  VictoryModal.prototype.id = 'level-victory-modal';

  VictoryModal.prototype.template = template;

  VictoryModal.prototype.subscriptions = {
    'ladder:game-submitted': 'onGameSubmitted'
  };

  VictoryModal.prototype.events = {
    'click .sign-up-button': 'onClickSignupButton',
    'mouseover .rating i': function(e) {
      return this.showStars(this.starNum($(e.target)));
    },
    'mouseout .rating i': function() {
      return this.showStars();
    },
    'click .rating i': function(e) {
      this.setStars(this.starNum($(e.target)));
      return this.$el.find('.review').show();
    },
    'keypress .review textarea': function() {
      return this.saveReviewEventually();
    }
  };

  function VictoryModal(options) {
    var body, victory;
    application.router.initializeSocialMediaServices();
    victory = options.level.get('victory', true);
    body = utils.i18n(victory, 'body') || 'Sorry, this level has no victory message yet.';
    this.body = marked(body);
    this.level = options.level;
    this.session = options.session;
    this.saveReviewEventually = _.debounce(this.saveReviewEventually, 2000);
    this.loadExistingFeedback();
    VictoryModal.__super__.constructor.call(this, options);
  }

  VictoryModal.prototype.loadExistingFeedback = function() {
    var url;
    url = "/db/level/" + this.level.id + "/feedback";
    this.feedback = new LevelFeedback();
    this.feedback.setURL(url);
    this.feedback.fetch({
      cache: false
    });
    this.listenToOnce(this.feedback, 'sync', function() {
      return this.onFeedbackLoaded();
    });
    return this.listenToOnce(this.feedback, 'error', function() {
      return this.onFeedbackNotFound();
    });
  };

  VictoryModal.prototype.onFeedbackLoaded = function() {
    this.feedback.url = function() {
      return '/db/level.feedback/' + this.id;
    };
    this.$el.find('.review textarea').val(this.feedback.get('review'));
    this.$el.find('.review').show();
    return this.showStars();
  };

  VictoryModal.prototype.onFeedbackNotFound = function() {
    this.feedback = new LevelFeedback();
    this.feedback.set('levelID', this.level.get('slug') || this.level.id);
    this.feedback.set('levelName', this.level.get('name') || '');
    this.feedback.set('level', {
      majorVersion: this.level.get('version').major,
      original: this.level.get('original')
    });
    return this.showStars();
  };

  VictoryModal.prototype.onClickSignupButton = function(e) {
    var ref;
    e.preventDefault();
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Started Signup', {
        category: 'Play Level',
        label: 'Victory Modal',
        level: this.level.get('slug')
      });
    }
    return this.openModalView(new CreateAccountModal());
  };

  VictoryModal.prototype.onGameSubmitted = function(e) {
    var ladderURL;
    ladderURL = "/play/ladder/" + (this.level.get('slug')) + "#my-matches";
    return Backbone.Mediator.publish('router:navigate', {
      route: ladderURL
    });
  };

  VictoryModal.prototype.getRenderData = function() {
    var c;
    c = VictoryModal.__super__.getRenderData.call(this);
    c.body = this.body;
    c.me = me;
    c.levelName = utils.i18n(this.level.attributes, 'name');
    c.level = this.level;
    if (c.level.isType('ladder')) {
      c.readyToRank = this.session.readyToRank();
    }
    return c;
  };

  VictoryModal.prototype.afterRender = function() {
    VictoryModal.__super__.afterRender.call(this);
    this.ladderSubmissionView = new LadderSubmissionView({
      session: this.session,
      level: this.level
    });
    return this.insertSubView(this.ladderSubmissionView, this.$el.find('.ladder-submission-view'));
  };

  VictoryModal.prototype.afterInsert = function() {
    var ref, ref1, ref2;
    VictoryModal.__super__.afterInsert.call(this);
    this.playSound('victory');
    if (typeof gapi !== "undefined" && gapi !== null) {
      if ((ref = gapi.plusone) != null) {
        if (typeof ref.go === "function") {
          ref.go(this.$el[0]);
        }
      }
    }
    if (typeof FB !== "undefined" && FB !== null) {
      if ((ref1 = FB.XFBML) != null) {
        if (typeof ref1.parse === "function") {
          ref1.parse(this.$el[0]);
        }
      }
    }
    return typeof twttr !== "undefined" && twttr !== null ? (ref2 = twttr.widgets) != null ? typeof ref2.load === "function" ? ref2.load() : void 0 : void 0 : void 0;
  };

  VictoryModal.prototype.destroy = function() {
    if (this.$el.find('.review textarea').val()) {
      this.saveReview();
    }
    this.feedback.off();
    return VictoryModal.__super__.destroy.call(this);
  };

  VictoryModal.prototype.starNum = function(starEl) {
    return starEl.prevAll('i').length + 1;
  };

  VictoryModal.prototype.showStars = function(num) {
    var ref, stars;
    this.$el.find('.rating').show();
    if (num == null) {
      num = ((ref = this.feedback) != null ? ref.get('rating') : void 0) || 0;
    }
    stars = this.$el.find('.rating i');
    stars.removeClass('icon-star').addClass('icon-star-empty');
    return stars.slice(0, num).removeClass('icon-star-empty').addClass('icon-star');
  };

  VictoryModal.prototype.setStars = function(num) {
    this.feedback.set('rating', num);
    return this.feedback.save();
  };

  VictoryModal.prototype.saveReviewEventually = function() {
    return this.saveReview();
  };

  VictoryModal.prototype.saveReview = function() {
    this.feedback.set('review', this.$el.find('.review textarea').val());
    return this.feedback.save();
  };

  return VictoryModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/VictoryModal.js.map