require.register("views/editor/thang/ThangTypeSearchView", function(exports, require, module) {
var SearchView, ThangTypeSearchView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = ThangTypeSearchView = (function(superClass) {
  extend(ThangTypeSearchView, superClass);

  function ThangTypeSearchView() {
    this.onSearchChange = bind(this.onSearchChange, this);
    return ThangTypeSearchView.__super__.constructor.apply(this, arguments);
  }

  ThangTypeSearchView.prototype.id = 'thang-type-home-view';

  ThangTypeSearchView.prototype.modelLabel = 'Thang Type';

  ThangTypeSearchView.prototype.model = require('models/ThangType');

  ThangTypeSearchView.prototype.modelURL = '/db/thang.type';

  ThangTypeSearchView.prototype.tableTemplate = require('templates/editor/thang/table');

  ThangTypeSearchView.prototype.projection = ['original', 'name', 'version', 'description', 'slug', 'kind', 'rasterIcon', 'tasks'];

  ThangTypeSearchView.prototype.page = 'thang';

  ThangTypeSearchView.prototype.getRenderData = function() {
    var context;
    context = ThangTypeSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.thang_title';
    context.currentNew = 'editor.new_thang_title';
    context.currentNewSignup = 'editor.new_thang_title_login';
    context.currentSearch = 'editor.thang_search_title';
    context.newModelsAdminOnly = true;
    this.$el.i18n();
    return context;
  };

  ThangTypeSearchView.prototype.onSearchChange = function() {
    ThangTypeSearchView.__super__.onSearchChange.call(this);
    return this.$el.find('img').error(function() {
      return $(this).hide();
    });
  };

  return ThangTypeSearchView;

})(SearchView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/thang/ThangTypeSearchView.js.map