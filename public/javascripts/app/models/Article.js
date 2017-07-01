require.register("models/Article", function(exports, require, module) {
var Article, CocoModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = Article = (function(superClass) {
  extend(Article, superClass);

  function Article() {
    return Article.__super__.constructor.apply(this, arguments);
  }

  Article.className = 'Article';

  Article.schema = require('schemas/models/article');

  Article.prototype.urlRoot = '/db/article';

  Article.prototype.saveBackups = true;

  Article.prototype.editableByArtisans = true;

  return Article;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Article.js.map