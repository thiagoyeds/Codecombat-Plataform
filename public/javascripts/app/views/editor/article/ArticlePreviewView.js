require.register("views/editor/article/ArticlePreviewView", function(exports, require, module) {
var ArticlePreviewView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/article/preview');

require('game-libraries');

module.exports = ArticlePreviewView = (function(superClass) {
  extend(ArticlePreviewView, superClass);

  function ArticlePreviewView() {
    return ArticlePreviewView.__super__.constructor.apply(this, arguments);
  }

  ArticlePreviewView.prototype.id = 'editor-article-preview-view';

  ArticlePreviewView.prototype.template = template;

  return ArticlePreviewView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/article/ArticlePreviewView.js.map