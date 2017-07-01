require.register("templates/core/hero-select-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),state = locals_.state,view = locals_.view;var heroOption_mixin = function(hero){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var heroOriginal = hero.get('original')
var selectedState
if ( state.get('selectedHeroOriginal') === heroOriginal)
{
selectedState = 'selected'
}
else if ( view.options.showCurrentHero && state.get('currentHeroOriginal') === heroOriginal)
{
selectedState = 'current'
}
else
{
selectedState = ''
}
buf.push("<div" + (jade.attrs({ 'data-hero-original':(heroOriginal), "class": [('hero-option'),(selectedState)] }, {"class":true,"data-hero-original":true})) + "><div class=\"hero-avatar\"><img" + (jade.attrs({ 'src':(hero.getPortraitURL()) }, {"src":true})) + "/></div><div class=\"text-h5 hero-name\"><span>" + (jade.escape(null == (jade.interp = hero.getHeroShortName()) ? "" : jade.interp)) + "</span></div></div>");
};
buf.push("<div class=\"hero-list\">");
if ( view.heroes.loaded)
{
// iterate view.heroes.models
;(function(){
  var $$obj = view.heroes.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hero = $$obj[$index];

if ( hero.get('heroClass') === 'Warrior')
{
heroOption_mixin(hero);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hero = $$obj[$index];

if ( hero.get('heroClass') === 'Warrior')
{
heroOption_mixin(hero);
}
    }

  }
}).call(this);

}
buf.push("</div>");;return buf.join("");
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

;require.register("views/core/HeroSelectView", function(exports, require, module) {
var Classroom, CocoView, HeroSelectView, State, ThangType, ThangTypes, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/core/hero-select-view');

Classroom = require('models/Classroom');

ThangTypes = require('collections/ThangTypes');

State = require('models/State');

ThangType = require('models/ThangType');

User = require('models/User');

module.exports = HeroSelectView = (function(superClass) {
  extend(HeroSelectView, superClass);

  function HeroSelectView() {
    return HeroSelectView.__super__.constructor.apply(this, arguments);
  }

  HeroSelectView.prototype.id = 'hero-select-view';

  HeroSelectView.prototype.template = template;

  HeroSelectView.prototype.events = {
    'click .hero-option': 'onClickHeroOption'
  };

  HeroSelectView.prototype.initialize = function(options) {
    var currentHeroOriginal, defaultHeroOriginal, ref;
    this.options = options != null ? options : {};
    defaultHeroOriginal = ThangType.heroes.captain;
    currentHeroOriginal = ((ref = me.get('heroConfig')) != null ? ref.thangType : void 0) || defaultHeroOriginal;
    this.debouncedRender = _.debounce(this.render, 0);
    this.state = new State({
      currentHeroOriginal: currentHeroOriginal,
      selectedHeroOriginal: currentHeroOriginal
    });
    this.heroes = new ThangTypes({}, {
      project: ['original', 'name', 'heroClass']
    });
    this.supermodel.trackRequest(this.heroes.fetchHeroes());
    this.listenTo(this.state, 'all', function() {
      return this.debouncedRender();
    });
    return this.listenTo(this.heroes, 'all', function() {
      return this.debouncedRender();
    });
  };

  HeroSelectView.prototype.onClickHeroOption = function(e) {
    var heroOriginal;
    heroOriginal = $(e.currentTarget).data('hero-original');
    this.state.set({
      selectedHeroOriginal: heroOriginal
    });
    return this.saveHeroSelection(heroOriginal);
  };

  HeroSelectView.prototype.saveHeroSelection = function(heroOriginal) {
    var hero, heroConfig;
    if (!me.get('heroConfig')) {
      me.set({
        heroConfig: {}
      });
    }
    heroConfig = _.assign(me.get('heroConfig'), {
      thangType: heroOriginal
    });
    me.set({
      heroConfig: heroConfig
    });
    hero = this.heroes.findWhere({
      original: heroOriginal
    });
    return me.save().then((function(_this) {
      return function() {
        var category, event, ref;
        event = 'Hero selected';
        event += me.isStudent() ? ' student' : ' teacher';
        if (_this.options.createAccount) {
          event += ' create account';
        }
        category = me.isStudent() ? 'Students' : 'Teachers';
        if ((ref = window.tracker) != null) {
          ref.trackEvent(event, {
            category: category,
            heroOriginal: heroOriginal
          }, []);
        }
        return _this.trigger('hero-select:success', hero);
      };
    })(this));
  };

  return HeroSelectView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/HeroSelectView.js.map