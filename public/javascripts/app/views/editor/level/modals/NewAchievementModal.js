require.register("views/editor/level/modals/NewAchievementModal", function(exports, require, module) {
var Achievement, NewAchievementModal, NewModelModal, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

NewModelModal = require('views/editor/modal/NewModelModal');

template = require('templates/editor/level/modal/new-achievement');

forms = require('core/forms');

Achievement = require('models/Achievement');

module.exports = NewAchievementModal = (function(superClass) {
  extend(NewAchievementModal, superClass);

  NewAchievementModal.prototype.id = 'new-achievement-modal';

  NewAchievementModal.prototype.template = template;

  NewAchievementModal.prototype.plain = false;

  NewAchievementModal.prototype.events = {
    'click #save-new-achievement-link': 'onAchievementSubmitted'
  };

  function NewAchievementModal(options) {
    NewAchievementModal.__super__.constructor.call(this, options);
    this.level = options.level;
  }

  NewAchievementModal.prototype.onAchievementSubmitted = function(e) {
    var slug, url;
    slug = _.string.slugify(this.$el.find('#name').val());
    url = "/editor/achievement/" + slug;
    return window.open(url, '_blank');
  };

  NewAchievementModal.prototype.createQuery = function() {
    var check, checked, checkedValues, i, id, len, query;
    checked = this.$el.find('[name=queryOptions]:checked');
    checkedValues = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = checked.length; i < len; i++) {
        check = checked[i];
        results.push($(check).val());
      }
      return results;
    })();
    query = {};
    for (i = 0, len = checkedValues.length; i < len; i++) {
      id = checkedValues[i];
      switch (id) {
        case 'misc-level-completion':
          query['state.complete'] = true;
          break;
        default:
          query["state.goalStates." + id + ".status"] = 'success';
      }
    }
    query['level.original'] = this.level.get('original');
    return query;
  };

  NewAchievementModal.prototype.makeNewModel = function() {
    var achievement, description, name, query;
    achievement = new Achievement;
    name = this.$el.find('#name').val();
    description = this.$el.find('#description').val();
    query = this.createQuery();
    achievement.set('name', name);
    achievement.set('description', description);
    achievement.set('query', query);
    achievement.set('collection', 'level.sessions');
    achievement.set('userField', 'creator');
    achievement.set('related', this.level.get('original'));
    return achievement;
  };

  return NewAchievementModal;

})(NewModelModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/NewAchievementModal.js.map