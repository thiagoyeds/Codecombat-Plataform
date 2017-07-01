require.register("templates/editor/level/modal/generate-terrain-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.pick_a_terrain\">Pick a Terrain</h3></div><div class=\"modal-body\"><div id=\"normal-view\">");
// iterate view.presetSizes
;(function(){
  var $$obj = view.presetSizes;
  if ('number' == typeof $$obj.length) {

    for (var size = 0, $$l = $$obj.length; size < $$l; size++) {
      var sizeObject = $$obj[size];

// iterate view.presets
;(function(){
  var $$obj = view.presets;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var size in $$obj) {
      $$l++;      var sizeObject = $$obj[size];

// iterate view.presets
;(function(){
  var $$obj = view.presets;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var preset = $$obj[$index];

buf.push("<a href=\"#\"><div" + (jade.attrs({ 'data-preset-type':(preset.type), 'data-preset-size':(size), 'style':("background:url(/images/pages/editor/level/preset_"+preset.type+"_"+size+".jpg) no-repeat center; background-size: cover"), "class": [('choose-option')] }, {"data-preset-type":true,"data-preset-size":true,"style":true})) + "><div class=\"preset-size name-label capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+size) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = size) == null ? '' : jade.interp)) + "</span></div><div class=\"preset-name capitalize\"><span" + (jade.attrs({ 'data-i18n':("editor."+preset.type) }, {"data-i18n":true})) + ">" + (jade.escape((jade.interp = preset.type) == null ? '' : jade.interp)) + "</span></div></div></a>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/modal/generate-terrain-modal.js.map