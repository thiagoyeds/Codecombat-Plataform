require.register("views/editor/achievement/AchievementSearchView", function(exports, require, module) {
var AchievementSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = AchievementSearchView = (function(superClass) {
  extend(AchievementSearchView, superClass);

  function AchievementSearchView() {
    return AchievementSearchView.__super__.constructor.apply(this, arguments);
  }

  AchievementSearchView.prototype.id = 'editor-achievement-home-view';

  AchievementSearchView.prototype.modelLabel = 'Achievement';

  AchievementSearchView.prototype.model = require('models/Achievement');

  AchievementSearchView.prototype.modelURL = '/db/achievement';

  AchievementSearchView.prototype.tableTemplate = require('templates/editor/achievement/table');

  AchievementSearchView.prototype.projection = ['name', 'description', 'collection', 'slug'];

  AchievementSearchView.prototype.getRenderData = function() {
    var context;
    context = AchievementSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.achievement_title';
    context.currentNew = 'editor.new_achievement_title';
    context.currentNewSignup = 'editor.new_achievement_title_login';
    context.currentSearch = 'editor.achievement_search_title';
    context.newModelsAdminOnly = true;
    if (!(me.isAdmin() || me.isArtisan())) {
      context.unauthorized = true;
    }
    return context;
  };

  return AchievementSearchView;

})(SearchView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/achievement/AchievementSearchView.js.map