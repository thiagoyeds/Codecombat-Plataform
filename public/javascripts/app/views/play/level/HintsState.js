require.register("views/play/level/HintsState", function(exports, require, module) {
var Article, HintsState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Article = require('models/Article');

module.exports = HintsState = (function(superClass) {
  extend(HintsState, superClass);

  function HintsState() {
    return HintsState.__super__.constructor.apply(this, arguments);
  }

  HintsState.prototype.initialize = function(attributes, options) {
    this.level = options.level, this.session = options.session, this.supermodel = options.supermodel;
    this.listenTo(this.level, 'change:documentation', this.update);
    return this.update();
  };

  HintsState.prototype.getHint = function(index) {
    var ref;
    return (ref = this.get('hints')) != null ? ref[index] : void 0;
  };

  HintsState.prototype.update = function() {
    var articles, doc, docs, general, hints, ref, specific, total;
    articles = this.supermodel.getModels(Article);
    docs = (ref = this.level.get('documentation')) != null ? ref : {};
    general = _.filter((function() {
      var i, len, ref1, ref2, results;
      ref1 = docs.generalArticles || [];
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        doc = ref1[i];
        results.push((ref2 = _.find(articles, function(article) {
          return article.get('original') === doc.original;
        })) != null ? ref2.attributes : void 0);
      }
      return results;
    })());
    specific = docs.specificArticles || [];
    hints = (docs.hintsB || docs.hints || []).concat(specific).concat(general);
    hints = _.sortBy(hints, function(doc) {
      if (doc.name === 'Intro') {
        return -1;
      }
      return 0;
    });
    total = _.size(hints);
    return this.set({
      hints: hints,
      total: total
    });
  };

  return HintsState;

})(Backbone.Model);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/HintsState.js.map