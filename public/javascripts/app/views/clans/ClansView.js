require.register("views/clans/ClansView", function(exports, require, module) {
var Clan, ClansView, CocoCollection, CreateAccountModal, RootView, SubscribeModal, app, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CreateAccountModal = require('views/core/CreateAccountModal');

RootView = require('views/core/RootView');

template = require('templates/clans/clans');

CocoCollection = require('collections/CocoCollection');

Clan = require('models/Clan');

SubscribeModal = require('views/core/SubscribeModal');

module.exports = ClansView = (function(superClass) {
  extend(ClansView, superClass);

  function ClansView() {
    return ClansView.__super__.constructor.apply(this, arguments);
  }

  ClansView.prototype.id = 'clans-view';

  ClansView.prototype.template = template;

  ClansView.prototype.events = {
    'click .create-clan-btn': 'onClickCreateClan',
    'click .join-clan-btn': 'onJoinClan',
    'click .leave-clan-btn': 'onLeaveClan',
    'click .private-clan-checkbox': 'onClickPrivateCheckbox'
  };

  ClansView.prototype.initialize = function() {
    this.publicClansArray = [];
    this.myClansArray = [];
    this.idNameMap = {};
    return this.loadData();
  };

  ClansView.prototype.destroy = function() {
    return typeof this.stopListening === "function" ? this.stopListening() : void 0;
  };

  ClansView.prototype.afterRender = function() {
    ClansView.__super__.afterRender.call(this);
    return this.setupPrivateInfoPopover();
  };

  ClansView.prototype.onLoaded = function() {
    ClansView.__super__.onLoaded.call(this);
    this.publicClansArray = _.filter(this.publicClans.models, function(clan) {
      return clan.get('type') === 'public';
    });
    return this.myClansArray = this.myClans.models;
  };

  ClansView.prototype.loadData = function() {
    var ref, sortClanList;
    sortClanList = function(a, b) {
      if (a.get('memberCount') !== b.get('memberCount')) {
        if (a.get('memberCount') < b.get('memberCount')) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return b.id.localeCompare(a.id);
      }
    };
    this.publicClans = new CocoCollection([], {
      url: '/db/clan/-/public',
      model: Clan,
      comparator: sortClanList
    });
    this.listenTo(this.publicClans, 'sync', (function(_this) {
      return function() {
        _this.refreshNames(_this.publicClans.models);
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.supermodel.loadCollection(this.publicClans, 'public_clans', {
      cache: false
    });
    this.myClans = new CocoCollection([], {
      url: "/db/user/" + me.id + "/clans",
      model: Clan,
      comparator: sortClanList
    });
    this.listenTo(this.myClans, 'sync', (function(_this) {
      return function() {
        _this.refreshNames(_this.myClans.models);
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.supermodel.loadCollection(this.myClans, 'my_clans', {
      cache: false
    });
    this.listenTo(me, 'sync', (function(_this) {
      return function() {
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    return this.myClanIDs = (ref = me.get('clans')) != null ? ref : [];
  };

  ClansView.prototype.refreshNames = function(clans) {
    var clanIDs, options;
    clanIDs = _.filter(clans, function(clan) {
      return clan.get('type') === 'public';
    });
    clanIDs = _.map(clans, function(clan) {
      return clan.get('ownerID');
    });
    options = {
      url: '/db/user/-/names',
      method: 'POST',
      data: {
        ids: clanIDs
      },
      success: (function(_this) {
        return function(models, response, options) {
          var userID;
          for (userID in models) {
            _this.idNameMap[userID] = models[userID].name;
          }
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    };
    return this.supermodel.addRequestResource('user_names', options, 0).load();
  };

  ClansView.prototype.setupPrivateInfoPopover = function() {
    var popoverContent, popoverTitle;
    popoverTitle = "<h3>" + $.i18n.t('clans.private_clans') + "</h3>";
    popoverContent = "<ul>";
    popoverContent += "<li><span style='font-weight:bold;'>" + $.i18n.t('clans.track_concepts1') + "</span> " + $.i18n.t('clans.track_concepts2b');
    popoverContent += "<li>" + $.i18n.t('clans.track_concepts3b');
    popoverContent += "<li>" + $.i18n.t('clans.track_concepts4b') + " <span style='font-weight:bold;'>" + $.i18n.t('clans.track_concepts5') + "</span>";
    popoverContent += "<li>" + $.i18n.t('clans.track_concepts6b');
    popoverContent += "<li><span style='font-weight:bold;'>" + $.i18n.t('clans.track_concepts7') + "</span> " + $.i18n.t('clans.track_concepts8');
    popoverContent += "</ul>";
    popoverContent += "<p><img src='/images/pages/clans/dashboard_preview.png' height='400'></p>";
    popoverContent += "<p>" + $.i18n.t('clans.private_require_sub') + "</p>";
    return this.$el.find('.private-more-info').popover({
      animation: true,
      html: true,
      placement: 'right',
      trigger: 'hover',
      title: popoverTitle,
      content: popoverContent,
      container: this.$el
    });
  };

  ClansView.prototype.onClickCreateClan = function(e) {
    var clan, clanType, description, name, ref;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    clanType = $('.private-clan-checkbox').prop('checked') ? 'private' : 'public';
    if (clanType === 'private' && !me.isPremium()) {
      this.openModalView(new SubscribeModal());
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Show subscription modal', {
          category: 'Subscription',
          label: 'create clan'
        });
      }
      return;
    }
    if (name = $('.create-clan-name').val()) {
      clan = new Clan();
      clan.set('type', clanType);
      clan.set('name', name);
      if (description = $('.create-clan-description').val()) {
        clan.set('description', description);
      }
      return clan.save({}, {
        error: (function(_this) {
          return function(model, response, options) {
            return console.error('Error saving clan', response.status);
          };
        })(this),
        success: (function(_this) {
          return function(model, response, options) {
            app.router.navigate("/clans/" + model.id);
            return window.location.reload();
          };
        })(this)
      });
    } else {
      return console.log('Invalid name');
    }
  };

  ClansView.prototype.onJoinClan = function(e) {
    var clanID, options;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    if (clanID = $(e.target).data('id')) {
      options = {
        url: "/db/clan/" + clanID + "/join",
        method: 'PUT',
        error: (function(_this) {
          return function(model, response, options) {
            return console.error('Error joining clan', response);
          };
        })(this),
        success: (function(_this) {
          return function(model, response, options) {
            app.router.navigate("/clans/" + clanID);
            return window.location.reload();
          };
        })(this)
      };
      return this.supermodel.addRequestResource('join_clan', options).load();
    } else {
      return console.error("No clan ID attached to join button.");
    }
  };

  ClansView.prototype.onLeaveClan = function(e) {
    var clanID, options;
    if (clanID = $(e.target).data('id')) {
      options = {
        url: "/db/clan/" + clanID + "/leave",
        method: 'PUT',
        error: (function(_this) {
          return function(model, response, options) {
            return console.error('Error leaving clan', response);
          };
        })(this),
        success: (function(_this) {
          return function(model, response, options) {
            me.fetch({
              cache: false
            });
            _this.publicClans.fetch({
              cache: false
            });
            return _this.myClans.fetch({
              cache: false
            });
          };
        })(this)
      };
      return this.supermodel.addRequestResource('leave_clan', options).load();
    } else {
      return console.error("No clan ID attached to leave button.");
    }
  };

  ClansView.prototype.onClickPrivateCheckbox = function(e) {
    var ref;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    if ($('.private-clan-checkbox').prop('checked') && !me.isPremium()) {
      $('.private-clan-checkbox').attr('checked', false);
      this.openModalView(new SubscribeModal());
      return (ref = window.tracker) != null ? ref.trackEvent('Show subscription modal', {
        category: 'Subscription',
        label: 'check private clan'
      }) : void 0;
    }
  };

  return ClansView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/clans/ClansView.js.map