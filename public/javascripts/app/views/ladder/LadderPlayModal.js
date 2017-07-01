require.register("views/ladder/LadderPlayModal", function(exports, require, module) {
var ChallengersData, LadderPlayModal, LeaderboardCollection, ModalView, ThangType, me, teamDataFromLevel, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/ladder/play_modal');

ThangType = require('models/ThangType');

me = require('core/auth').me;

LeaderboardCollection = require('collections/LeaderboardCollection');

teamDataFromLevel = require('./utils').teamDataFromLevel;

module.exports = LadderPlayModal = (function(superClass) {
  extend(LadderPlayModal, superClass);

  function LadderPlayModal() {
    return LadderPlayModal.__super__.constructor.apply(this, arguments);
  }

  LadderPlayModal.prototype.id = 'ladder-play-modal';

  LadderPlayModal.prototype.template = template;

  LadderPlayModal.prototype.closeButton = true;

  LadderPlayModal.shownTutorialButton = false;

  LadderPlayModal.prototype.tutorialLevelExists = null;

  LadderPlayModal.prototype.events = {
    'click #skip-tutorial-button': 'hideTutorialButtons',
    'change #tome-language': 'updateLanguage'
  };

  LadderPlayModal.prototype.defaultAceConfig = {
    language: 'javascript',
    keyBindings: 'default',
    invisibles: false,
    indentGuides: false,
    behaviors: false,
    liveCompletion: true
  };

  LadderPlayModal.prototype.initialize = function(options, level, session1, team) {
    var i, len, ref, ref1, ref2, ref3, ref4, t, teams;
    this.level = level;
    this.session = session1;
    this.team = team;
    this.otherTeam = this.team === 'ogres' ? 'humans' : 'ogres';
    this.wizardType = ThangType.loadUniversalWizard();
    this.startLoadingChallengersMaybe();
    this.levelID = this.level.get('slug') || this.level.id;
    this.language = (ref = (ref1 = (ref2 = this.session) != null ? ref2.get('codeLanguage') : void 0) != null ? ref1 : (ref3 = me.get('aceConfig')) != null ? ref3.language : void 0) != null ? ref : 'python';
    this.languages = [
      {
        id: 'python',
        name: 'Python'
      }, {
        id: 'javascript',
        name: 'JavaScript'
      }, {
        id: 'coffeescript',
        name: 'CoffeeScript (Experimental)'
      }, {
        id: 'lua',
        name: 'Lua'
      }, {
        id: 'java',
        name: 'Java'
      }
    ];
    this.myName = me.get('name') || 'Newcomer';
    teams = [];
    ref4 = teamDataFromLevel(this.level);
    for (i = 0, len = ref4.length; i < len; i++) {
      t = ref4[i];
      teams[t.id] = t;
    }
    this.teamColor = teams[this.team].primaryColor;
    this.teamBackgroundColor = teams[this.team].bgColor;
    this.opponentTeamColor = teams[this.otherTeam].primaryColor;
    return this.opponentTeamBackgroundColor = teams[this.otherTeam].bgColor;
  };

  LadderPlayModal.prototype.updateLanguage = function() {
    var aceConfig, ref;
    aceConfig = _.cloneDeep((ref = me.get('aceConfig')) != null ? ref : {});
    aceConfig = _.defaults(aceConfig, this.defaultAceConfig);
    aceConfig.language = this.$el.find('#tome-language').val();
    me.set('aceConfig', aceConfig);
    me.patch();
    if (this.session) {
      this.session.set('codeLanguage', aceConfig.language);
      return this.session.patch();
    }
  };

  LadderPlayModal.prototype.startLoadingChallengersMaybe = function() {
    var matches, ref, ref1, ref2;
    if (this.options.league) {
      matches = (ref = _.find((ref1 = this.session) != null ? ref1.get('leagues') : void 0, {
        leagueID: this.options.league.id
      })) != null ? ref.stats.matches : void 0;
    } else {
      matches = (ref2 = this.session) != null ? ref2.get('matches') : void 0;
    }
    if (matches != null ? matches.length : void 0) {
      return this.loadNames();
    } else {
      return this.loadChallengers();
    }
  };

  LadderPlayModal.prototype.loadChallengers = function() {
    this.challengersCollection = new ChallengersData(this.level, this.team, this.otherTeam, this.session, this.options.league);
    return this.listenTo(this.challengersCollection, 'sync', this.loadNames);
  };

  LadderPlayModal.prototype.loadNames = function() {
    var challenger, i, ids, len, ref, ref1, success, userNamesRequest;
    this.challengers = this.getChallengers();
    ids = (function() {
      var i, len, ref, results;
      ref = _.values(this.challengers);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        challenger = ref[i];
        results.push(challenger.opponentID);
      }
      return results;
    }).call(this);
    ref = _.values(this.challengers);
    for (i = 0, len = ref.length; i < len; i++) {
      challenger = ref[i];
      if (!(challenger && this.wizardType.loaded)) {
        continue;
      }
      if ((!challenger.opponentImageSource) && ((ref1 = challenger.opponentWizard) != null ? ref1.colorConfig : void 0)) {
        challenger.opponentImageSource = this.wizardType.getPortraitSource({
          colorConfig: challenger.opponentWizard.colorConfig
        });
      }
    }
    success = (function(_this) {
      return function(nameMap) {
        var j, len1, ref2, ref3, ref4;
        _this.nameMap = nameMap;
        ref2 = _.values(_this.challengers);
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          challenger = ref2[j];
          challenger.opponentName = ((ref3 = _this.nameMap[challenger.opponentID]) != null ? ref3.name : void 0) || 'Anonymous';
          challenger.opponentWizard = ((ref4 = _this.nameMap[challenger.opponentID]) != null ? ref4.wizard : void 0) || {};
        }
        return _this.checkWizardLoaded();
      };
    })(this);
    userNamesRequest = this.supermodel.addRequestResource('user_names', {
      url: '/db/user/-/names',
      data: {
        ids: ids,
        wizard: true
      },
      method: 'POST',
      success: success
    }, 0);
    return userNamesRequest.load();
  };

  LadderPlayModal.prototype.checkWizardLoaded = function() {
    if (this.wizardType.loaded) {
      return this.finishRendering();
    } else {
      return this.listenToOnce(this.wizardType, 'sync', this.finishRendering);
    }
  };

  LadderPlayModal.prototype.finishRendering = function() {
    var myColorConfig, ref;
    if (this.destroyed) {
      return;
    }
    this.checkTutorialLevelExists((function(_this) {
      return function(exists) {
        _this.tutorialLevelExists = exists;
        _this.render();
        return _this.maybeShowTutorialButtons();
      };
    })(this));
    this.genericPortrait = this.wizardType.getPortraitSource();
    myColorConfig = (ref = me.get('wizard')) != null ? ref.colorConfig : void 0;
    return this.myPortrait = myColorConfig ? this.wizardType.getPortraitSource({
      colorConfig: myColorConfig
    }) : this.genericPortrait;
  };

  LadderPlayModal.prototype.maybeShowTutorialButtons = function() {
    if (this.session || LadderPlayModal.shownTutorialButton || !this.tutorialLevelExists) {
      return;
    }
    this.$el.find('#normal-view').addClass('secret');
    this.$el.find('.modal-header').addClass('secret');
    this.$el.find('#noob-view').removeClass('secret');
    return LadderPlayModal.shownTutorialButton = true;
  };

  LadderPlayModal.prototype.hideTutorialButtons = function() {
    this.$el.find('#normal-view').removeClass('secret');
    this.$el.find('.modal-header').removeClass('secret');
    return this.$el.find('#noob-view').addClass('secret');
  };

  LadderPlayModal.prototype.checkTutorialLevelExists = function(cb) {
    var failure, levelID, success, tutorialLevelID;
    levelID = this.level.get('slug') || this.level.id;
    tutorialLevelID = levelID + "-tutorial";
    success = (function(_this) {
      return function() {
        return cb(true);
      };
    })(this);
    failure = (function(_this) {
      return function() {
        return cb(false);
      };
    })(this);
    return $.ajax({
      type: 'GET',
      url: "/db/level/" + tutorialLevelID + "/exists",
      success: success,
      error: failure
    });
  };

  LadderPlayModal.prototype.getChallengers = function() {
    var challengers, easyInfo, hardInfo, lost, m, matches, mediumInfo, ref, ref1, ref2, tied, won;
    challengers = {};
    if (this.challengersCollection) {
      easyInfo = this.challengeInfoFromSession(this.challengersCollection.easyPlayer.models[0]);
      mediumInfo = this.challengeInfoFromSession(this.challengersCollection.mediumPlayer.models[0]);
      hardInfo = this.challengeInfoFromSession(this.challengersCollection.hardPlayer.models[0]);
    } else {
      if (this.options.league) {
        matches = (ref = _.find((ref1 = this.session) != null ? ref1.get('leagues') : void 0, {
          leagueID: this.options.league.id
        })) != null ? ref.stats.matches : void 0;
      } else {
        matches = (ref2 = this.session) != null ? ref2.get('matches') : void 0;
      }
      won = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = matches.length; i < len; i++) {
          m = matches[i];
          if (m.metrics.rank < m.opponents[0].metrics.rank) {
            results.push(m);
          }
        }
        return results;
      })();
      lost = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = matches.length; i < len; i++) {
          m = matches[i];
          if (m.metrics.rank > m.opponents[0].metrics.rank) {
            results.push(m);
          }
        }
        return results;
      })();
      tied = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = matches.length; i < len; i++) {
          m = matches[i];
          if (m.metrics.rank === m.opponents[0].metrics.rank) {
            results.push(m);
          }
        }
        return results;
      })();
      easyInfo = this.challengeInfoFromMatches(won);
      mediumInfo = this.challengeInfoFromMatches(tied);
      hardInfo = this.challengeInfoFromMatches(lost);
    }
    this.addChallenger(easyInfo, challengers, 'easy');
    this.addChallenger(mediumInfo, challengers, 'medium');
    this.addChallenger(hardInfo, challengers, 'hard');
    return challengers;
  };

  LadderPlayModal.prototype.addChallenger = function(info, challengers, title) {
    var key, value;
    if (!info) {
      return;
    }
    for (key in challengers) {
      value = challengers[key];
      if (value.sessionID === info.sessionID) {
        return;
      }
    }
    return challengers[title] = info;
  };

  LadderPlayModal.prototype.challengeInfoFromSession = function(session) {
    if (!session) {
      return;
    }
    return {
      sessionID: session.id,
      opponentID: session.get('creator'),
      codeLanguage: session.get('submittedCodeLanguage')
    };
  };

  LadderPlayModal.prototype.challengeInfoFromMatches = function(matches) {
    var match, opponent;
    if (!(matches != null ? matches.length : void 0)) {
      return;
    }
    match = _.sample(matches);
    opponent = match.opponents[0];
    return {
      sessionID: opponent.sessionID,
      opponentID: opponent.userID,
      codeLanguage: opponent.codeLanguage
    };
  };

  return LadderPlayModal;

})(ModalView);

