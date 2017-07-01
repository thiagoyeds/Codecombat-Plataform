require.register("templates/play/modal/play-heroes-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),gems = locals_.gems,heroes = locals_.heroes,isIE = locals_.isIE,visibleHero = locals_.visibleHero,codeLanguages = locals_.codeLanguages,codeLanguage = locals_.codeLanguage,confirmButtonI18N = locals_.confirmButtonI18N,me = locals_.me,serverConfig = locals_.serverConfig;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/heroes-background.png\" draggable=\"false\" id=\"play-heroes-background\"/><h1 data-i18n=\"choose_hero.choose_hero\"></h1><div id=\"gems-count-container\"><span id=\"gems-count\"><div class=\"gem gem-20\"></div><span class=\"spl\">" + (jade.escape(null == (jade.interp = gems) ? "" : jade.interp)) + "</span></span></div><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><div id=\"hero-carousel\" data-interval='0' class=\"carousel slide\"><div class=\"carousel-indicator-container\"><ol class=\"carousel-indicators\">");
// iterate heroes
;(function(){
  var $$obj = heroes;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var hero = $$obj[index];

buf.push("<li" + (jade.attrs({ 'data-hero-id':(hero.get('original')), 'title':(hero.name), 'data-slide-to':(index), 'data-target':("#hero-carousel"), "class": [("hero-indicator hero-index-" + index + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"data-hero-id":true,"title":true,"data-slide-to":true,"data-target":true,"class":true})) + "><div class=\"hero-avatar\"></div>");
if ( hero.locked && !hero.purchasable)
{
if ( isIE)
{
buf.push("<img src=\"/images/pages/game-menu/lock-processed.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
else
{
buf.push("<img src=\"/images/pages/game-menu/lock.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var hero = $$obj[index];

buf.push("<li" + (jade.attrs({ 'data-hero-id':(hero.get('original')), 'title':(hero.name), 'data-slide-to':(index), 'data-target':("#hero-carousel"), "class": [("hero-indicator hero-index-" + index + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"data-hero-id":true,"title":true,"data-slide-to":true,"data-target":true,"class":true})) + "><div class=\"hero-avatar\"></div>");
if ( hero.locked && !hero.purchasable)
{
if ( isIE)
{
buf.push("<img src=\"/images/pages/game-menu/lock-processed.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
else
{
buf.push("<img src=\"/images/pages/game-menu/lock.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ol></div><div class=\"carousel-inner\">");
// iterate heroes
;(function(){
  var $$obj = heroes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hero = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-hero-id':(hero.get('original')), "class": [("item hero-item" + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"class":true,"data-hero-id":true})) + "><canvas class=\"hero-canvas\"></canvas><div class=\"hero-pose-image\"><img draggable=\"false\"/></div><div class=\"hero-stats\"><h2>" + (jade.escape(null == (jade.interp = hero.name) ? "" : jade.interp)) + "</h2><div class=\"hero-description\">" + (jade.escape(null == (jade.interp = hero.description) ? "" : jade.interp)) + "</div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.status\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':(hero.restricted ? 'inventory.restricted_title' : (hero.purchasable ? 'play.purchasable' : (hero.locked ? 'play.locked' : 'play.available'))), "class": [('stat-value'),('hero-status-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"editor.level_components_type\" class=\"stat-label\"> </div><div" + (jade.attrs({ 'data-i18n':('general.' +hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.weapons\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':('choose_hero.weapons_'+hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div>");
if ( hero.stats)
{
if ( hero.stats.skills.length)
{
buf.push("<div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.skills\" class=\"stat-label\"></div><div class=\"stat-value\">" + (jade.escape(null == (jade.interp = hero.stats.skills.join(', ')) ? "" : jade.interp)) + "</div></div>");
}
// iterate ['attack', 'health', 'speed']
;(function(){
  var $$obj = ['attack', 'health', 'speed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  }
}).call(this);

}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hero = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-hero-id':(hero.get('original')), "class": [("item hero-item" + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"class":true,"data-hero-id":true})) + "><canvas class=\"hero-canvas\"></canvas><div class=\"hero-pose-image\"><img draggable=\"false\"/></div><div class=\"hero-stats\"><h2>" + (jade.escape(null == (jade.interp = hero.name) ? "" : jade.interp)) + "</h2><div class=\"hero-description\">" + (jade.escape(null == (jade.interp = hero.description) ? "" : jade.interp)) + "</div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.status\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':(hero.restricted ? 'inventory.restricted_title' : (hero.purchasable ? 'play.purchasable' : (hero.locked ? 'play.locked' : 'play.available'))), "class": [('stat-value'),('hero-status-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"editor.level_components_type\" class=\"stat-label\"> </div><div" + (jade.attrs({ 'data-i18n':('general.' +hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.weapons\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':('choose_hero.weapons_'+hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div>");
if ( hero.stats)
{
if ( hero.stats.skills.length)
{
buf.push("<div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.skills\" class=\"stat-label\"></div><div class=\"stat-value\">" + (jade.escape(null == (jade.interp = hero.stats.skills.join(', ')) ? "" : jade.interp)) + "</div></div>");
}
// iterate ['attack', 'health', 'speed']
;(function(){
  var $$obj = ['attack', 'health', 'speed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  }
}).call(this);

}
buf.push("</div></div>");
    }

  }
}).call(this);

buf.push("</div><a role=\"button\" data-slide=\"prev\" href=\"#hero-carousel\" class=\"left\"><span class=\"glyphicon glyphicon-play\"></span></a><a role=\"button\" data-slide=\"next\" href=\"#hero-carousel\" class=\"right\"><span class=\"glyphicon glyphicon-play\"></span></a></div><div id=\"hero-footer\">");
if ( visibleHero)
{
if ( !visibleHero.get('original'))
{
buf.push("<div id=\"loading-hero-explanation\"><h2 data-i18n=\"common.loading\">Loading...</h2></div>");
}
else if ( visibleHero.restricted)
{
buf.push("<div id=\"restricted-hero-explanation\"><h2><span>" + (jade.escape(null == (jade.interp = visibleHero.name) ? "" : jade.interp)) + "</span><span data-i18n=\"inventory.restricted_title\" class=\"spl\">Restricted</span></h2><span data-i18n=\"choose_hero.restricted_to_certain_heroes\" class=\"spr\">Only certain heroes can play this level.</span></div><button id=\"restricted-hero-button\" data-i18n=\"inventory.restricted_title\" class=\"btn disabled btn-illustrated\">Restricted</button>");
}
else if ( visibleHero.purchasable)
{
buf.push("<div id=\"purchasable-hero-explanation\"><h2 data-i18n=\"choose_hero.available_for_purchase\">Available for Purchase</h2></div><button id=\"purchase-hero-button\" class=\"btn unlock-button\"><span data-i18n=\"play.unlock\" class=\"spr\">Unlock</span>");
if(!visibleHero.get('gems')) {
console.error('Huh, we loaded the hero with no gem cost.');
visibleHero.set('gems', {ninja: 400, librarian: 630, samurai: 1000, trapper: 1400, "potion-master": 1800, "forest-archer": 2500, sorcerer: 3400, raiser: 4600, necromancer: 6300, pixie: 8500, goliath: 12000, guardian: 16000, "dark-wizard": 21000, assassin: 29000}[visibleHero.get('slug')] || 99999);
}
buf.push("<span>" + (jade.escape(null == (jade.interp = visibleHero.get('gems')) ? "" : jade.interp)) + "</span><span class=\"gem gem-20\"></span></button>");
}
else if ( visibleHero.locked)
{
buf.push("<div id=\"locked-hero-explanation\"><h2><span>" + (jade.escape(null == (jade.interp = visibleHero.name) ? "" : jade.interp)) + "</span><span data-i18n=\"play.locked\" class=\"spl\">Locked</span></h2><span data-i18n=\"choose_hero.level_to_unlock\" class=\"spr\">Level to unlock:</span><strong>" + (jade.escape(null == (jade.interp = visibleHero.unlockLevelName || '???') ? "" : jade.interp)) + "</strong></div>");
}
else if ( visibleHero.loaded)
{
buf.push("<div class=\"form\"><div class=\"form-group select-group\"><span data-i18n=\"choose_hero.programming_language_description\" class=\"help-block\">Which programming language do you want to use?</span><select id=\"option-code-language\" name=\"code-language\">");
// iterate codeLanguages
;(function(){
  var $$obj = codeLanguages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var option = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(option.id), 'selected':(codeLanguage === option.id) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = option.name) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var option = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(option.id), 'selected':(codeLanguage === option.id) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = option.name) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><a" + (jade.attrs({ 'id':('confirm-button'), 'data-i18n':(confirmButtonI18N) }, {"data-i18n":true})) + "></a>");
}
}
buf.push("</div>");
if ( !me.finishedAnyLevels() && serverConfig.showCodePlayAds)
{
buf.push("<a href=\"https://lenovogamestate.com/\">");
var url = "/images/common/codeplay/NA_ChooseHeroPage_Yoga520_800x90.png"
if ( me.isFromUk())
{
url = "/images/common/codeplay/UK_ChooseHeroPage_Yoga510_800x90.png"
}
buf.push("<img" + (jade.attrs({ 'id':('codeplay-choose-hero-ad'), 'src':(url) }, {"src":true})) + "/></a>");
}
buf.push("</div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/play-heroes-modal.js.map