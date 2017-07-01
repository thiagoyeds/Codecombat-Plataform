require.register("templates/courses/activate-licenses-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state,paid = locals_.paid;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"text-center\"><h1 data-i18n=\"teacher.apply_licenses\"></h1><h2 data-i18n=\"courses.grants_lifetime_access\"></h2></div></div><div class=\"modal-body\">");
var numToEnroll = state.get('visibleSelectedUsers').length
var unusedEnrollments = view.prepaids.totalMaxRedeemers() - view.prepaids.totalRedeemers()
var tooManySelected = numToEnroll > unusedEnrollments
var noneSelected = numToEnroll == 0
if ( view.classrooms.length > 1)
{
buf.push("<div class=\"row\"><div class=\"col-sm-10 col-sm-offset-1\"><div class=\"text-center m-b-3\"><div class=\"small color-navy\"><span data-i18n=\"teacher.show_students_from\"></span><span class=\"spr\">:</span></div><select class=\"classroom-select\">");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((view.classroom ? classroom.id === view.classroom.id : false)), 'value':(classroom.id) }, {"selected":true,"value":true})) + ">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'selected':((view.classroom ? classroom.id === view.classroom.id : false)), 'value':(classroom.id) }, {"selected":true,"value":true})) + ">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option" + (jade.attrs({ 'selected':((!view.classroom)), 'value':(''), 'data-i18n':('teacher.all_students') }, {"selected":true,"value":true,"data-i18n":true})) + "></option></select></div></div></div>");
}
buf.push("<form class=\"form m-t-3\"><span data-i18n=\"teacher.apply_licenses_to_the_following_students\"></span><span>:</span><div class=\"well form-group\">");
var enrolledUsers = view.users.filter(function(user){ return user.isEnrolled() })
var unenrolledUsers = view.users.filter(function(user){ return !user.isEnrolled() })
// iterate unenrolledUsers
;(function(){
  var $$obj = unenrolledUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(false), 'checked':(selected), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(false), 'checked':(selected), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

if ( enrolledUsers.length > 0)
{
buf.push("<div class=\"small-details m-t-3\"><span data-i18n=\"teacher.students_have_licenses\"></span></div>");
}
// iterate enrolledUsers
;(function(){
  var $$obj = enrolledUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(true), 'checked':(true), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var selected = Boolean(paid || state.get('selectedUsers').get(user.id))
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'disabled':(true), 'checked':(true), 'data-user-id':(user.id), 'name':('user'), "class": [('user-checkbox')] }, {"type":true,"disabled":true,"checked":true,"data-user-id":true,"name":true})) + "/><span class=\"spr\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div>");
if ( state.get('error'))
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = state.get('error')) ? "" : jade.interp)) + "</div>");
}
buf.push("<div id=\"submit-form-area\" class=\"text-center\"><p" + (jade.attrs({ "class": [('small-details'),('not-enough-enrollments'),((tooManySelected ? 'visible' : ''))] }, {"class":true})) + "><span data-i18n=\"teacher.not_enough_enrollments\"></span></p><p class=\"small-details\"><span data-i18n=\"courses.enrollment_credits_available\" class=\"spr\"></span><span id=\"total-available\">" + (jade.escape(null == (jade.interp = view.prepaids.totalAvailable()) ? "" : jade.interp)) + "</span></p><p><button" + (jade.attrs({ 'id':('activate-licenses-btn'), 'type':("submit"), "class": [('btn'),('btn-lg'),('btn-primary'),((tooManySelected || noneSelected ? 'disabled' : ''))] }, {"class":true,"type":true})) + "><span data-i18n=\"teacher.apply_licenses\"></span> (<span id=\"total-selected-span\">" + (jade.escape(null == (jade.interp = numToEnroll) ? "" : jade.interp)) + "</span>)</button></p><p><a id=\"get-more-licenses-btn\" href=\"/teachers/licenses\" data-i18n=\"courses.get_enrollments\" class=\"btn btn-lg btn-primary-alt\"></a></p></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/activate-licenses-modal.js.map