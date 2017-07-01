require.register("templates/editor/thang/thang-type-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),thangType = locals_.thangType,recentlyPlayedLevels = locals_.recentlyPlayedLevels,authorized = locals_.authorized,me = locals_.me,fileSizeString = locals_.fileSizeString,animations = locals_.animations;if ( thangType.loading)
{
buf.push("<nav role=\"navigation\" id=\"thang-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/thang\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"thang-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/thang\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#editor-thang-main-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_main\">Main</a></li><li><a href=\"#editor-thang-components-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_components\">Components</a></li><li><a href=\"#editor-thang-spritesheets-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_spritesheets\">Spritesheets</a></li><li><a href=\"#editor-thang-colors-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_colors\" id=\"color-tab\">Colors</a></li><li><a href=\"#editor-thang-patches-view\" data-toggle=\"tab\" id=\"patches-tab\"><span data-i18n=\"resources.patches\" class=\"spr\">Patches</span>");
var patches = thangType.get('patches')
if ( patches && patches.length)
{
buf.push("<span class=\"badge\">" + (jade.escape(null == (jade.interp = patches.length) ? "" : jade.interp)) + "</span>");
}
buf.push("</a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = thangType.attributes.name) == null ? '' : jade.interp)) + "</span></div><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a data-toggle=\"dropdown\" class=\"play-with-level-parent\"><span class=\"glyphicon-play glyphicon\"></span></a><ul class=\"dropdown-menu\"><li class=\"dropdown-header\">Play Which Level?</li><li>");
// iterate recentlyPlayedLevels
;(function(){
  var $$obj = recentlyPlayedLevels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-level':(level), "class": [('play-with-level-button')] }, {"data-level":true})) + ">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-level':(level), "class": [('play-with-level-button')] }, {"data-level":true})) + ">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

buf.push("<input placeholder=\"Type in a level name\" class=\"play-with-level-input\"/></li></ul></li>");
if ( authorized)
{
buf.push("<li id=\"save-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li" + (jade.attrs({ "class": [(!me.isAdmin() && !me.isArtisan() ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"common.fork\" id=\"fork-start-button\">Fork</a></li><li" + (jade.attrs({ "class": [(!authorized ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(!authorized), 'id':('revert-button') }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</a></li><li" + (jade.attrs({ "class": [(!authorized ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li><li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"history-button\"><a href=\"#\" data-i18n=\"general.version_history\">Version History</a></li><li class=\"divider\"></li><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/artisan\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div class=\"tab-content\"><div id=\"editor-thang-colors-tab-view\" class=\"tab-pane\"></div><div id=\"editor-thang-main-tab-view\" class=\"tab-pane active\"><div id=\"settings-col\" class=\"well\"><div class=\"row\"><div class=\"col-sm-3\"><img id=\"portrait\" class=\"img-thumbnail\"/></div><div class=\"col-sm-9\"><div class=\"file-controls\"><button" + (jade.attrs({ 'disabled':(authorized === true ? undefined : "true"), 'id':('upload-button'), "class": [('btn'),('btn-sm'),('btn-info')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-upload\"></span><span class=\"spl\">Upload Animation</span></button><button" + (jade.attrs({ 'disabled':(authorized === true ? undefined : "true"), 'id':('clear-button'), "class": [('btn'),('btn-sm'),('btn-danger')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span class=\"spl\">Clear Data</span></button><button" + (jade.attrs({ 'id':('set-vector-icon'), 'disabled':(authorized === true ? undefined : "true"), "class": [('btn'),('btn-sm')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-gbp\"></span><span class=\"spl\">Vector Icon Setup</span></button><button" + (jade.attrs({ 'id':('export-sprite-sheet-btn'), 'disabled':(authorized === true ? undefined : "true"), "class": [('btn'),('btn-sm')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-export\"></span><span class=\"spl\">Export SpriteSheet</span></button><input id=\"real-upload-button\" type=\"file\"/></div><div id=\"thang-type-file-size\">" + (jade.escape(null == (jade.interp = fileSizeString) ? "" : jade.interp)) + "</div></div></div><div id=\"thang-type-treema\"></div><div class=\"clearfix\"></div></div><div id=\"display-col\" class=\"well\"><canvas id=\"canvas\" width=\"400\" height=\"600\"></canvas><select id=\"animations-select\" class=\"form-control\">");
// iterate animations
;(function(){
  var $$obj = animations;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var animation = $$obj[$index];

buf.push("<option>" + (jade.escape((jade.interp = animation) == null ? '' : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var animation = $$obj[$index];

buf.push("<option>" + (jade.escape((jade.interp = animation) == null ? '' : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select><div><button id=\"marker-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-map-marker\"></i><span class=\"spl\">Markers</span></button><button id=\"play-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-play\"></i><span class=\"spl\">Play</span></button><button id=\"stop-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-stop\"></i><span class=\"spl\">Stop</span></button></div><div class=\"slider-cell\">Rotation:<span class=\"rotation-label\"></span><div id=\"rotation-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Scale:<span class=\"scale-label\"></span><div id=\"scale-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Resolution:<span class=\"resolution-label\"> 4.0x</span><div id=\"resolution-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Health:<span class=\"health-label\"> 10hp</span><div id=\"health-slider\" class=\"selector\"></div></div></div></div><div id=\"editor-thang-components-tab-view\" class=\"tab-pane\"><div id=\"thang-components-edit-view\"></div></div><div id=\"editor-thang-spritesheets-view\" class=\"tab-pane\"><div id=\"spritesheets\"></div></div><div id=\"editor-thang-patches-view\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/thang/thang-type-edit-view.js.map