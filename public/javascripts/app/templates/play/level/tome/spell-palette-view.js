require.register("templates/play/level/tome/spell-palette-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),_ = locals_._,view = locals_.view,tabs = locals_.tabs,isIE = locals_.isIE;var header_mixin = function(label, name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<a" + (jade.attrs({ 'role':("button"), 'id':("#palette-header-" + _.string.slugify(label)), 'data-panel':("#palette-tab-" + _.string.slugify(label)), "class": [('section-header'),('btn'),('btn-small'),('btn-illustrated'),('btn-warning')] }, {"role":true,"id":true,"data-panel":true})) + ">" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "");
if ( label == 'api-area')
{
buf.push("<div style=\"float: right\" class=\"glyphicon glyphicon-chevron-down\"></div>");
}
else
{
buf.push("<div style=\"float: right\" class=\"glyphicon glyphicon-chevron-right\"></div>");
}
buf.push("</a>");
};
buf.push("<div class=\"container\"><div class=\"left nano\"><div id=\"spell-palette-api-bar\" class=\"nano-content panel-group\">");
if ( view.level.get('type') == 'web-dev')
{
header_mixin('api-area', 'HTML');
}
else
{
header_mixin('api-area', 'Methods');
}
buf.push("<div id=\"palette-tab-api-area\" class=\"apis panel-collapse collapse in\"><div class=\"properties properties-this\"></div></div>");
if ( tabs)
{
// iterate tabs
;(function(){
  var $$obj = tabs;
  if ('number' == typeof $$obj.length) {

    for (var tab = 0, $$l = $$obj.length; tab < $$l; tab++) {
      var entries = $$obj[tab];

header_mixin(tab, tab);
buf.push("<div" + (jade.attrs({ 'id':("palette-tab-" + _.string.slugify(tab)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div" + (jade.attrs({ "class": [("properties properties-" + _.string.slugify(tab))] }, {"class":true})) + "></div></div>");
    }

  } else {
    var $$l = 0;
    for (var tab in $$obj) {
      $$l++;      var entries = $$obj[tab];

header_mixin(tab, tab);
buf.push("<div" + (jade.attrs({ 'id':("palette-tab-" + _.string.slugify(tab)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div" + (jade.attrs({ "class": [("properties properties-" + _.string.slugify(tab))] }, {"class":true})) + "></div></div>");
    }

  }
}).call(this);

}
header_mixin('events', 'Events');
buf.push("<div id=\"palette-tab-events\" class=\"apis panel-collapse collapse\"></div>");
header_mixin('stuff-area', 'Spawnable');
buf.push("<div id=\"palette-tab-stuff-area\" class=\"apis panel-collapse collapse\"></div></div></div><div class=\"right\"><div class=\"closeBtn btn btn-illustrated btn-danger\"><span class=\"glyphicon glyphicon-remove\"></span></div>");
if ( isIE)
{
buf.push("<div class=\"scrollArea always-scroll-y\"><div class=\"scrollableArea\"><div class=\"rightContentTarget content\"></div></div></div>");
}
else
{
buf.push("<div class=\"scrollArea\"><div class=\"scrollableArea\"><div class=\"rightContentTarget content\"></div></div></div>");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell-palette-view.js.map