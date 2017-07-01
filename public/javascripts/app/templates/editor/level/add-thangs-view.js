require.register("templates/editor/level/add-thangs-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),groups = locals_.groups;buf.push("<h3 data-i18n=\"editor.level_tab_thangs_add\">Add Thangs</h3><input type=\"search\" id=\"thang-search\" data-i18n=\"[placeholder]editor.level_tab_thangs_search\" placeholder=\"Search thangs\"/><div class=\"editor-nano-container nano\"><div id=\"thangs-list\" class=\"nano-content\">");
// iterate groups
;(function(){
  var $$obj = groups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var group = $$obj[$index];

buf.push("<h4>" + (jade.escape(null == (jade.interp = group.name) ? "" : jade.interp)) + "</h4>");
// iterate group.thangs
;(function(){
  var $$obj = group.thangs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var group = $$obj[$index];

buf.push("<h4>" + (jade.escape(null == (jade.interp = group.name) ? "" : jade.interp)) + "</h4>");
// iterate group.thangs
;(function(){
  var $$obj = group.thangs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var thangType = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-thang-type':(thangType.get('name')), 'title':(thangType.get('name')), "class": [('add-thang-palette-icon')] }, {"data-thang-type":true,"title":true})) + "><img" + (jade.attrs({ 'src':(thangType.getPortraitURL()), 'alt':("") }, {"src":true,"alt":true})) + "/></div>");
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
    }

  }
}).call(this);

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
//# sourceMappingURL=/javascripts/app/templates/editor/level/add-thangs-view.js.map