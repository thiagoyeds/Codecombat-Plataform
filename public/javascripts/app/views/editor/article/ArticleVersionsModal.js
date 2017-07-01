require.register("views/editor/article/ArticleVersionsModal", function(exports, require, module) {
var ArticleVersionsModal, VersionsModal,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

VersionsModal = require('views/editor/modal/VersionsModal');

module.exports = ArticleVersionsModal = (function(superClass) {
  extend(ArticleVersionsModal, superClass);

  ArticleVersionsModal.prototype.id = 'editor-article-versions-view';

  ArticleVersionsModal.prototype.url = '/db/article/';

  ArticleVersionsModal.prototype.page = 'article';

  function ArticleVersionsModal(options, ID) {
    this.ID = ID;
    ArticleVersionsModal.__super__.constructor.call(this, options, this.ID, require('models/Article'));
  }

  return ArticleVersionsModal;

})(VersionsModal);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/article/ArticleVersionsModal.js.map