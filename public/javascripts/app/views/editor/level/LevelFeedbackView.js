require.register("templates/editor/level/level-feedback-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),averageRating = locals_.averageRating,totalRatings = locals_.totalRatings,allFeedback = locals_.allFeedback,moment = locals_.moment;buf.push("<h2>Average Rating: " + (jade.escape((jade.interp = averageRating.toFixed(2)) == null ? '' : jade.interp)) + ", " + (jade.escape((jade.interp = totalRatings) == null ? '' : jade.interp)) + " ratings</h2><ul class=\"user-feedback-list list-group\">");
// iterate allFeedback
;(function(){
  var $$obj = allFeedback;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var feedback = $$obj[$index];

buf.push("<li class=\"list-group-item\">");
// iterate Array(feedback.rating)
;(function(){
  var $$obj = Array(feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  }
}).call(this);

if ( feedback.rating < 5)
{
// iterate Array(5 - feedback.rating)
;(function(){
  var $$obj = Array(5 - feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  }
}).call(this);

}
buf.push("<span class=\"spl spr\">-</span><em>" + (jade.escape(null == (jade.interp = moment(new Date(feedback.created)).fromNow()) ? "" : jade.interp)) + "</em><span class=\"spl spr\">-</span><a" + (jade.attrs({ 'href':("/user/" + (feedback.creator) + "") }, {"href":true})) + "><strong>" + (jade.escape(null == (jade.interp = feedback.creatorName || 'Anonymous') ? "" : jade.interp)) + "</strong></a>");
if ( feedback.review)
{
buf.push("<span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = feedback.review) ? "" : jade.interp)) + "</span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var feedback = $$obj[$index];

buf.push("<li class=\"list-group-item\">");
// iterate Array(feedback.rating)
;(function(){
  var $$obj = Array(feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  }
}).call(this);

if ( feedback.rating < 5)
{
// iterate Array(5 - feedback.rating)
;(function(){
  var $$obj = Array(5 - feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  }
}).call(this);

}
buf.push("<span class=\"spl spr\">-</span><em>" + (jade.escape(null == (jade.interp = moment(new Date(feedback.created)).fromNow()) ? "" : jade.interp)) + "</em><span class=\"spl spr\">-</span><a" + (jade.attrs({ 'href':("/user/" + (feedback.creator) + "") }, {"href":true})) + "><strong>" + (jade.escape(null == (jade.interp = feedback.creatorName || 'Anonymous') ? "" : jade.interp)) + "</strong></a>");
if ( feedback.review)
{
buf.push("<span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = feedback.review) ? "" : jade.interp)) + "</span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/editor/level/LevelFeedbackView", function(exports, require, module) {
var CocoCollection, CocoView, Level, LevelFeedback, LevelFeedbackCollection, LevelFeedbackView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

CocoCollection = require('collections/CocoCollection');

template = require('templates/editor/level/level-feedback-view');

Level = require('models/Level');

LevelFeedback = require('models/LevelFeedback');

LevelFeedbackCollection = (function(superClass) {
  extend(LevelFeedbackCollection, superClass);

  function LevelFeedbackCollection() {
    return LevelFeedbackCollection.__super__.constructor.apply(this, arguments);
  }

  LevelFeedbackCollection.prototype.model = LevelFeedback;

  LevelFeedbackCollection.prototype.initialize = function(models, options) {
    LevelFeedbackCollection.__super__.initialize.call(this, models, options);
    return this.url = "/db/level/" + (options.level.get('slug')) + "/all_feedback";
  };

  LevelFeedbackCollection.prototype.comparator = function(a, b) {
    var score;
    score = 0;
    if (a.get('creator') === me.id) {
      score -= 9001900190019001;
    }
    if (b.get('creator') === me.id) {
      score += 9001900190019001;
    }
    score -= new Date(a.get('created'));
    score -= -(new Date(b.get('created')));
    if (a.get('review')) {
      score -= 900190019001;
    }
    if (b.get('review')) {
      score += 900190019001;
    }
    if (score < 0) {
      return -1;
    } else {
      if (score > 0) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  return LevelFeedbackCollection;

})(CocoCollection);

module.exports = LevelFeedbackView = (function(superClass) {
  extend(LevelFeedbackView, superClass);

  LevelFeedbackView.prototype.id = 'level-feedback-view';

  LevelFeedbackView.prototype.template = template;

  LevelFeedbackView.prototype.className = 'tab-pane';

  LevelFeedbackView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function LevelFeedbackView(options) {
    LevelFeedbackView.__super__.constructor.call(this, options);
  }

  LevelFeedbackView.prototype.getRenderData = function(context) {
    var m, ref;
    if (context == null) {
      context = {};
    }
    context = LevelFeedbackView.__super__.getRenderData.call(this, context);
    context.moment = moment;
    context.allFeedback = [];
    context.averageRating = 0;
    context.totalRatings = 0;
    if ((ref = this.allFeedback) != null ? ref.models.length : void 0) {
      context.allFeedback = (function() {
        var i, len, ref1, results;
        ref1 = this.allFeedback.models;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          m = ref1[i];
          if (this.allFeedback.models.length < 20 || m.get('review')) {
            results.push(m.attributes);
          }
        }
        return results;
      }).call(this);
      context.averageRating = _.reduce((function() {
        var i, len, ref1, results;
        ref1 = this.allFeedback.models;
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          m = ref1[i];
          results.push(m.get('rating'));
        }
        return results;
      }).call(this), function(acc, x) {
        return acc + (x != null ? x : 5);
      }) / this.allFeedback.models.length;
      context.totalRatings = this.allFeedback.models.length;
    } else {
      context.loading = true;
    }
    return context;
  };

  LevelFeedbackView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#level-feedback-view') {
      return;
    }
    if (!this.allFeedback) {
      this.allFeedback = this.supermodel.loadCollection(new LevelFeedbackCollection(null, {
        level: this.options.level
      }), 'feedback').model;
      return this.render();
    }
  };

  return LevelFeedbackView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/LevelFeedbackView.js.map