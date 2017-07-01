require.register("views/artisans/LevelConceptMap", function(exports, require, module) {
var Campaign, Campaigns, CocoCollection, Level, LevelConceptMap, Levels, RootView, conceptList, parser, realm, tagger, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/artisans/concept-map-view');

Level = require('models/Level');

Campaign = require('models/Campaign');

CocoCollection = require('collections/CocoCollection');

Campaigns = require('collections/Campaigns');

Levels = require('collections/Levels');

tagger = require('lib/SolutionConceptTagger');

conceptList = require('schemas/concepts');

if (typeof esper !== 'undefined') {
  realm = new esper().realm;
  parser = realm.parser.bind(realm);
}

module.exports = LevelConceptMap = (function(superClass) {
  var excludedCampaigns, excludedLevelSnippets, includedLanguages;

  extend(LevelConceptMap, superClass);

  function LevelConceptMap() {
    return LevelConceptMap.__super__.constructor.apply(this, arguments);
  }

  LevelConceptMap.prototype.template = template;

  LevelConceptMap.prototype.id = 'solution-problems-view';

  excludedCampaigns = ['picoctf', 'auditions', 'dungeon-branching-test', 'forest-branching-test', 'desert-branching-test'];

  includedLanguages = ['javascript'];

  excludedLevelSnippets = ['treasure', 'brawl', 'siege'];

  LevelConceptMap.prototype.unloadedCampaigns = 0;

  LevelConceptMap.prototype.campaignLevels = {};

  LevelConceptMap.prototype.loadedLevels = {};

  LevelConceptMap.prototype.data = {};

  LevelConceptMap.prototype.problemCount = 0;

  LevelConceptMap.prototype.initialize = function() {
    this.campaigns = new Campaigns([]);
    this.listenTo(this.campaigns, 'sync', this.onCampaignsLoaded);
    return this.supermodel.trackRequest(this.campaigns.fetch({
      data: {
        project: 'slug'
      }
    }));
  };

  LevelConceptMap.prototype.onCampaignsLoaded = function(campCollection) {
    var campaign, campaignSlug, i, len, ref, results;
    ref = campCollection.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      campaign = ref[i];
      campaignSlug = campaign.get('slug');
      if (indexOf.call(excludedCampaigns, campaignSlug) >= 0) {
        continue;
      }
      this.unloadedCampaigns++;
      this.campaignLevels[campaignSlug] = new Levels();
      this.listenTo(this.campaignLevels[campaignSlug], 'sync', this.onLevelsLoaded.bind(this, campaignSlug));
      results.push(this.supermodel.trackRequest(this.campaignLevels[campaignSlug].fetchForCampaign(campaignSlug, {
        data: {
          project: 'thangs,name,slug,campaign'
        }
      })));
    }
    return results;
  };

  LevelConceptMap.prototype.onLevelsLoaded = function(campaignSlug, lvlCollection) {
    var i, k, len, level, ll, ref;
    ref = lvlCollection.models;
    for (k = i = 0, len = ref.length; i < len; k = ++i) {
      level = ref[k];
      level.campaign = campaignSlug;
      if (this.loadedLevels[campaignSlug] == null) {
        this.loadedLevels[campaignSlug] = {};
      }
      if (typeof ll === "undefined" || ll === null) {
        ll = {};
      }
      level.seqNo = lvlCollection.models.length - k;
      this.loadedLevels[campaignSlug][level.get('slug')] = level;
    }
    if (--this.unloadedCampaigns === 0) {
      return this.onAllLevelsLoaded();
    }
  };

  LevelConceptMap.prototype.onAllLevelsLoaded = function() {
    var campaign, campaignSlug, component, i, isBad, len, level, levelSlug, plan, ref, thangs, word;
    ref = this.loadedLevels;
    for (campaignSlug in ref) {
      campaign = ref[campaignSlug];
      for (levelSlug in campaign) {
        level = campaign[levelSlug];
        if (level == null) {
          console.error('Level Slug doesn\'t have associated Level', levelSlug);
          continue;
        }
        isBad = false;
        for (i = 0, len = excludedLevelSnippets.length; i < len; i++) {
          word = excludedLevelSnippets[i];
          if (levelSlug.indexOf(word) !== -1) {
            isBad = true;
          }
        }
        if (isBad) {
          continue;
        }
        thangs = level.get('thangs');
        component = null;
        thangs = _.filter(thangs, function(elem) {
          return _.findWhere(elem.components, function(elem2) {
            var ref1;
            if (((ref1 = elem2.config) != null ? ref1.programmableMethods : void 0) != null) {
              component = elem2;
              return true;
            }
          });
        });
        if (thangs.length > 1) {
          console.warn('Level has more than 1 programmableMethod Thangs', levelSlug);
          continue;
        }
        if (component == null) {
          console.error('Level doesn\'t have programmableMethod Thang', levelSlug);
          continue;
        }
        plan = component.config.programmableMethods.plan;
        level.tags = this.tagLevel(_.find(plan.solutions, function(s) {
          return s.language === 'javascript';
        }));
      }
      this.data[campaignSlug] = _.sortBy(_.values(this.loadedLevels[campaignSlug]), 'seqNo');
    }
    console.log(this.render, this.loadedLevels);
    return this.render();
  };

  LevelConceptMap.prototype.tagLevel = function(src) {
    var ast, e, error, moreTags, process, tags;
    if ((src != null ? src.source : void 0) == null) {
      return [];
    }
    try {
      ast = parser(src.source);
      moreTags = tagger(src);
    } catch (error) {
      e = error;
      return ['parse error: ' + e.message];
    }
    tags = {};
    process = function(n) {
      var i, len, ref, ref1, results;
      if (n == null) {
        return;
      }
      switch (n.type) {
        case "Program":
        case "BlockStatement":
          ref = n.body;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            n = ref[i];
            results.push(process(n));
          }
          return results;
          break;
        case "FunctionDeclaration":
          tags['function-def'] = true;
          if (n.params > 0) {
            tags['function-params:' + n.params.length] = true;
          }
          return process(n.body);
        case "ExpressionStatement":
          return process(n.expression);
        case "CallExpression":
          return process(n.callee);
        case "MemberExpression":
          if (((ref1 = n.object) != null ? ref1.name : void 0) === 'hero') {
            return tags["hero." + n.property.name] = true;
          }
          break;
        case "WhileStatement":
          if (n.test.type === 'Literal' && n.test.value === true) {
            tags['while-true'] = true;
          } else {
            tags['while'] = true;
            process(n.test);
          }
          return process(n.body);
        case "ForStatement":
          tags['for'] = true;
          process(n.init);
          process(n.test);
          process(n.update);
          return process(n.body);
        case "IfStatement":
          tags['if'] = true;
          process(n.test);
          process(n.consequent);
          return process(n.alternate);
        case "Literal":
          if (n.value === true) {
            return tags['true'] = true;
          } else {
            return tags['literal:' + typeof n.value] = true;
          }
          break;
        case "BinaryExpression":
        case "LogicalExpression":
          process(n.left);
          process(n.right);
          return tags[n.operator] = true;
        case "AssignmentExpression":
          tags['assign:' + n.operator] = true;
          return process(n.right);
        default:
          return tags[n.type] = true;
      }
    };
    process(ast);
    Object.keys(tags).concat(moreTags);
    return _.map(moreTags, function(t) {
      var ref;
      return (ref = _.find(conceptList, (function(_this) {
        return function(e) {
          return e.concept === t;
        };
      })(this))) != null ? ref.name : void 0;
    });
  };

  return LevelConceptMap;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/artisans/LevelConceptMap.js.map