require.register("views/i18n/I18NHomeView", function(exports, require, module) {
var Achievement, Campaign, CocoCollection, Courses, I18NHomeView, Level, LevelComponent, PAGE_SIZE, Poll, RootView, ThangType, languages, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/i18n/i18n-home-view');

CocoCollection = require('collections/CocoCollection');

Courses = require('collections/Courses');

LevelComponent = require('models/LevelComponent');

ThangType = require('models/ThangType');

Level = require('models/Level');

Achievement = require('models/Achievement');

Campaign = require('models/Campaign');

Poll = require('models/Poll');

languages = _.keys(require('locale/locale')).sort();

PAGE_SIZE = 100;

module.exports = I18NHomeView = (function(superClass) {
  extend(I18NHomeView, superClass);

  I18NHomeView.prototype.id = 'i18n-home-view';

  I18NHomeView.prototype.template = template;

  I18NHomeView.prototype.events = {
    'change #language-select': 'onLanguageSelectChanged'
  };

  function I18NHomeView(options) {
    var c, i, len, project, ref;
    I18NHomeView.__super__.constructor.call(this, options);
    this.selectedLanguage = me.get('preferredLanguage') || '';
    this.aggregateModels = new Backbone.Collection();
    this.aggregateModels.comparator = function(m) {
      if (m.specificallyCovered) {
        return 2;
      }
      if (m.generallyCovered) {
        return 1;
      }
      return 0;
    };
    project = ['name', 'components.original', 'i18n', 'i18nCoverage', 'slug'];
    this.thangTypes = new CocoCollection([], {
      url: '/db/thang.type?view=i18n-coverage',
      project: project,
      model: ThangType
    });
    this.components = new CocoCollection([], {
      url: '/db/level.component?view=i18n-coverage',
      project: project,
      model: LevelComponent
    });
    this.levels = new CocoCollection([], {
      url: '/db/level?view=i18n-coverage',
      project: project,
      model: Level
    });
    this.achievements = new CocoCollection([], {
      url: '/db/achievement?view=i18n-coverage',
      project: project,
      model: Achievement
    });
    this.campaigns = new CocoCollection([], {
      url: '/db/campaign?view=i18n-coverage',
      project: project,
      model: Campaign
    });
    this.polls = new CocoCollection([], {
      url: '/db/poll?view=i18n-coverage',
      project: project,
      model: Poll
    });
    this.courses = new Courses();
    ref = [this.thangTypes, this.components, this.levels, this.achievements, this.campaigns, this.polls, this.courses];
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      c.skip = 0;
      c.fetch({
        data: {
          skip: 0,
          limit: PAGE_SIZE
        },
        cache: false
      });
      this.supermodel.loadCollection(c, 'documents');
      this.listenTo(c, 'sync', this.onCollectionSynced);
    }
  }

  I18NHomeView.prototype.onCollectionSynced = function(collection) {
    var getMore, i, len, model, ref;
    ref = collection.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      model.i18nURLBase = (function() {
        switch (model.constructor.className) {
          case 'ThangType':
            return '/i18n/thang/';
          case 'LevelComponent':
            return '/i18n/component/';
          case 'Achievement':
            return '/i18n/achievement/';
          case 'Level':
            return '/i18n/level/';
          case 'Campaign':
            return '/i18n/campaign/';
          case 'Poll':
            return '/i18n/poll/';
          case 'Course':
            return '/i18n/course/';
        }
      })();
    }
    getMore = collection.models.length === PAGE_SIZE;
    this.aggregateModels.add(collection.models);
    this.render();
    if (getMore) {
      collection.skip += PAGE_SIZE;
      return collection.fetch({
        data: {
          skip: collection.skip,
          limit: PAGE_SIZE
        }
      });
    }
  };

  I18NHomeView.prototype.getRenderData = function() {
    var c, covered, m, ref, total;
    c = I18NHomeView.__super__.getRenderData.call(this);
    this.updateCoverage();
    c.languages = languages;
    c.selectedLanguage = this.selectedLanguage;
    c.collection = this.aggregateModels;
    covered = ((function() {
      var i, len, ref, results;
      ref = this.aggregateModels.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        if (m.specificallyCovered) {
          results.push(m);
        }
      }
      return results;
    }).call(this)).length;
    total = this.aggregateModels.models.length;
    c.progress = total ? parseInt(100 * covered / total) : 100;
    c.showGeneralCoverage = /-/.test((ref = this.selectedLanguage) != null ? ref : 'en');
    return c;
  };

  I18NHomeView.prototype.updateCoverage = function() {
    var i, l, len, model, ref, relatedLanguages, selectedBase;
    selectedBase = this.selectedLanguage.slice(0, 3);
    relatedLanguages = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = languages.length; i < len; i++) {
        l = languages[i];
        if (_.string.startsWith(l, selectedBase) && l !== this.selectedLanguage) {
          results.push(l);
        }
      }
      return results;
    }).call(this);
    ref = this.aggregateModels.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      this.updateCoverageForModel(model, relatedLanguages);
      if (_.string.startsWith(this.selectedLanguage, 'en')) {
        model.generallyCovered = true;
      }
    }
    return this.aggregateModels.sort();
  };

  I18NHomeView.prototype.updateCoverageForModel = function(model, relatedLanguages) {
    var coverage, l, ref;
    model.specificallyCovered = true;
    model.generallyCovered = true;
    coverage = model.get('i18nCoverage');
    if (ref = this.selectedLanguage, indexOf.call(coverage, ref) < 0) {
      model.specificallyCovered = false;
      if (!_.any((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = relatedLanguages.length; i < len; i++) {
          l = relatedLanguages[i];
          results.push(indexOf.call(coverage, l) >= 0);
        }
        return results;
      })())) {
        model.generallyCovered = false;
      }
    }
  };

  I18NHomeView.prototype.afterRender = function() {
    I18NHomeView.__super__.afterRender.call(this);
    this.addLanguagesToSelect(this.$el.find('#language-select'), this.selectedLanguage);
    return this.$el.find('option[value="en-US"]').remove();
  };

  I18NHomeView.prototype.onLanguageSelectChanged = function(e) {
    this.selectedLanguage = $(e.target).val();
    if (this.selectedLanguage) {
      me.set('preferredLanguage', this.selectedLanguage);
      me.patch();
    }
    return this.render();
  };

  return I18NHomeView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NHomeView.js.map