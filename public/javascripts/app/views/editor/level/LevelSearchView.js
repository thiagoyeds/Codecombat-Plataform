require.register("views/editor/level/LevelSearchView", function(exports, require, module) {
var LevelSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = LevelSearchView = (function(superClass) {
  extend(LevelSearchView, superClass);

  function LevelSearchView() {
    return LevelSearchView.__super__.constructor.apply(this, arguments);
  }

  LevelSearchView.prototype.id = 'editor-level-home-view';

  LevelSearchView.prototype.modelLabel = 'Level';

  LevelSearchView.prototype.model = require('models/Level');

  LevelSearchView.prototype.modelURL = '/db/level';

  LevelSearchView.prototype.tableTemplate = require('templates/editor/level/table');

  LevelSearchView.prototype.projection = ['slug', 'name', 'description', 'version', 'watchers', 'creator'];

  LevelSearchView.prototype.page = 'level';

  LevelSearchView.prototype.getRenderData = function() {
    var context;
    context = LevelSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.level_title';
    context.currentNew = 'editor.new_level_title';
    context.currentNewSignup = 'editor.new_level_title_login';
    context.currentSearch = 'editor.level_search_title';
    this.$el.i18n();
    return context;
  };

  return LevelSearchView;

})(SearchView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/LevelSearchView.js.map