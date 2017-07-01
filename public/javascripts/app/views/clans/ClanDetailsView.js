require.register("views/clans/ClanDetailsView", function(exports, require, module) {
var Campaign, Clan, ClanDetailsView, CocoCollection, CreateAccountModal, EarnedAchievement, LevelSession, RootView, SubscribeModal, ThangType, User, app, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/clans/clan-details');

app = require('core/application');

CreateAccountModal = require('views/core/CreateAccountModal');

CocoCollection = require('collections/CocoCollection');

Campaign = require('models/Campaign');

Clan = require('models/Clan');

EarnedAchievement = require('models/EarnedAchievement');

LevelSession = require('models/LevelSession');

SubscribeModal = require('views/core/SubscribeModal');

ThangType = require('models/ThangType');

User = require('models/User');

utils = require('core/utils');

module.exports = ClanDetailsView = (function(superClass) {
  extend(ClanDetailsView, superClass);

  ClanDetailsView.prototype.id = 'clan-details-view';

  ClanDetailsView.prototype.template = template;

  ClanDetailsView.prototype.events = {
    'change .expand-progress-checkbox': 'onExpandedProgressCheckbox',
    'click .delete-clan-btn': 'onDeleteClan',
    'click .edit-description-save-btn': 'onEditDescriptionSave',
    'click .edit-name-save-btn': 'onEditNameSave',
    'click .join-clan-btn': 'onJoinClan',
    'click .leave-clan-btn': 'onLeaveClan',
    'click .member-header': 'onClickMemberHeader',
    'click .progress-header': 'onClickProgressHeader',
    'click .progress-level-cell': 'onClickLevel',
    'click .remove-member-btn': 'onRemoveMember',
    'mouseenter .progress-level-cell': 'onMouseEnterPoint',
    'mouseleave .progress-level-cell': 'onMouseLeavePoint'
  };

  function ClanDetailsView(options, clanID) {
    this.clanID = clanID;
    ClanDetailsView.__super__.constructor.call(this, options);
    this.initData();
  }

  ClanDetailsView.prototype.destroy = function() {
    return typeof this.stopListening === "function" ? this.stopListening() : void 0;
  };

  ClanDetailsView.prototype.initData = function() {
    this.showExpandedProgress = false;
    this.memberSort = 'nameAsc';
    this.stats = {};
    this.campaigns = new CocoCollection([], {
      url: "/db/campaign",
      model: Campaign,
      comparator: '_id'
    });
    this.clan = new Clan({
      _id: this.clanID
    });
    this.members = new CocoCollection([], {
      url: "/db/clan/" + this.clanID + "/members",
      model: User,
      comparator: 'nameLower'
    });
    this.memberAchievements = new CocoCollection([], {
      url: "/db/clan/" + this.clanID + "/member_achievements",
      model: EarnedAchievement,
      comparator: '_id'
    });
    this.memberSessions = new CocoCollection([], {
      url: "/db/clan/" + this.clanID + "/member_sessions",
      model: LevelSession,
      comparator: '_id'
    });
    this.listenTo(me, 'sync', (function(_this) {
      return function() {
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.listenTo(this.campaigns, 'sync', this.onCampaignSync);
    this.listenTo(this.clan, 'sync', this.onClanSync);
    this.listenTo(this.members, 'sync', this.onMembersSync);
    this.listenTo(this.memberAchievements, 'sync', this.onMemberAchievementsSync);
    this.listenTo(this.memberSessions, 'sync', this.onMemberSessionsSync);
    this.supermodel.loadModel(this.campaigns, {
      cache: false
    });
    this.supermodel.loadModel(this.clan, {
      cache: false
    });
    this.supermodel.loadCollection(this.members, 'members', {
      cache: false
    });
    return this.supermodel.loadCollection(this.memberAchievements, 'member_achievements', {
      cache: false
    });
  };

  ClanDetailsView.prototype.getRenderData = function() {
    var base, campaign, campaignID, concept, context, highestUserLevelCountMap, i, j, k, lastLevelIndex, lastUserCampaignLevelMap, len, len1, len2, level, levelCount, levelID, levelSlug, maxLastUserCampaignLevel, member, name1, name2, ref, ref1, ref10, ref11, ref12, ref13, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, userConceptsMap;
    context = ClanDetailsView.__super__.getRenderData.call(this);
    context.campaignLevelProgressions = (ref = this.campaignLevelProgressions) != null ? ref : [];
    context.clan = this.clan;
    context.conceptsProgression = (ref1 = this.conceptsProgression) != null ? ref1 : [];
    if (application.isProduction()) {
      context.joinClanLink = "https://codecombat.com/clans/" + this.clanID;
    } else {
      context.joinClanLink = "http://localhost:3000/clans/" + this.clanID;
    }
    context.owner = this.owner;
    context.memberAchievementsMap = this.memberAchievementsMap;
    context.memberLanguageMap = this.memberLanguageMap;
    context.memberLevelStateMap = (ref2 = this.memberLevelMap) != null ? ref2 : {};
    context.memberMaxLevelCount = this.memberMaxLevelCount;
    context.memberSort = this.memberSort;
    context.isOwner = this.clan.get('ownerID') === me.id;
    context.isMember = (ref3 = this.clanID, indexOf.call((ref4 = me.get('clans')) != null ? ref4 : [], ref3) >= 0);
    context.stats = this.stats;
    highestUserLevelCountMap = {};
    lastUserCampaignLevelMap = {};
    maxLastUserCampaignLevel = 0;
    userConceptsMap = {};
    if (this.campaigns.loaded) {
      levelCount = 0;
      ref5 = this.campaigns.models;
      for (i = 0, len = ref5.length; i < len; i++) {
        campaign = ref5[i];
        if (!(campaign.get('type') === 'hero')) {
          continue;
        }
        campaignID = campaign.id;
        lastLevelIndex = 0;
        ref6 = campaign.get('levels');
        for (levelID in ref6) {
          level = ref6[levelID];
          levelSlug = level.slug;
          ref9 = (ref7 = (ref8 = this.members) != null ? ref8.models : void 0) != null ? ref7 : [];
          for (j = 0, len1 = ref9.length; j < len1; j++) {
            member = ref9[j];
            if ((ref10 = context.memberLevelStateMap[member.id]) != null ? ref10[levelSlug] : void 0) {
              if (lastUserCampaignLevelMap[name1 = member.id] == null) {
                lastUserCampaignLevelMap[name1] = {};
              }
              if ((base = lastUserCampaignLevelMap[member.id])[campaignID] == null) {
                base[campaignID] = {};
              }
              lastUserCampaignLevelMap[member.id][campaignID] = {
                levelSlug: levelSlug,
                index: lastLevelIndex
              };
              if (lastLevelIndex > maxLastUserCampaignLevel) {
                maxLastUserCampaignLevel = lastLevelIndex;
              }
              if (level.concepts != null) {
                if (userConceptsMap[name2 = member.id] == null) {
                  userConceptsMap[name2] = {};
                }
                ref11 = level.concepts;
                for (k = 0, len2 = ref11.length; k < len2; k++) {
                  concept = ref11[k];
                  if (userConceptsMap[member.id][concept] === 'complete') {
                    continue;
                  }
                  userConceptsMap[member.id][concept] = context.memberLevelStateMap[member.id][levelSlug].state;
                }
              }
              highestUserLevelCountMap[member.id] = levelCount;
            }
          }
          lastLevelIndex++;
          levelCount++;
        }
      }
    }
    this.sortMembers(highestUserLevelCountMap, userConceptsMap);
    context.members = (ref12 = (ref13 = this.members) != null ? ref13.models : void 0) != null ? ref12 : [];
    context.lastUserCampaignLevelMap = lastUserCampaignLevelMap;
    context.showExpandedProgress = maxLastUserCampaignLevel <= 30 || this.showExpandedProgress;
    context.userConceptsMap = userConceptsMap;
    context.arenas = this.arenas;
    context.i18n = utils.i18n;
    return context;
  };

  ClanDetailsView.prototype.afterRender = function() {
    ClanDetailsView.__super__.afterRender.call(this);
    return this.updateHeroIcons();
  };

  ClanDetailsView.prototype.refreshData = function() {
    me.fetch({
      cache: false
    });
    this.members.fetch({
      cache: false
    });
    this.memberAchievements.fetch({
      cache: false
    });
    return this.memberSessions.fetch({
      cache: false
    });
  };

  ClanDetailsView.prototype.sortMembers = function(highestUserLevelCountMap, userConceptsMap) {
    if (!((this.members != null) && (this.memberSort != null))) {
      return;
    }
    switch (this.memberSort) {
      case "nameDesc":
        this.members.comparator = function(a, b) {
          return (b.get('name') || 'Anonymous').localeCompare(a.get('name') || 'Anonymous');
        };
        break;
      case "progressAsc":
        this.members.comparator = function(a, b) {
          var aComplete, aStarted, bComplete, bStarted, concept, state;
          aComplete = (function() {
            var ref, results;
            ref = userConceptsMap[a.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'complete') {
                results.push(concept);
              }
            }
            return results;
          })();
          bComplete = (function() {
            var ref, results;
            ref = userConceptsMap[b.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'complete') {
                results.push(concept);
              }
            }
            return results;
          })();
          aStarted = (function() {
            var ref, results;
            ref = userConceptsMap[a.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'started') {
                results.push(concept);
              }
            }
            return results;
          })();
          bStarted = (function() {
            var ref, results;
            ref = userConceptsMap[b.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'started') {
                results.push(concept);
              }
            }
            return results;
          })();
          if (aComplete < bComplete) {
            return -1;
          } else if (aComplete > bComplete) {
            return 1;
          } else if (aStarted < bStarted) {
            return -1;
          } else if (aStarted > bStarted) {
            return 1;
          }
          if (highestUserLevelCountMap[a.id] < highestUserLevelCountMap[b.id]) {
            return -1;
          } else if (highestUserLevelCountMap[a.id] > highestUserLevelCountMap[b.id]) {
            return 1;
          }
          return (a.get('name') || 'Anonymous').localeCompare(b.get('name') || 'Anonymous');
        };
        break;
      case "progressDesc":
        this.members.comparator = function(a, b) {
          var aComplete, aStarted, bComplete, bStarted, concept, state;
          aComplete = (function() {
            var ref, results;
            ref = userConceptsMap[a.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'complete') {
                results.push(concept);
              }
            }
            return results;
          })();
          bComplete = (function() {
            var ref, results;
            ref = userConceptsMap[b.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'complete') {
                results.push(concept);
              }
            }
            return results;
          })();
          aStarted = (function() {
            var ref, results;
            ref = userConceptsMap[a.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'started') {
                results.push(concept);
              }
            }
            return results;
          })();
          bStarted = (function() {
            var ref, results;
            ref = userConceptsMap[b.id];
            results = [];
            for (concept in ref) {
              state = ref[concept];
              if (state === 'started') {
                results.push(concept);
              }
            }
            return results;
          })();
          if (aComplete > bComplete) {
            return -1;
          } else if (aComplete < bComplete) {
            return 1;
          } else if (aStarted > bStarted) {
            return -1;
          } else if (aStarted < bStarted) {
            return 1;
          }
          if (highestUserLevelCountMap[a.id] > highestUserLevelCountMap[b.id]) {
            return -1;
          } else if (highestUserLevelCountMap[a.id] < highestUserLevelCountMap[b.id]) {
            return 1;
          }
          return (b.get('name') || 'Anonymous').localeCompare(a.get('name') || 'Anonymous');
        };
        break;
      default:
        this.members.comparator = function(a, b) {
          return (a.get('name') || 'Anonymous').localeCompare(b.get('name') || 'Anonymous');
        };
    }
    return this.members.sort();
  };

  ClanDetailsView.prototype.updateHeroIcons = function() {
    var hero, i, len, member, original, ref, ref1, ref2, results, slug;
    if (((ref = this.members) != null ? ref.models : void 0) == null) {
      return;
    }
    ref1 = this.members.models;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      member = ref1[i];
      if (!(hero = (ref2 = member.get('heroConfig')) != null ? ref2.thangType : void 0)) {
        continue;
      }
      results.push((function() {
        var ref3, results1;
        ref3 = ThangType.heroes;
        results1 = [];
        for (slug in ref3) {
          original = ref3[slug];
          if (original === hero) {
            results1.push(this.$el.find(".player-hero-icon[data-memberID=" + member.id + "]").removeClass('.player-hero-icon').addClass('player-hero-icon ' + slug));
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  ClanDetailsView.prototype.onCampaignSync = function() {
    var campaign, campaignLevelProgression, concept, i, j, len, len1, level, levelID, ref, ref1, ref2, ref3;
    if (!this.campaigns.loaded) {
      return;
    }
    this.campaignLevelProgressions = [];
    this.conceptsProgression = [];
    this.arenas = [];
    ref = this.campaigns.models;
    for (i = 0, len = ref.length; i < len; i++) {
      campaign = ref[i];
      if (!(campaign.get('type') === 'hero')) {
        continue;
      }
      campaignLevelProgression = {
        ID: campaign.id,
        slug: campaign.get('slug'),
        name: utils.i18n(campaign.attributes, 'fullName') || utils.i18n(campaign.attributes, 'name'),
        levels: []
      };
      ref1 = campaign.get('levels');
      for (levelID in ref1) {
        level = ref1[levelID];
        campaignLevelProgression.levels.push({
          ID: levelID,
          slug: level.slug,
          name: utils.i18n(level, 'name')
        });
        if (level.concepts != null) {
          ref2 = level.concepts;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            concept = ref2[j];
            if (indexOf.call(this.conceptsProgression, concept) < 0) {
              this.conceptsProgression.push(concept);
            }
          }
        }
        if (level.type === 'hero-ladder' && ((ref3 = level.slug) !== 'capture-their-flag')) {
          this.arenas.push(level);
        }
      }
      this.campaignLevelProgressions.push(campaignLevelProgression);
    }
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onClanSync = function() {
    if (this.owner == null) {
      this.owner = new User({
        _id: this.clan.get('ownerID')
      });
      this.listenTo(this.owner, 'sync', (function(_this) {
        return function() {
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this));
      this.supermodel.loadModel(this.owner, {
        cache: false
      });
    }
    if (this.clan.get("dashboardType") === "premium") {
      this.supermodel.loadCollection(this.memberSessions, 'member_sessions', {
        cache: false
      });
    }
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onMembersSync = function() {
    this.stats.averageLevel = Math.round(this.members.reduce((function(sum, member) {
      return sum + member.level();
    }), 0) / this.members.length);
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onMemberAchievementsSync = function() {
    var achievement, base, i, len, ref, user;
    this.memberAchievementsMap = {};
    ref = this.memberAchievements.models;
    for (i = 0, len = ref.length; i < len; i++) {
      achievement = ref[i];
      user = achievement.get('user');
      if ((base = this.memberAchievementsMap)[user] == null) {
        base[user] = [];
      }
      this.memberAchievementsMap[user].push(achievement);
    }
    for (user in this.memberAchievementsMap) {
      this.memberAchievementsMap[user].sort(function(a, b) {
        return b.id.localeCompare(a.id);
      });
    }
    this.stats.averageAchievements = Math.round(this.memberAchievements.models.length / Object.keys(this.memberAchievementsMap).length);
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onMemberSessionsSync = function() {
    var base, base1, count, i, j, language, languageCounts, len, len1, levelInfo, levelSession, levelSlug, memberSessions, mostUsedCount, ref, ref1, ref2, user;
    this.memberLevelMap = {};
    memberSessions = {};
    ref = this.memberSessions.models;
    for (i = 0, len = ref.length; i < len; i++) {
      levelSession = ref[i];
      if (levelSession.isMultiplayer()) {
        continue;
      }
      user = levelSession.get('creator');
      levelSlug = levelSession.get('levelID');
      if ((base = this.memberLevelMap)[user] == null) {
        base[user] = {};
      }
      if ((base1 = this.memberLevelMap[user])[levelSlug] == null) {
        base1[levelSlug] = {};
      }
      levelInfo = {
        level: levelSession.get('levelName'),
        levelID: levelSession.get('levelID'),
        changed: new Date(levelSession.get('changed')).toLocaleString(),
        playtime: levelSession.get('playtime'),
        sessionID: levelSession.id
      };
      this.memberLevelMap[user][levelSlug].levelInfo = levelInfo;
      if (((ref1 = levelSession.get('state')) != null ? ref1.complete : void 0) === true) {
        this.memberLevelMap[user][levelSlug].state = 'complete';
        if (memberSessions[user] == null) {
          memberSessions[user] = [];
        }
        memberSessions[user].push(levelSession);
      } else {
        this.memberLevelMap[user][levelSlug].state = 'started';
      }
    }
    this.memberMaxLevelCount = 0;
    this.memberLanguageMap = {};
    for (user in memberSessions) {
      languageCounts = {};
      ref2 = memberSessions[user];
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        levelSession = ref2[j];
        language = levelSession.get('codeLanguage') || levelSession.get('submittedCodeLanguage');
        if (language) {
          languageCounts[language] = (languageCounts[language] || 0) + 1;
        }
      }
      if (this.memberMaxLevelCount < memberSessions[user].length) {
        this.memberMaxLevelCount = memberSessions[user].length;
      }
      mostUsedCount = 0;
      for (language in languageCounts) {
        count = languageCounts[language];
        if (count > mostUsedCount) {
          mostUsedCount = count;
          this.memberLanguageMap[user] = language;
        }
      }
    }
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onMouseEnterPoint = function(e) {
    var container, height, margin, offset, scrollTop;
    $('.level-popup-container').hide();
    container = $(e.target).find('.level-popup-container').show();
    margin = 20;
    offset = $(e.target).offset();
    scrollTop = $(e.target).offsetParent().scrollTop();
    height = container.outerHeight();
    container.css('left', offset.left + e.offsetX);
    return container.css('top', offset.top + scrollTop - height - margin);
  };

  ClanDetailsView.prototype.onMouseLeavePoint = function(e) {
    return $(e.target).find('.level-popup-container').hide();
  };

  ClanDetailsView.prototype.onClickLevel = function(e) {
    var levelInfo, url;
    levelInfo = $(e.target).data('level-info');
    if (!(((levelInfo != null ? levelInfo.levelID : void 0) != null) && ((levelInfo != null ? levelInfo.sessionID : void 0) != null))) {
      return;
    }
    url = "/play/level/" + levelInfo.levelID + "?session=" + levelInfo.sessionID + "&observing=true";
    return window.open(url, '_blank');
  };

  ClanDetailsView.prototype.onDeleteClan = function(e) {
    var options;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    if (!window.confirm("Delete Clan?")) {
      return;
    }
    options = {
      url: "/db/clan/" + this.clanID,
      method: 'DELETE',
      error: (function(_this) {
        return function(model, response, options) {
          return console.error('Error joining clan', response);
        };
      })(this),
      success: (function(_this) {
        return function(model, response, options) {
          app.router.navigate("/clans");
          return window.location.reload();
        };
      })(this)
    };
    return this.supermodel.addRequestResource('delete_clan', options).load();
  };

  ClanDetailsView.prototype.onEditDescriptionSave = function(e) {
    var description;
    description = $('.edit-description-input').val();
    this.clan.set('description', description);
    this.clan.patch();
    return $('#editDescriptionModal').modal('hide');
  };

  ClanDetailsView.prototype.onEditNameSave = function(e) {
    var name;
    if (name = $('.edit-name-input').val()) {
      this.clan.set('name', name);
      this.clan.patch();
    }
    return $('#editNameModal').modal('hide');
  };

  ClanDetailsView.prototype.onExpandedProgressCheckbox = function(e) {
    this.showExpandedProgress = $('.expand-progress-checkbox').prop('checked');
    if (typeof this.render === "function") {
      this.render();
    }
    return $('.expand-progress-checkbox').attr('checked', this.showExpandedProgress);
  };

  ClanDetailsView.prototype.onJoinClan = function(e) {
    var options, ref;
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    if (!this.clan.loaded) {
      return;
    }
    if (this.clan.get('type') === 'private' && !me.isPremium()) {
      this.openModalView(new SubscribeModal());
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Show subscription modal', {
          category: 'Subscription',
          label: 'join clan'
        });
      }
      return;
    }
    options = {
      url: "/db/clan/" + this.clanID + "/join",
      method: 'PUT',
      error: (function(_this) {
        return function(model, response, options) {
          return console.error('Error joining clan', response);
        };
      })(this),
      success: (function(_this) {
        return function(model, response, options) {
          return _this.refreshData();
        };
      })(this)
    };
    return this.supermodel.addRequestResource('join_clan', options).load();
  };

  ClanDetailsView.prototype.onLeaveClan = function(e) {
    var options;
    options = {
      url: "/db/clan/" + this.clanID + "/leave",
      method: 'PUT',
      error: (function(_this) {
        return function(model, response, options) {
          return console.error('Error leaving clan', response);
        };
      })(this),
      success: (function(_this) {
        return function(model, response, options) {
          return _this.refreshData();
        };
      })(this)
    };
    return this.supermodel.addRequestResource('leave_clan', options).load();
  };

  ClanDetailsView.prototype.onClickMemberHeader = function(e) {
    this.memberSort = this.memberSort === 'nameAsc' ? 'nameDesc' : 'nameAsc';
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onClickProgressHeader = function(e) {
    this.memberSort = this.memberSort === 'progressAsc' ? 'progressDesc' : 'progressAsc';
    return typeof this.render === "function" ? this.render() : void 0;
  };

  ClanDetailsView.prototype.onRemoveMember = function(e) {
    var memberID, options;
    if (!window.confirm("Remove Hero?")) {
      return;
    }
    if (memberID = $(e.target).data('id')) {
      options = {
        url: "/db/clan/" + this.clanID + "/remove/" + memberID,
        method: 'PUT',
        error: (function(_this) {
          return function(model, response, options) {
            return console.error('Error removing clan member', response);
          };
        })(this),
        success: (function(_this) {
          return function(model, response, options) {
            return _this.refreshData();
          };
        })(this)
      };
      return this.supermodel.addRequestResource('remove_member', options).load();
    } else {
      return console.error("No member ID attached to remove button.");
    }
  };

  return ClanDetailsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/clans/ClanDetailsView.js.map