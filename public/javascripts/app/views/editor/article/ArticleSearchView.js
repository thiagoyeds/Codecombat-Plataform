require.register("views/editor/article/ArticleSearchView", function(exports, require, module) {
var ArticleSearchView, SearchView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SearchView = require('views/common/SearchView');

module.exports = ArticleSearchView = (function(superClass) {
  extend(ArticleSearchView, superClass);

  function ArticleSearchView() {
    return ArticleSearchView.__super__.constructor.apply(this, arguments);
  }

  ArticleSearchView.prototype.id = 'editor-article-home-view';

  ArticleSearchView.prototype.modelLabel = 'Article';

  ArticleSearchView.prototype.model = require('models/Article');

  ArticleSearchView.prototype.modelURL = '/db/article';

  ArticleSearchView.prototype.tableTemplate = require('templates/editor/article/table');

  ArticleSearchView.prototype.page = 'article';

  ArticleSearchView.prototype.getRenderData = function() {
    var context;
    context = ArticleSearchView.__super__.getRenderData.call(this);
    context.currentEditor = 'editor.article_title';
    context.currentNew = 'editor.new_article_title';
    context.currentNewSignup = 'editor.new_article_title_login';
    context.currentSearch = 'editor.article_search_title';
    context.newModelsAdminOnly = true;
    this.$el.i18n();
    return context;
  };

  return ArticleSearchView;

})(SearchView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/article/ArticleSearchView.js.map