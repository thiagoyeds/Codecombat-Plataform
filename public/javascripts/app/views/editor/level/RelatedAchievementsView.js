require.register("views/editor/level/RelatedAchievementsView", function(exports, require, module) {
var Achievement, CocoView, NewAchievementModal, RelatedAchievementsCollection, RelatedAchievementsView, app, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/level/related-achievements');

RelatedAchievementsCollection = require('collections/RelatedAchievementsCollection');

Achievement = require('models/Achievement');

NewAchievementModal = require('./modals/NewAchievementModal');

app = require('core/application');

module.exports = RelatedAchievementsView = (function(superClass) {
  extend(RelatedAchievementsView, superClass);

  RelatedAchievementsView.prototype.id = 'related-achievements-view';

  RelatedAchievementsView.prototype.template = template;

  RelatedAchievementsView.prototype.className = 'tab-pane';

  RelatedAchievementsView.prototype.events = {
    'click #new-achievement-button': 'makeNewAchievement'
  };

  RelatedAchievementsView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function RelatedAchievementsView(options) {
    RelatedAchievementsView.__super__.constructor.call(this, options);
    this.level = options.level;
    this.relatedID = this.level.get('original');
    this.achievements = new RelatedAchievementsCollection(this.relatedID);
  }

  RelatedAchievementsView.prototype.loadAchievements = function() {
    if (this.loadingAchievements) {
      return;
    }
    this.supermodel.loadCollection(this.achievements, 'achievements');
    this.loadingAchievements = true;
    return this.render();
  };

  RelatedAchievementsView.prototype.onNewAchievementSaved = function(achievement) {};

  RelatedAchievementsView.prototype.makeNewAchievement = function() {
    var modal;
    modal = new NewAchievementModal({
      model: Achievement,
      modelLabel: 'Achievement',
      level: this.level
    });
    modal.once('model-created', this.onNewAchievementSaved);
    return this.openModalView(modal);
  };

  RelatedAchievementsView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#related-achievements-view') {
      return;
    }
    return this.loadAchievements();
  };

  return RelatedAchievementsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/RelatedAchievementsView.js.map