require.register("templates/play/level/modal/new-item-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,i18n = locals_.i18n;buf.push("<div class=\"modal-header\"><div id=\"close-modal\" data-dismiss=\"modal\" class=\"btn well well-sm well-parchment\"><span class=\"glyphicon glyphicon-remove\"></span></div><div class=\"well well-sm well-parchment\"><h1 data-i18n=\"play_level.victory_new_item\"></h1></div></div><div class=\"modal-body\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-5 text-center\"><img" + (jade.attrs({ 'src':(view.item.getPortraitURL()), "class": [('img-rounded'),('img-prize')] }, {"src":true})) + "/><h3 id=\"item-header\"><div id=\"item-label\" class=\"label label-banner\">" + (jade.escape(null == (jade.interp = i18n(view.item.attributes, 'name')) ? "" : jade.interp)) + "</div></h3></div><div class=\"col-sm-7\"><div class=\"well well-parchment\">" + (jade.escape(null == (jade.interp = i18n(view.item.attributes, 'description')) ? "" : jade.interp)) + "</div></div></div><div class=\"row\"><div class=\"col-sm-3 col-sm-offset-9\"><button id=\"continue-btn\" data-i18n=\"common.continue\" class=\"btn btn-illustrated btn-primary btn-block btn-lg text-uppercase\"></button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/new-item-view.js.map