require.register("templates/editor/level/modal/artisan-guide-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Artisan Compendium</h3></div><div class=\"modal-body\"><p>Welcome to the Artisan Compendium. Below you will find a series of helpful guides and tutorials for getting your levels to Master Artisan quality");
if ( view.hasOwnership())
{
buf.push(", as well as a way to submit your level for official Artisan review");
}
buf.push("! If you have any feedback on the Level Editor, please contact us at: <a href=\"mailto:artisans@codecombat.com\">artisans@codecombat.com</a></p><div class=\"centered-stack\"><div><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" target=\"_blank\">Wiki Homepage</a></div><div><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-How-To-Index\" target=\"_blank\">Basic How-tos</a></div><div><a href=\"http://www.codecombat.com/community\" target=\"_blank\">Artisan Rankings</a></div></div>");
if ( view.hasOwnership())
{
buf.push("<h4>Level Submission</h4><p>Do you want your level to be added to the campaign? Please take a moment to fill out the questions below! Don’t worry, this isn’t a timed quiz. It is just a way for the artisans at CodeCombat HQ to get a feel for the purpose of this level. If it doesn’t quite yet meet our standards for release we will give you feedback to help polish it further!</p><div class=\"form\"><div class=\"form-group\"><label for=\"credit-name\" class=\"control-label\">How would you like to be credited?</label><input id=\"credit-name\" name=\"creditName\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"level-purpose\" class=\"control-label\">What is the purpose of this level?</label><textarea id=\"level-purpose\" name=\"levelPurpose\" rows=\"4\" class=\"form-control\"></textarea></div><div class=\"form-group\"><label for=\"level-inspiration\" class=\"control-label\">What was the inspiration for the level?</label><textarea id=\"level-inspiration\" name=\"levelInspiration\" rows=\"4\" class=\"form-control\"></textarea></div><div class=\"form-group\"><label for=\"level-location\" class=\"control-label\">Where in the campaign do you think this level belongs?</label><textarea id=\"level-location\" name=\"levelLocation\" rows=\"4\" class=\"form-control\"></textarea></div></div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"btn\">Close</a>");
if ( view.hasOwnership())
{
buf.push("<button id=\"level-submit\" class=\"btn btn-primary\">Submit</button>");
}
buf.push("</div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/modal/artisan-guide-modal.js.map