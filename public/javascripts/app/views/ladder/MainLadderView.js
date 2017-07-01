require.register("views/ladder/MainLadderView", function(exports, require, module) {
var CocoCollection, LevelSession, LevelSessionsCollection, MainLadderView, RootView, campaigns, heroArenas, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/play/ladder_home');

LevelSession = require('models/LevelSession');

CocoCollection = require('collections/CocoCollection');

LevelSessionsCollection = (function(superClass) {
  extend(LevelSessionsCollection, superClass);

  LevelSessionsCollection.prototype.url = '';

  LevelSessionsCollection.prototype.model = LevelSession;

  function LevelSessionsCollection(model) {
    LevelSessionsCollection.__super__.constructor.call(this);
    this.url = "/db/user/" + me.id + "/level.sessions?project=state.complete,levelID";
  }

  return LevelSessionsCollection;

})(CocoCollection);

module.exports = MainLadderView = (function(superClass) {
  extend(MainLadderView, superClass);

  function MainLadderView() {
    return MainLadderView.__super__.constructor.apply(this, arguments);
  }

  MainLadderView.prototype.id = 'main-ladder-view';

  MainLadderView.prototype.template = template;

  MainLadderView.prototype.initialize = function() {
    this.levelStatusMap = [];
    this.levelPlayCountMap = [];
    this.campaigns = campaigns;
    this.sessions = this.supermodel.loadCollection(new LevelSessionsCollection(), 'your_sessions', {
      cache: false
    }, 0).model;
    this.listenToOnce(this.sessions, 'sync', this.onSessionsLoaded);
    return this.getLevelPlayCounts();
  };

  MainLadderView.prototype.onSessionsLoaded = function(e) {
    var i, len, ref, ref1, session;
    ref = this.sessions.models;
    for (i = 0, len = ref.length; i < len; i++) {
      session = ref[i];
      this.levelStatusMap[session.get('levelID')] = ((ref1 = session.get('state')) != null ? ref1.complete : void 0) ? 'complete' : 'started';
    }
    return this.render();
  };

  MainLadderView.prototype.getLevelPlayCounts = function() {
    var campaign, i, j, len, len1, level, levelIDs, levelPlayCountsRequest, ref, success;
    success = (function(_this) {
      return function(levelPlayCounts) {
        var i, len, level;
        if (_this.destroyed) {
          return;
        }
        for (i = 0, len = levelPlayCounts.length; i < len; i++) {
          level = levelPlayCounts[i];
          _this.levelPlayCountMap[level._id] = {
            playtime: level.playtime,
            sessions: level.sessions
          };
        }
        if (_this.supermodel.finished()) {
          return _this.render();
        }
      };
    })(this);
    levelIDs = [];
    for (i = 0, len = campaigns.length; i < len; i++) {
      campaign = campaigns[i];
      ref = campaign.levels;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        level = ref[j];
        levelIDs.push(level.id);
      }
    }
    levelPlayCountsRequest = this.supermodel.addRequestResource('play_counts', {
      url: '/db/level/-/play_counts',
      data: {
        ids: levelIDs
      },
      method: 'POST',
      success: success
    }, 0);
    return levelPlayCountsRequest.load();
  };

  return MainLadderView;

})(RootView);

heroArenas = [
  {
    name: 'Ace of Coders',
    difficulty: 3,
    id: 'ace-of-coders',
    image: '/file/db/level/55de80407a57948705777e89/Ace-of-Coders-banner.png',
    description: 'Battle for control over the icy treasure chests as your gigantic warrior marshals his armies against his mirror-match nemesis.'
  }, {
    name: 'Zero Sum',
    difficulty: 3,
    id: 'zero-sum',
    image: '/file/db/level/550363b4ec31df9c691ab629/MAR26-Banner_Zero%20Sum.png',
    description: 'Unleash your coding creativity in both gold gathering and battle tactics in this alpine mirror match between red sorcerer and blue sorcerer.'
  }, {
    name: 'Cavern Survival',
    difficulty: 1,
    id: 'cavern-survival',
    image: '/file/db/level/544437e0645c0c0000c3291d/OCT30-Cavern%20Survival.png',
    description: 'Stay alive longer than your multiplayer opponent amidst hordes of ogres!'
  }, {
    name: 'Dueling Grounds',
    difficulty: 1,
    id: 'dueling-grounds',
    image: '/file/db/level/5442ba0e1e835500007eb1c7/OCT27-Dueling%20Grounds.png',
    description: 'Battle head-to-head against another hero in this basic beginner combat arena.'
  }, {
    name: 'Multiplayer Treasure Grove',
    difficulty: 2,
    id: 'multiplayer-treasure-grove',
    image: '/file/db/level/5469643c37600b40e0e09c5b/OCT27-Multiplayer%20Treasure%20Grove.png',
    description: 'Mix collection, flags, and combat in this multiplayer coin-gathering arena.'
  }, {
    name: 'Harrowland',
    difficulty: 2,
    id: 'harrowland',
    image: '/file/db/level/54b83c2629843994803c838e/OCT27-Harrowland.png',
    description: 'Go head-to-head against another player in this dueling arena--but watch out for their friends!'
  }
];

campaigns = [
  {
    id: 'multiplayer',
    name: 'Multiplayer Arenas',
    description: '... in which you code head-to-head against other players.',
    levels: heroArenas
  }
];
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/MainLadderView.js.map