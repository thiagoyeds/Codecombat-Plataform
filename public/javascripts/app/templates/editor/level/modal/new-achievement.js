require.register("templates/editor/level/modal/new-achievement", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3" + (jade.attrs({ 'data-i18n':("" + (view.newModelTitle) + "") }, {"data-i18n":true})) + ">Create New " + (jade.escape((jade.interp = view.modelLabel) == null ? '' : jade.interp)) + "</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"name\" name=\"name\" type=\"text\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"description\" data-i18n=\"general.description\" class=\"control-label\">Description</label><input id=\"description\" name=\"description\" type=\"text\" class=\"form-control\"/></div><h4 data-i18n=\"editor.achievement_query_misc\">Key achievement off of miscellanea</h4><div class=\"radio\"><label><input type=\"checkbox\" name=\"queryOptions\" id=\"misc-level-completion\" value=\"misc-level-completion\"/><span data-i18n=\"editor.level_completion\" class=\"spl\">Level Completion</span></label></div>");
var goals = view.level.get('goals');
if ( goals && goals.length)
{
buf.push("<h4 data-i18n=\"editor.achievement_query_goals\">Key achievement off of level goals</h4>");
// iterate goals
;(function(){
  var $$obj = goals;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var goal = $$obj[$index];

buf.push("<div class=\"radio\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("queryOptions"), 'id':("" + (goal.id) + ""), 'value':("" + (goal.id) + "") }, {"type":true,"name":true,"id":true,"value":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = goal.name) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var goal = $$obj[$index];

buf.push("<div class=\"radio\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("queryOptions"), 'id':("" + (goal.id) + ""), 'value':("" + (goal.id) + "") }, {"type":true,"name":true,"id":true,"value":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = goal.name) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

}
buf.push("</form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button id=\"save-new-achievement-link\" data-i18n=\"common.create\" class=\"btn btn-primary new-model-submit\">Create</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/modal/new-achievement.js.map