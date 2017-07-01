require.register("templates/core/create-account-modal/segment-check-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._,state = locals_.state;buf.push("<form class=\"modal-body segment-check\"><div class=\"modal-body-content\">");
switch (view.signupState.get('path')){
case 'student':
buf.push("<span data-i18n=\"signup.enter_class_code\"></span><div class=\"class-code-input-group form-group\"><input" + (jade.attrs({ 'name':("classCode"), 'value':(view.signupState.get('classCode')), "class": [('class-code-input')] }, {"name":true,"value":true})) + "/><div class=\"render\">");
if (!( _.isEmpty(view.signupState.get('classCode'))))
{
if ( state.get('classCodeValid'))
{
buf.push("<span class=\"glyphicon glyphicon-ok-circle class-code-valid-icon\"></span>");
}
else
{
buf.push("<span class=\"glyphicon glyphicon-remove-circle class-code-valid-icon\"></span>");
}
}
buf.push("</div></div><p class=\"render\">");
if ( _.isEmpty(view.signupState.get('classCode')))
{
buf.push("<span data-i18n=\"signup.ask_teacher_1\"></span>");
}
else if ( state.get('classCodeValid'))
{
buf.push("<span data-i18n=\"signup.about_to_join\" class=\"small\"></span><br/><span class=\"classroom-name\">" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span><br/><span class=\"teacher-name\">" + (jade.escape(null == (jade.interp = view.classroom.owner.get('name')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<span data-i18n=\"signup.classroom_not_found\"></span>");
}
if ( _.isEmpty(view.signupState.get('classCode')) || !state.get('classCodeValid'))
{
buf.push("<br/><span data-i18n=\"signup.ask_teacher_2\" class=\"spr\"></span><a class=\"individual-path-button\"><span data-i18n=\"signup.ask_teacher_3\"></span></a><span data-i18n=\"signup.ask_teacher_4\" class=\"spl\"></span>");
}
buf.push("</p>");
  break;
case 'teacher':
buf.push("<!-- TODO-->");
  break;
case 'individual':
buf.push("<div class=\"birthday-form-group form-group\"><span data-i18n=\"signup.enter_birthdate\"></span><div class=\"input-border\"><select id=\"birthday-month-input\" name=\"birthdayMonth\" style=\"width: 106px; float: left\" class=\"input-large form-control\"><option value=\"\" data-i18n=\"calendar.month\"></option>");
// iterate ['january','february','march','april','may','june','july','august','september','october','november','december']
;(function(){
  var $$obj = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var name = $$obj[index];

var month = index + 1
buf.push("<option" + (jade.attrs({ 'data-i18n':("calendar." + (name) + ""), 'value':(month), 'selected':((month == view.signupState.get('birthdayMonth'))) }, {"data-i18n":true,"value":true,"selected":true})) + "></option>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var name = $$obj[index];

var month = index + 1
buf.push("<option" + (jade.attrs({ 'data-i18n':("calendar." + (name) + ""), 'value':(month), 'selected':((month == view.signupState.get('birthdayMonth'))) }, {"data-i18n":true,"value":true,"selected":true})) + "></option>");
    }

  }
}).call(this);

buf.push("</select><select id=\"birthday-day-input\" name=\"birthdayDay\" style=\"width: 75px; float: left\" class=\"input-large form-control\"><option value=\"\" data-i18n=\"calendar.day\"></option>");
// iterate _.range(1,32)
;(function(){
  var $$obj = _.range(1,32);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var day = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((day == view.signupState.get('birthdayDay'))) }, {"selected":true})) + ">" + (jade.escape((jade.interp = day) == null ? '' : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var day = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((day == view.signupState.get('birthdayDay'))) }, {"selected":true})) + ">" + (jade.escape((jade.interp = day) == null ? '' : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select><select id=\"birthday-year-input\" name=\"birthdayYear\" style=\"width: 90px; float: left\" class=\"input-large form-control\"><option value=\"\" data-i18n=\"calendar.year\"></option>");
var thisYear = new Date().getFullYear()
// iterate _.range(thisYear, thisYear - 100, -1)
;(function(){
  var $$obj = _.range(thisYear, thisYear - 100, -1);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var year = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((year == view.signupState.get('birthdayYear'))) }, {"selected":true})) + ">" + (jade.escape((jade.interp = year) == null ? '' : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var year = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((year == view.signupState.get('birthdayYear'))) }, {"selected":true})) + ">" + (jade.escape((jade.interp = year) == null ? '' : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><div data-i18n=\"signup.parent_use_birthdate\" class=\"parent_birthdate\"></div>");
  break;
default:
buf.push("<p><span>Sign-up error, please contact </span>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<a href=\"mailto:support@codecombat.com\">support@codecombat.com</a>.</p>");
  break;
}
buf.push("</div><!-- In reverse order for tabbing purposes--><div class=\"history-nav-buttons\"><button type=\"submit\" class=\"next-button btn btn-lg btn-navy\"><span data-i18n=\"play.next\"></span></button><button type=\"button\" class=\"back-to-account-type btn btn-lg btn-navy-alt\"><span data-i18n=\"common.back\"></span></button></div></form>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/segment-check-view.js.map