ChallengersData = (function() {
  function ChallengersData(level, team, otherTeam, session1, league) {
    var i, len, player, playerResource, ref, ref1, ref2, ref3, ref4, score;
    this.level = level;
    this.team = team;
    this.otherTeam = otherTeam;
    this.session = session1;
    this.league = league;
    _.extend(this, Backbone.Events);
    if (this.league) {
      score = ((ref = _.find((ref1 = this.session) != null ? ref1.get('leagues') : void 0, {
        leagueID: this.league.id
      })) != null ? (ref2 = ref.stats) != null ? ref2.totalScore : void 0 : void 0) || 10;
    } else {
      score = ((ref3 = this.session) != null ? ref3.get('totalScore') : void 0) || 10;
    }
    ref4 = [
      {
        type: 'easyPlayer',
        order: 1,
        scoreOffset: score - 5
      }, {
        type: 'mediumPlayer',
        order: 1,
        scoreOffset: score
      }, {
        type: 'hardPlayer',
        order: -1,
        scoreOffset: score + 5
      }
    ];
    for (i = 0, len = ref4.length; i < len; i++) {
      player = ref4[i];
      playerResource = this[player.type] = new LeaderboardCollection(this.level, this.collectionParameters({
        order: player.order,
        scoreOffset: player.scoreOffset
      }));
      playerResource.fetch({
        cache: false
      });
      this.listenToOnce(playerResource, 'sync', this.challengerLoaded);
    }
  }

  ChallengersData.prototype.collectionParameters = function(parameters) {
    parameters.team = this.otherTeam;
    parameters.limit = 1;
    if (this.league) {
      parameters['leagues.leagueID'] = this.league.id;
    }
    return parameters;
  };

  ChallengersData.prototype.challengerLoaded = function() {
    if (this.allLoaded()) {
      this.loaded = true;
      return this.trigger('sync');
    }
  };

  ChallengersData.prototype.playerIDs = function() {
    var c, collections, i, len, results;
    collections = [this.easyPlayer, this.mediumPlayer, this.hardPlayer];
    results = [];
    for (i = 0, len = collections.length; i < len; i++) {
      c = collections[i];
      if (c != null ? c.models[0] : void 0) {
        results.push(c.models[0].get('creator'));
      }
    }
    return results;
  };

  ChallengersData.prototype.allLoaded = function() {
    return _.all([this.easyPlayer.loaded, this.mediumPlayer.loaded, this.hardPlayer.loaded]);
  };

  return ChallengersData;

})();
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/LadderPlayModal.js.map