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

;
//# sourceMappingURL=/javascripts/app/templates/core/hero-select-view.js.map