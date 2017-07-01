require.register("templates/courses/classroom-settings-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._,me = locals_.me;var ageRange_mixin = function(name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<select" + (jade.attrs({ 'name':(name), 'value':(view.classroom.get(name)), "class": [('age-range-select'),('form-control')] }, {"name":true,"value":true})) + "><option value=\"\">-</option><option value=\"&lt;6\" data-i18n=\"courses.student_age_range_younger\"></option>");
// iterate _.range(6,18)
;(function(){
  var $$obj = _.range(6,18);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option value=\"18\" data-i18n=\"courses.student_age_range_older\"></option></select>");
};
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.classroom.isNew())
{
buf.push("<h3 data-i18n=\"courses.create_new_class\" class=\"modal-title\"></h3>");
}
else
{
buf.push("<h3 data-i18n=\"courses.edit_settings1\" class=\"modal-title\"></h3>");
}
buf.push("</div><div class=\"modal-body\"><form><div class=\"form-group\"><label data-i18n=\"courses.class_name\"></label><input" + (jade.attrs({ 'id':('name-input'), 'name':("name"), 'type':('text'), 'value':(view.classroom.get('name')), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"form-group\"><label><span data-i18n=\"general.description\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><textarea name=\"description\" rows=\"2\" class=\"form-control\">" + (jade.escape(null == (jade.interp = view.classroom.get('description')) ? "" : jade.interp)) + "</textarea></div><div class=\"form-group\"><label data-i18n=\"choose_hero.programming_language\"></label>");
var aceConfig = view.classroom.get('aceConfig') || {};
var languageDisabled = !!_.size(view.classroom.get('members'));
buf.push("<div data-i18n=\"courses.language_cannot_change\" class=\"help-block small text-navy\"></div><select" + (jade.attrs({ 'id':('programming-language-select'), 'name':("language"), 'value':(aceConfig.language), 'disabled':(languageDisabled), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + ">");
var aceConfig = view.classroom.get('aceConfig') || {};
buf.push("<option value=\"\" data-i18n=\"courses.language_select\"></option><option value=\"python\">Python</option><option value=\"javascript\">JavaScript</option></select></div><div class=\"form-group\"><label><span data-i18n=\"courses.avg_student_exp_label\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><div data-i18n=\"courses.avg_student_exp_desc\" class=\"help-block small text-navy\"></div><select" + (jade.attrs({ 'name':("averageStudentExp"), 'value':(view.classroom.get('averageStudentExp')), "class": [('form-control')] }, {"name":true,"value":true})) + "><option value=\"\" data-i18n=\"courses.avg_student_exp_select\"></option><option value=\"none\" data-i18n=\"courses.avg_student_exp_none\"></option><option value=\"beginner\" data-i18n=\"courses.avg_student_exp_beginner\"></option><option value=\"intermediate\" data-i18n=\"courses.avg_student_exp_intermediate\"></option><option value=\"advanced\" data-i18n=\"courses.avg_student_exp_advanced\"></option><option value=\"varied\" data-i18n=\"courses.avg_student_exp_varied\"></option></select></div><div class=\"form-group\"><label><span data-i18n=\"courses.student_age_range_label\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><div>");
ageRange_mixin("ageRangeMin");
buf.push("<span data-i18n=\"courses.student_age_range_to\" class=\"spl spr\"></span>");
ageRange_mixin("ageRangeMax");
buf.push("</div>");
var ageRange_mixin = function(name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<select" + (jade.attrs({ 'name':(name), 'value':(view.classroom.get(name)), "class": [('age-range-select'),('form-control')] }, {"name":true,"value":true})) + "><option value=\"\">-</option><option value=\"&lt;6\" data-i18n=\"courses.student_age_range_younger\"></option>");
// iterate _.range(6,18)
;(function(){
  var $$obj = _.range(6,18);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option value=\"18\" data-i18n=\"courses.student_age_range_older\"></option></select>");
};
buf.push("</div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"text-center\">");
if ( view.classroom.isNew())
{
buf.push("<button id=\"save-settings-btn\" data-i18n=\"courses.create_class\" class=\"btn btn-primary btn-lg\"></button>");
}
else
{
buf.push("<button id=\"save-settings-btn\" data-i18n=\"common.save_changes\" class=\"btn btn-primary btn-lg\"></button>");
}
if ( me.isAdmin())
{
buf.push("<hr/><!-- DNT--><h3>Admin Only</h3><button id=\"update-courses-btn\" class=\"btn btn-forest btn-lg\">Update Courses</button>");
}
buf.push("</div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/classroom-settings-modal.js.map