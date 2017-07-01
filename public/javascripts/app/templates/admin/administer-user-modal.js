require.register("templates/admin/administer-user-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"pull-right\">");
if ( view.user.isStudent())
{
buf.push("<button id=\"destudent-btn\" class=\"btn btn-burgandy\">Destudent</button>");
}
if ( view.user.isTeacher())
{
buf.push("<button id=\"deteacher-btn\" class=\"btn btn-burgandy\">Deteacher</button>");
}
buf.push("</div><h3>Administer User</h3><h4>" + (jade.escape((jade.interp = view.user.get('name') || 'Unnamed') == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = view.user.get('email')) == null ? '' : jade.interp)) + "</h4><span>" + (jade.escape(null == (jade.interp = view.user.id) ? "" : jade.interp)) + "</span>");
if ( view.user.get('cleverID'))
{
buf.push("<br/><b>Clever ID:</b>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<span>" + (jade.escape(null == (jade.interp = view.user.get('cleverID')) ? "" : jade.interp)) + "</span>");
}
buf.push("</div><div class=\"modal-body\"><h3 class=\"m-t-3\">Grant Student Licenses</h3><div id=\"prepaid-form\" class=\"form\">");
if ( view.state === 'creating-prepaid')
{
buf.push("<div class=\"progress progress-striped active\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div>");
}
else if ( view.state === 'made-prepaid')
{
buf.push("<div class=\"alert alert-success\">Licenses created!</div>");
}
else
{
buf.push("<div class=\"form-group\"><label>Number of Licenses</label><input id=\"seats-input\" type=\"number\" name=\"maxRedeemers\" class=\"form-control\"/></div><div class=\"form-group\"><label>Start Date</label><input" + (jade.attrs({ 'type':("date"), 'name':("startDate"), 'value':(moment().format('YYYY-MM-DD')), "class": [('form-control')] }, {"type":true,"name":true,"value":true})) + "/></div><div class=\"form-group\"><label>End Date</label><input" + (jade.attrs({ 'type':("date"), 'name':("endDate"), 'value':(moment().add(1, 'year').format('YYYY-MM-DD')), "class": [('form-control')] }, {"type":true,"name":true,"value":true})) + "/></div><div class=\"form-group\"><button id=\"add-seats-btn\" class=\"btn btn-primary\">Add Licenses</button></div>");
}
buf.push("</div>");
if ( view.prepaids.size())
{
buf.push("<h3 class=\"m-t-3\">Existing Prepaids</h3><table class=\"table table-condensed\"><tr><th>ID</th><th>Type</th><th>Start</th><th>End</th><th>Used</th></tr>");
// iterate view.prepaids.models
;(function(){
  var $$obj = view.prepaids.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = prepaid.id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = prepaid.get('type')) ? "" : jade.interp)) + "</td><td>");
if ( prepaid.get('startDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('startDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>");
if ( prepaid.get('endDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('endDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>" + (jade.escape((jade.interp = (prepaid.get('redeemers') || []).length) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = prepaid.get('maxRedeemers') || 0) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = prepaid.id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = prepaid.get('type')) ? "" : jade.interp)) + "</td><td>");
if ( prepaid.get('startDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('startDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>");
if ( prepaid.get('endDate'))
{
buf.push(jade.escape(null == (jade.interp = moment(prepaid.get('endDate')).utc().format('lll')) ? "" : jade.interp));
}
buf.push("</td><td>" + (jade.escape((jade.interp = (prepaid.get('redeemers') || []).length) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = prepaid.get('maxRedeemers') || 0) == null ? '' : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("<h3>Stripe Benefit</h3><div class=\"form\"><div class=\"form-group\"><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':(""), 'checked':(view.none) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>None</label></div><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':("free"), 'checked':(view.free) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Free</label></div><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':("free-until"), 'checked':(view.freeUntil) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Free Until<input" + (jade.attrs({ 'type':("date"), 'name':("stripe-free-until"), 'value':(view.freeUntilDate), 'id':('free-until-date'), "class": [('form-control'),('spl')] }, {"type":true,"name":true,"value":true})) + "/></label></div><div class=\"radio\"><label><input" + (jade.attrs({ 'type':("radio"), 'name':("stripe-benefit"), 'value':("coupon"), 'checked':(view.coupon) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Coupon</label><select id=\"coupon-select\" class=\"form-control\">");
// iterate view.coupons.models
;(function(){
  var $$obj = view.coupons.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var coupon = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(coupon.id), 'selected':(coupon.id===view.currentCouponID) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = coupon.formatString()) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var coupon = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(coupon.id), 'selected':(coupon.id===view.currentCouponID) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = coupon.formatString()) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><button id=\"save-changes\" class=\"btn btn-primary\">Save Changes</button></div>");
if ( view.classrooms.size())
{
buf.push("<h3 class=\"m-t-3\">Update Classrooms</h3><table id=\"classroom-table\" class=\"table\"><tr><th>Name</th><th>Lang</th><th># Levels / Courses</th><th></th></tr>");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)));
if ( classroom.get('archived'))
{
buf.push("<i class=\"spl text-muted\">(archived)</i>");
}
buf.push("</td><td>" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = classroom.getLevels().size()) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = classroom.get('courses').length) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('update-classroom-btn')] }, {"data-classroom-id":true})) + ">Update All Levels</button><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('add-new-courses-btn')] }, {"data-classroom-id":true})) + ">Add New Courses</button></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)));
if ( classroom.get('archived'))
{
buf.push("<i class=\"spl text-muted\">(archived)</i>");
}
buf.push("</td><td>" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = classroom.getLevels().size()) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = classroom.get('courses').length) == null ? '' : jade.interp)) + "</td><td><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('update-classroom-btn')] }, {"data-classroom-id":true})) + ">Update All Levels</button><button" + (jade.attrs({ 'data-classroom-id':(classroom.id), "class": [('btn'),('btn-primary'),('add-new-courses-btn')] }, {"data-classroom-id":true})) + ">Add New Courses</button></td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/admin/administer-user-modal.js.map