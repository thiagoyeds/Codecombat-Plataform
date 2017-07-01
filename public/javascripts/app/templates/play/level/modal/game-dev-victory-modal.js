require.register("templates/play/level/modal/game-dev-victory-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 class=\"text-center\">You beat the game!</h3></div><div class=\"modal-body\"><div class=\"text-center\">Share this level so your friends and family can play it:</div><div class=\"share-row text-center\"><input" + (jade.attrs({ 'id':('copy-url-input'), 'value':(view.shareURL), "class": [('text-h4'),('semibold'),('form-control'),('input-lg')] }, {"value":true})) + "/><button id=\"copy-url-btn\" class=\"btn btn-lg btn-navy-alt\"><span data-i18n=\"sharing.copy_url\"></span></button></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"text-center\"><button id=\"replay-game-btn\" data-dismiss=\"modal\" class=\"btn btn-navy btn-lg\">Replay Game</button><a id=\"play-more-codecombat-btn\" href=\"/\" class=\"btn btn-navy btn-lg\">Play More CodeCombat</a></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/game-dev-victory-modal.js.map